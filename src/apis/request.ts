import axios from 'axios'
import { ENV, getToken } from '@/utils'

export interface Result {
  code: number
  msg: string
  data: any
}

export const SUCCESS_CODE = 0

export declare type RequestResult = Promise<Result>

export const req = axios.create({
  baseURL: ENV.VITE_API_BASE_URL,
  timeout: 5000,
})

req.interceptors.request.use((config) => {
  config.headers.Authorization = getToken() || ''
  return config
})

req.interceptors.response.use(
  (res) => {
    // 请求成功的回调函数
    return res.data
  },
  (err) => {
    // 请求失败的回调函数
    return Promise.reject(err)
  },
)
