<script setup lang="ts">
import type { FormInst, FormRules, UploadFileInfo } from 'naive-ui'
import Cropper from 'cropperjs'
import type { NUploadBefore, NUploadError, NUploadFinish } from '@/types'

import { UPLOAD_AVATAR_TARGET, getAvatarUrl, reqEditUserInfo } from '@/apis/login'

const userStore = useUserStore()

const userInfo = reactive({ ...userStore.userInfo })

const $form = ref<FormInst | null>(null)
const rules: FormRules = {
  nickname: [{ required: true, min: 1, message: '请输入昵称' }],
  email: [{ type: 'email', message: '请输入正确的邮箱地址' }],
}

const loading = ref(false)

function handleCommit() {
  $form.value?.validate().then(async () => {
    loading.value = true
    const { err, data } = await reqEditUserInfo(userInfo)
    loading.value = false
    if (err) {
      window.$message.error(err.message)
      return
    }
    userStore.setUserInfo(data)
    window.$message.success('提交成功')
  })
}

/* 头像上传 */
const defaultFileList = computed<UploadFileInfo[]>(() => userInfo.avatar
  ? [{ id: userInfo.id!, name: userInfo.username!, url: userInfo.avatar, status: 'finished' }]
  : [],
)

const onBeforeUploadAvatar: NUploadBefore = ({ file }) => {
  if (file.file!.size! > 1024 * 1024) {
    window.$message.error('上传头像大小不能超过1MB')
    return false
  }
  return new Promise((resolve) => {
    // 创建临时图片链接
    const url = URL.createObjectURL(file.file!)
    // 创建图片元素
    const img = new Image()
    img.src = url
    img.style.display = 'none'
    // 创建裁剪器 比例 1:1
    img.onload = async () => {
      // 若图片比例为 1:1 询问是否裁剪
      if (img.width === img.height) {
        return window.$dialog.create({
          title: '裁剪头像',
          content: '当前上传头像比例为 1:1，是否需要进行裁剪？',
          showIcon: false,
          autoFocus: false,
          negativeText: '直接上传',
          positiveText: '裁剪后上传',
          onNegativeClick: () => resolve(true),
          onPositiveClick: handleCrop,
        })
      }
      handleCrop()

      async function handleCrop() {
        window.$dialog.create({
          title: '裁剪头像',
          showIcon: false,
          autoFocus: false,
          content: () => h('div', { class: 'profile-edit__cropper w-420px h-420px' }),
          style: { width: 'auto' },
          negativeText: '取消',
          positiveText: '确认',
          onPositiveClick: handleCommitCrop,
        })
        await nextTick()
        const el = document.querySelector('.profile-edit__cropper')
        el?.appendChild(img)
        const cropper = new Cropper(img, {
          aspectRatio: 1,
          viewMode: 1,
          dragMode: 'move',
          autoCropArea: 1,
          background: false,
          movable: false,
          zoomable: false,
          minCropBoxWidth: 60,
          minCropBoxHeight: 60,
        })
        function handleCommitCrop() {
          cropper.getCroppedCanvas().toBlob((blob) => {
            file.file = new File([blob!], file.file!.name, { ...file.file, type: blob!.type })
            resolve(true)
          })
        }
      }
    }
  })
}
const onUploadAvatarFinish: NUploadFinish = ({ file, event }) => {
  const res = (event!.target as XMLHttpRequest).response
  const url = getAvatarUrl(res.data)
  file.url = url
  userInfo.avatar = url
}
const onUploadAvatarError: NUploadError = ({ event }) => {
  const res = (event!.target as XMLHttpRequest).response
  window.$message.error(res.message)
}
</script>

<template>
  <PageMain>
    <div sp-section>
      <h2>个人中心</h2>
      <div mx-auto mt-8 w-600px>
        <n-form ref="$form" :model="userInfo" :rules="rules" label-align="right" label-placement="left" label-width="auto">
          <n-form-item label="用户名" path="username" first>
            <n-input v-model:value="userInfo.username" disabled />
          </n-form-item>
          <n-form-item label="昵称" path="nickname" first>
            <n-input v-model:value="userInfo.nickname" />
          </n-form-item>
          <n-form-item label="头像" path="avatar" first>
            <n-upload
              :action="UPLOAD_AVATAR_TARGET"
              :default-file-list="defaultFileList"
              list-type="image-card"
              response-type="json"
              accept=".png, .jpeg, .jpg"
              :max="1"
              @before-upload="onBeforeUploadAvatar"
              @finish="onUploadAvatarFinish"
              @error="onUploadAvatarError"
            />
          </n-form-item>
          <n-form-item label="邮箱地址" path="email">
            <n-input v-model:value="userInfo.email" />
          </n-form-item>
        </n-form>
        <div flex-center gap-x-8>
          <n-button type="primary" :loading="loading" @click="handleCommit">
            提交
          </n-button>
          <n-button @click="$router.back">
            返回
          </n-button>
        </div>
      </div>
    </div>
  </PageMain>
</template>
