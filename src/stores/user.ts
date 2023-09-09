import { reqLogout, reqUserInfo } from '@/apis/login'
import { removeTabBarData, removeToken } from '@/utils'

export interface UserInfo {
  id: string
  username: string
  nickname: string
  email: string
  avatar: string
  sex: string
}
export const useUserStore = defineStore('user', () => {
  const userInfo = ref<UserInfo | null>(null)

  function setUserInfo(info: UserInfo) {
    userInfo.value = info
  }
  async function getUserInfo() {
    const { err, data } = await reqUserInfo()
    if (err) {
      window.$message.error(err.message)
      // TODO 若token过期 跳转登录页
      return
    }
    setUserInfo(data)
  }
  async function logout() {
    const { err, msg } = await reqLogout()
    if (err) {
      window.$message.error(err.message)
      return
    }
    window.$notification.success({ content: msg, duration: 2000 })
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
