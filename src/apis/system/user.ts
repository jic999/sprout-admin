import type { RequestResult } from '../request'

export const userApi = {
  create(user: any): RequestResult {
    return req.post('/system/user', user)
  },
  assignRoles(data: any): RequestResult {
    return req.post('/system/user/assign-roles', data)
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
    return req.get('/system/user/page', { params })
  },
  roles(userId: number): RequestResult {
    return req.get('/system/user/roles', { params: { userId } })
  },
}
