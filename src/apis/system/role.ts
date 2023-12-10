import { req } from '@/utils'

export const sysRoleApi = {
  create(data: any) {
    return req('post', '/sys-role', data)
  },
  update(data: any) {
    return req('patch', '/sys-role', data)
  },
  delete(id: any) {
    return req('delete', `/sys-role/${id}`)
  },
  list(data: any) {
    return req('get', '/sys-role', data)
  },
  get(id: any) {
    return req('get', `/sys-role/${id}`)
  },
  page(data: any) {
    return req('get', '/sys-role/page', data)
  },
  batchDelete(ids: number[]) {
    return req('post', '/sys-role/batchRemove', { ids })
  },
  assignPerms(data: any) {
    return req('post', '/sys-role/assignPerms', data)
  },
}
