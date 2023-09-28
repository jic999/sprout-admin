import { req } from '@/utils'

export const sysPermApi = {
  create(data: any) {
    return req('post', '/sys-perm', data)
  },
  update(data: any) {
    return req('patch', '/sys-perm', data)
  },
  delete(id: any) {
    return req('delete', `/sys-perm/${id}`)
  },
  list() {
    return req('get', '/sys-perm')
  },
  get(id: any) {
    return req('get', `/sys-perm/${id}`)
  },
  page(data: any) {
    return req('get', '/sys-perm/page', data)
  },
  routes() {
    return req('get', '/sys-perm/routes')
  },
}
