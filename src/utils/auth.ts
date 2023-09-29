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

export function hasPerm(needPerms: string[], perms: string[]) {
  return needPerms.every(perm => perms.includes(perm))
}
