import { req } from '@/utils'

export const sysPermApi = {
  create(data: any) {
    return req('post', '/system-permission', data)
  },
  update(data: any) {
    return req('patch', `/system-permission/${data.id}`, data)
  },
  delete(id: any) {
    return req('delete', `/system-permission/${id}`)
  },
  list() {
    return req('get', '/system-permission')
  },
  get(id: any) {
    return req('get', `/system-permission/${id}`)
  },
  page(data: any) {
    return req('get', '/system-permission/page', data)
  },
  routes() {
    return req('get', '/system-permission/routes')
  },
}
