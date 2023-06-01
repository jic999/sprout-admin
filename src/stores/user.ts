import { StorageKeyEnum } from '@/enums'
import { resetRouter } from '@/router'
import { removeToken, sStorage } from '@/utils'

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
    Object.assign(userInfo, { ...info, roles: info.roles || [], permissions: info.permissions || [] })
  }
  async function getUserInfo() {
    const { data, err } = await authApi.getUserInfo()
    if (err) {
      window.$message.error(err.message)
      return
    }
    setUserInfo(data)
  }
  async function logout() {
    const { err } = await authApi.logout()
    if (err) {
      window.$message.error((err.message))
      return
    }
    window.$notification.success({ content: '退出登录成功', duration: 1500 })
    removeToken()
    resetRouter()
    sStorage.remove(StorageKeyEnum.TagBarData)
  }

  return {
    userInfo,
    setUserInfo,
    getUserInfo,
    logout,
  }
})
