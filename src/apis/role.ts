import type { RequestResult } from './request'
import { objToQueryStr } from '@/utils'

export const roleApi = {
  create(role: any): RequestResult {
    return req.post('/system/role', role)
  },
  delete(id: number): RequestResult {
    return req.delete(`/system/role/${id}`)
  },
  update(role: any): RequestResult {
    return req.put('/system/role', role)
  },
  list(): RequestResult {
    return req.get('/system/role/list')
  },
  page(params: any): RequestResult {
    return req.get(`/system/role/page?${objToQueryStr(params)}`)
  },
  assign(params: any): RequestResult {
    return req.post('/system/role/assign', params)
  },
}
