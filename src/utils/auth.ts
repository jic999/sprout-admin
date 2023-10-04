import { reqRefreshToken } from '@/apis/login'
import { lStorage } from '@/utils'

const TOKEN_CODE = 'access_token'
const REFRESH_TOKEN_CODE = 'refresh_token'
const DURATION = 10 * 3600
const REFRESH_DURATION = 7 * 24 * 3600

export function getToken() {
  return lStorage.get(TOKEN_CODE)
}

export function getRefreshToken() {
  return lStorage.get(REFRESH_TOKEN_CODE)
}

export function setToken(token: string) {
  lStorage.set(TOKEN_CODE, token, DURATION)
}

export function setRefreshToken(token: string) {
  lStorage.set(REFRESH_TOKEN_CODE, token, REFRESH_DURATION)
}

export function removeToken() {
  lStorage.remove(TOKEN_CODE)
  lStorage.remove(REFRESH_TOKEN_CODE)
}

export async function refreshToken(refreshToken: string) {
  const { err, data } = await reqRefreshToken({ token: refreshToken })
  if (err) {
    console.error(err)
    return
  }
  setToken(data.access_token)
  setRefreshToken(data.refresh_token)
}

export function hasPerm(needPerms: string | string[], perms: string[]) {
  return normalizePerms(needPerms).every(perm => perms.includes(perm))
}
export function hasSomePerm(needPerms: string | string[], perms: string[]) {
  return normalizePerms(needPerms).some(perm => perms.includes(perm))
}
export function normalizePerms(perms: string | string[]): string[] {
  return Array.isArray(perms) ? perms : [perms]
}
