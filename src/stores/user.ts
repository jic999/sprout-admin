import { resetRouter } from '@/router'
import { removeToken } from '@/utils'

export interface UserInfo {
  id: number
  username: string
  avatar: string
  permissions: string[]
  roles: string[]
}

export const useUserStore = defineStore('user', () => {
  const userInfo = reactive<UserInfo>({
    id: 0,
    username: '',
    avatar: '',
    permissions: [],
    roles: [],
  })

  function setUserInfo(info: UserInfo) {
    Object.assign(userInfo, info)
  }
  async function getUserInfo() {
    try {
      const { code, data, msg } = await authApi.getUserInfo()
      if (code !== SUCCESS_CODE)
        throw new Error(msg)
      setUserInfo(data)
    }
    catch (error) {
      window.$message.error((error as Error).message)
    }
  }
  async function logout() {
    try {
      const { code, msg } = await authApi.logout()
      if (code !== SUCCESS_CODE)
        throw new Error(msg)
      removeToken()
      resetRouter()
      window.$notification.success({ content: '退出登录成功', duration: 1500 })
    }
    catch (error) {
      window.$message.error((error as Error).message)
    }
  }

  return {
    userInfo,
    setUserInfo,
    getUserInfo,
    logout,
  }
})
