<script setup lang="ts">
import type { FormInst, FormRules } from 'naive-ui'
import { reqEditUserInfo } from '@/apis/login'

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
              action="xxx"
              :default-file-list="[]"
              list-type="image-card"
              response-type="json"
              :max="1"
            />
          </n-form-item>
          <n-form-item label="邮箱地址" path="email">
            <n-input v-model:value="userInfo.email" />
          </n-form-item>
        </n-form>
        <div flex-center>
          <n-button type="primary" :loading="loading" @click="handleCommit">
            提交
          </n-button>
        </div>
      </div>
    </div>
  </PageMain>
</template>
