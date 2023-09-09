import type { RequestResult } from './request'

export type ApiRequest = (...args: any[]) => Promise<RequestResult>

export interface UseCrudApis {
  create: ApiRequest
  update: ApiRequest
  delete: ApiRequest
}

export interface UseCrudParams {
  title: string
  formData: any
  apis: UseCrudApis
  refresh: Function
  validator: { validate: Function; restore?: Function }
}
