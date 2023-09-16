import { req } from '@/utils'

export const sysUserApi = {
  create(data: any) {
    return req('post', '/system-user', data)
  },
  update(data: any) {
    return req('patch', `/system-user/${data.id}`, data)
  },
  delete(id: any) {
    return req('delete', `/system-user/${id}`)
  },
  list() {
    return req('get', '/system-user')
  },
  get(id: any) {
    return req('get', `/system-user/${id}`)
  },
  page(data: any) {
    return req('get', '/system-user/page', data)
  },
  batchDelete(ids: number[]) {
    return req('post', '/system-user/batch-remove', { ids })
  },
  getWithRoles(id: any) {
    return req('get', `/system-user/role/${id}`)
  },
  assignRoles(data: any) {
    return req('post', '/system-user/role', data)
  },
}
