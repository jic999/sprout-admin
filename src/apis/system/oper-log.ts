import type { RequestResult } from '../request'
import { objToQueryStr } from '@/utils'

export const operLogApi = {
  list(): RequestResult {
    return req.get('/monitor/oper-log/list')
  },
  page(params: any): RequestResult {
    return req.get(`/monitor/oper-log/page?${objToQueryStr(params)}`)
  },
}
