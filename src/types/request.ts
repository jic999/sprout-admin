export type { CustomRequest } from '@/utils'
export interface RequestResult<T = any> {
  code: number
  msg: string
  err?: Error
  data: T
}
