import type { RequestResult } from '../request'

export const operLogApi = {
  list(): RequestResult {
    return req.get('/monitor/oper-log/list')
  },
  page(params: any): RequestResult {
    return req.get('/monitor/oper-log/page', { params })
  },
}
