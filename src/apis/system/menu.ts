import type { RequestResult } from '../request'

export const menuApi = {
  create(menu: any): RequestResult {
    return req.post('/system/menu', menu)
  },
  delete(id: number): RequestResult {
    return req.delete(`/system/menu/${id}`)
  },
  update(menu: any): RequestResult {
    return req.put('/system/menu', menu)
  },
  list(): RequestResult {
    return req.get('/system/menu/list')
  },
  page(params: any): RequestResult {
    return req.get('/system/menu/page', { params })
  },
  optionsById(id: number): RequestResult {
    return req.get('/system/menu/options', { params: { id } })
  },
}
