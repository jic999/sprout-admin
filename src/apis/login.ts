import { req } from '@/utils'

export function reqLogin(data: any) {
  return req('post', '/login', data)
}
export function reqUserInfo() {
  return req('get', '/getUserInfo')
}
export function reqLogout() {
  return req('post', '/logout')
}
export function reqRefreshToken(data: any) {
  return req('get', '/refreshToken', data)
}
export function reqEditUserInfo(data: any) {
  return req('post', '/editUserInfo', data)
}

export const UPLOAD_AVATAR_TARGET = '/api/file/avatar'

export function getAvatarUrl(filename: string) {
  return `/static/images/avatar/${filename}`
}
