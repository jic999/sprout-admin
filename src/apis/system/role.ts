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
  list(data: any) {
    return req('get', '/system-role', data)
  },
  get(id: any) {
    return req('get', `/system-role/${id}`)
  },
  page(data: any) {
    return req('get', '/system-role/page', data)
  },
  batchDelete(ids: number[]) {
    return req('post', '/system-role/batch-remove', { ids })
  },
}
