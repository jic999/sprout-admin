import { reqLogout, reqUserInfo } from '@/apis/login'
import { removeTabBarData, removeToken } from '@/utils'

export interface UserInfo {
  id: string
  username: string
  nickname: string
  email: string
  avatar: string
  sex: string
  roles: string[]
  perms: string[]
}
export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserInfo | null>(null)

  function setUserInfo(info: UserInfo) {
    userInfo.value = info
  }
  async function getUserInfo() {
    const { err, data } = await reqUserInfo()
    if (err) {
      $message?.error(err?.message || '获取用户信息失败')
      // clearLoginInfo()
      // useRouter().push('/login')
      return
    }
    setUserInfo(data)
  }
  async function logout() {
    const { err } = await reqLogout()
    if (err) {
      $message.error(err.message)
      return
    }
    $notification.success({ content: '已退出登录', duration: 2000 })
    clearLoginInfo()
  }
  function clearLoginInfo() {
    removeToken()
    userInfo.value = null
    removeTabBarData()
  }

  return {
    userInfo,
    setUserInfo,
    getUserInfo,
    logout,
  }
})
