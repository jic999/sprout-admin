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
  // eslint-disable-next-line no-console
  console.log('Request: config.data ==> ', config.data)
  return config
})

// 响应拦截器
axios.interceptors.response.use(
  (res) => {
    const r = res.data
    if (r.code !== 200)
      return { ...r, err: new Error(r.message) }
    // eslint-disable-next-line no-console
    console.log('Response: res.data ==> ', r.data)
    return r
  },
  (error) => {
    if (error.response?.data)
      return { ...error.response.data, err: new Error(error.response.data.message) }
    // eslint-disable-next-line no-console
    console.log('Response: error ==> ', error)
    return { code: error.response?.status, msg: error.message, err: error }
  },
)

export function req<T = any>(method: Method, url: string, data?: any, config?: AxiosRequestConfig<any>) {
  return axios({
    // default config
    baseURL: '/api/admin/',
    timeout: 30000,
    // Custom
    method,
    url,
    data,
    withCredentials: true,
    ...config,
  }) as Promise<RequestResult<T>>
}

export type CustomRequest = typeof req
