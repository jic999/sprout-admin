import type { RequestResult } from '../request'
import { objToQueryStr } from '@/utils'

export const loginLogApi = {
  list(): RequestResult {
    return req.get('/monitor/login-log/list')
  },
  page(params: any): RequestResult {
    return req.get(`/monitor/login-log/page?${objToQueryStr(params)}`)
  },
}
