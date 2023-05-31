import { lStorage } from '@/utils'

const TOKEN_CODE = 'access_token'
const DURATION = 10 * 3600

export function getToken() {
  return lStorage.get(TOKEN_CODE)
}

export function setToken(token: string) {
  lStorage.set(TOKEN_CODE, token, DURATION)
}

export function removeToken() {
  lStorage.remove(TOKEN_CODE)
}

export function hasRole(needRoles: string[], withRoles: string[]) {
  return needRoles.some(role => withRoles.findIndex(withRole => withRole === role) !== -1)
}

export function hasPerm(needPerm: string, withPerms: string[]) {
  return !needPerm || withPerms.includes(needPerm)
}
