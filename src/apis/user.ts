import type { RequestResult } from './request'
import { objToQueryStr } from '@/utils'

export const userApi = {
  create(user: any): RequestResult {
    return req.post('/system/user', user)
  },
  delete(id: number): RequestResult {
    return req.delete(`/system/user/${id}`)
  },
  update(user: any): RequestResult {
    return req.put('/system/user', user)
  },
  list(): RequestResult {
    return req.get('/system/user/list')
  },
  page(params: any): RequestResult {
    return req.get(`/system/user/page?${objToQueryStr(params)}`)
  },
  assignRoles(params: any): RequestResult {
    return req.post('/system/user/assign-roles', params)
  },
  roles(id: number): RequestResult {
    return req.get(`/system/user/roles?userId=${id}`)
  },
}
