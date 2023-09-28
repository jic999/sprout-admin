import type { AxiosRequestConfig, Method } from 'axios'
import axios from 'axios'
import { getToken, objToQueryStr } from '@/utils'
import type { RequestResult } from '@/types'

// 请求拦截器
axios.interceptors.request.use((config) => {
  // 是否携带token
  if (!config.cancelToken) {
    const token = getToken()
    config.headers.Authorization = token ? `Bearer ${token}` : ''
  }
  // 拼接query参数
  if (config.data && ['get', 'GET'].includes(config.method!))
    config.url += `?${objToQueryStr(config.data)}`
  console.log('config.data :>> ', config.data)
  return config
})

// 响应拦截器
axios.interceptors.response.use(
  (res) => {
    const r = res.data
    if (r.code !== 200)
      return { ...r, err: new Error(r.message) }
    return r
  },
  (error) => {
    if (error.response?.data)
      return { ...error.response.data, err: new Error(error.response.data.message) }
    console.log('error ==> ', error)
    return { code: error.response?.status, msg: error.message, err: error }
  },
)

export function req<T = any>(method: Method, url: string, data?: any, config?: AxiosRequestConfig<any>) {
  return axios({
    // default config
    baseURL: '/api/admin',
    timeout: 5000,
    // Custom
    method,
    url,
    data,
    ...config,
  }) as Promise<RequestResult<T>>
}

export type CustomRequest = typeof req
