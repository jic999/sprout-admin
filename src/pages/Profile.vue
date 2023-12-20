<script setup lang="ts">
import type { FormInst, FormRules, UploadFileInfo, UploadInst } from 'naive-ui'
import type { NUploadBefore, NUploadError, NUploadFinish } from '@/types'

import { UPLOAD_AVATAR_TARGET, getAvatarUrl, reqEditUserInfo } from '@/apis/login'
import { cropImage } from '@/utils'

const userStore = useUserStore()

const userInfo = reactive({ ...userStore.userInfo })

const $form = ref<FormInst | null>(null)
const $upload = ref<UploadInst>()
const fileList = ref<UploadFileInfo[]>(userInfo.avatar
  ? [{ id: userInfo.id!, name: userInfo.username!, url: userInfo.avatar, status: 'finished' }]
  : [])

const rules: FormRules = {
  nickname: [{ required: true, min: 1, message: '请输入昵称' }],
  email: [{ type: 'email', message: '请输入正确的邮箱地址' }],
}

const loading = ref(false)

function handleCommit() {
  if (fileList.value.length && fileList.value[0].status !== 'finished') {
    $upload.value?.submit()
    return
  }
  reqUpdateUserInfo()
}
function reqUpdateUserInfo() {
  $form.value?.validate().then(async () => {
    loading.value = true
    const { err, data } = await reqEditUserInfo(userInfo)
    loading.value = false
    if (err) {
      $message.error(err.message)
      return
    }
    userStore.setUserInfo(data)
    $message.success('提交成功')
  })
}

/* 头像上传 */
const onBeforeUploadAvatar: NUploadBefore = async ({ file }) => {
  if (file.file!.size! > 1024 * 1024) {
    $message.error('上传头像大小不能超过1MB')
    return false
  }

  const result = await cropImage(file.file!)
  if (!result)
    return false
  file.file = result
}
const onUploadAvatarFinish: NUploadFinish = ({ file, event }) => {
  const res = (event!.target as XMLHttpRequest).response
  const url = getAvatarUrl(res.data)
  file.url = url
  userInfo.avatar = url
  reqUpdateUserInfo()
}
const onUploadAvatarError: NUploadError = ({ event }) => {
  const res = (event!.target as XMLHttpRequest).response
  $message.error(res.message)
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
              ref="$upload"
              v-model:file-list="fileList"
              :action="UPLOAD_AVATAR_TARGET"
              :default-upload="false"
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
