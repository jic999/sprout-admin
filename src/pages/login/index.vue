<script setup lang="ts">
import { setToken } from '@/utils'
import { addDynamicRoutes } from '@/router'

defineOptions({
  name: 'Login',
})

const loginParams = reactive({
  username: '',
  password: '',
})
const loading = ref(false)

const userStore = useUserStore()
const router = useRouter()

async function handleLogin() {
  loading.value = true
  const { err, data } = await authApi.login(loginParams)
  loading.value = false
  if (err) {
    window.$message.error(err.message)
    return
  }
  setToken(data.token)
  userStore.setUserInfo(data.userInfo)
  await addDynamicRoutes()
  router.push({ path: '/' })
  window.$notification.success({ content: '登录成功', duration: 1500 })
}
</script>

<template>
  <div flex items-center h-100vh style="background: bottom/cover url('/img/login_bg.jpg');">
    <div mx-auto flex flex-wrap justify-center px-48 py-24 op-80 shadow-xl bg-fff w-320>
      <h3 text="20 $primary-c" italic>
        Sprout Admin
      </h3>
      <input
        v-model="loginParams.username"
        class="mb-16 w-full bg-f2f2f2 p-8"
        type="text"
        placeholder="用户名"
      >
      <input
        v-model="loginParams.password"
        type="password"
        placeholder="密码"
        mb-16 w-full bg-f2f2f2 p-8
        @keydown.enter="handleLogin"
      >
      <n-button class="w-full" type="primary" :loading="loading" @click="handleLogin">
        {{ loading ? '登录中' : '登录' }}
      </n-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
