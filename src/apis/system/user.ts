import { req } from '@/utils'

export const sysUserApi = {
  create(data: any) {
    return req('post', '/sys-user', data)
  },
  update(data: any) {
    return req('patch', '/sys-user', data)
  },
  delete(id: any) {
    return req('delete', `/sys-user/${id}`)
  },
  list() {
    return req('get', '/sys-user')
  },
  get(id: any) {
    return req('get', `/sys-user/${id}`)
  },
  page(data: any) {
    return req('get', '/sys-user/page', data)
  },
  batchDelete(ids: number[]) {
    return req('post', '/sys-user/batch-remove', { ids })
  },
  getWithRoles(id: any) {
    return req('get', `/sys-user/withRoles/${id}`)
  },
  assignRoles(data: any) {
    return req('post', '/sys-user/assignRoles', data)
  },
}
