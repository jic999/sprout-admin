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
