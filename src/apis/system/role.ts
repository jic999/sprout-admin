import { req } from '@/utils'

export const sysRoleApi = {
  create(data: any) {
    return req('post', '/system-role', data)
  },
  update(data: any) {
    return req('patch', `/system-role/${data.id}`, data)
  },
  delete(id: any) {
    return req('delete', `/system-role/${id}`)
  },
  list() {
    return req('get', '/system-role')
  },
  get(id: any) {
    return req('get', `/system-role/${id}`)
  },
  page(data: any) {
    return req('get', '/system-role/page', data)
  },
}
