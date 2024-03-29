<script setup lang="ts">
import type { FormRules } from 'naive-ui'
import type { VueCookies } from 'vue-cookies'
import { reqLogin } from '@/apis/login'
import { setRefreshToken, setToken } from '@/utils'
import { addDynamicRoutes } from '@/router'

const $cookies = inject<VueCookies>('$cookies')

const router = useRouter()
const userStore = useUserStore()

const $form = ref()
const loginParams = reactive({
  username: '',
  password: '',
  checkCode: '',
})
const rules: FormRules = {
  username: { trigger: 'blur', required: true, min: 5, message: '用户名长度应大于5' },
  password: { trigger: 'blur', required: true, min: 6, message: '密码长度应大于6' },
  checkCode: { trigger: 'blur', required: true, len: 4, message: '验证码长度为4' },
}
const loading = ref(false)
const loginSettings = reactive({
  rememberMe: false,
})

const checkCodeUrl = ref('')
function getCheckCode() {
  checkCodeUrl.value = `${REQ_BASE_URL}/user/getCheckCode?time=${Date.now()}`
}
function handleLogin() {
  $form.value.validate(async (errs: any) => {
    if (errs)
      return
    loading.value = true
    const { err, data } = await reqLogin(loginParams)
    loading.value = false
    if (err) {
      getCheckCode()
      loginParams.checkCode = ''
      $message.error(err.message)
      return
    }
    $message.success('登录成功')
    // 若记住密码 信息存入cookie 否则清空cookie
    if (loginSettings.rememberMe) {
      const loginInfo = {
        username: loginParams.username,
        password: loginParams.password,
        rememberMe: loginSettings.rememberMe,
      }
      $cookies?.set('loginInfo', loginInfo)
    }
    else {
      $cookies?.remove('loginInfo')
    }
    // 记录用户状态
    userStore.setUserInfo(data.user)
    // 存储 token
    setToken(data.accessToken)
    setRefreshToken(data.refreshToken)
    await addDynamicRoutes()
    router.push('/')
  })
}
function initForm() {
  const loginInfo = $cookies?.get('loginInfo')
  if (loginInfo) {
    loginParams.username = loginInfo.username
    loginParams.password = loginInfo.password
    loginSettings.rememberMe = loginInfo.rememberMe
  }
}

const BG_URL = 'https://cdn.jsdelivr.net/gh/jic999/images/blog/sprout_admin_login_bg.jpg'
onMounted(async () => {
  initForm()
  getCheckCode()
})
</script>

<template>
  <div
    :style="{ background: `left bottom/cover url(${BG_URL})`, filter: isDark ? 'brightness(0.7)' : undefined }"
    h-100vh w-full flex-center
  >
    <section mb="10%" mx-auto w-360px flex flex-col gap-y-sm rounded-lg bg="$sp-main-bg-c" p-lg op-90 shadow>
      <div flex-center gap-x-xs text-xl font-600 text-primary>
        <span i-carbon:sprout text-28px />
        <span>Sprout Admin</span>
      </div>
      <n-form ref="$form" :model="loginParams" label-placement="left" :rules="rules">
        <n-form-item path="username">
          <n-input v-model:value="loginParams.username" placeholder="请输入用户名" size="large" @keydown.enter="handleLogin">
            <template #prefix>
              <div i-carbon:user mr-6px scale-120 op-60 />
            </template>
          </n-input>
        </n-form-item>
        <n-form-item path="password">
          <n-input v-model:value="loginParams.password" placeholder="请输入密码" size="large" type="password" show-password-on="mousedown" @keydown.enter="handleLogin">
            <template #prefix>
              <div i-carbon:password mr-6px scale-120 op-60 />
            </template>
          </n-input>
        </n-form-item>
        <n-form-item path="checkCode">
          <n-input v-model:value="loginParams.checkCode" placeholder="请输入验证码" size="large" @keydown.enter="handleLogin">
            <template #prefix>
              <div i-carbon:bot mr-6px scale-120 op-60 />
            </template>
          </n-input>
          <img :src="checkCodeUrl" h-40px @click="getCheckCode">
        </n-form-item>
        <n-checkbox v-model:checked="loginSettings.rememberMe">
          记住我
        </n-checkbox>
      </n-form>
      <n-button v-throttle="handleLogin" type="primary" w-full :loading="loading">
        登录
      </n-button>
    </section>
  </div>
</template>
