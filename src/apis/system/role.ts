import type { RequestResult } from '../request'

export const roleApi = {
  create(role: any): RequestResult {
    return req.post('/system/role', role)
  },
  assignMenus(data: any): RequestResult {
    return req.post('/system/role/assign-menus', data)
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
    return req.get('/system/role/page', { params })
  },
  menusByRoleId(roleId: any): RequestResult {
    return req.get('/system/role/menus', { params: { roleId } })
  },
}
