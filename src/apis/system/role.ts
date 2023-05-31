import type { RequestResult } from '../request'
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
  assignMenus(params: any): RequestResult {
    return req.post('/system/role/assign-menus', params)
  },
  menus(id: number): RequestResult {
    return req.get(`/system/role/menus?roleId=${id}`)
  },
}
