import type { RequestResult } from '../request'

export const loginLogApi = {
  list(): RequestResult {
    return req.get('/monitor/login-log/list')
  },
  page(params: any): RequestResult {
    return req.get('/monitor/login-log/page', { params })
  },
}
