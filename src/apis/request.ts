import axios from 'axios'
import { ENV, getToken } from '@/utils'

export interface Result {
  code: number
  msg: string
  data: any
  err: Error
}

export const SUCCESS_CODE = 0

export declare type RequestResult = Promise<Result>

export const req = axios.create({
  baseURL: ENV.VITE_API_BASE_URL,
  timeout: 5000,
})

req.interceptors.request.use((config) => {
  // 是否携带token
  if (!config.cancelToken)
    config.headers.Authorization = getToken() || ''

  return config
})

req.interceptors.response.use(
  (res) => {
    // 请求成功的回调函数
    if (res.data.code !== SUCCESS_CODE)
      return { ...res.data, err: new Error(res.data.msg) }
    return res.data
  },
  (err) => {
    // 请求失败的回调函数
    return { err }
  },
)

export function objToQueryStr(obj: object) {
  const queryStr = new URLSearchParams()
  for (const key in obj)
    queryStr.append(key, obj[key as keyof object])
  return `${queryStr.toString()}`
}
