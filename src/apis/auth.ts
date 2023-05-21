import { req } from './request'
import type { RequestResult } from './request'

export const authApi = {
  login(loginParams: any): RequestResult {
    return req.post('/system/login', loginParams)
  },
  getUserInfo(): RequestResult {
    return req.get('/system/user-info')
  },
  logout(): RequestResult {
    return req.post('/system/logout')
  },
}
