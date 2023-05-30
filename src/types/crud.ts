import type { UploadFileInfo } from 'naive-ui'
import type { RequestResult } from '@/apis/request'

/* useCrud */
export type CrudRequest = (...args: any[]) => RequestResult
export type CrudParams<T extends object> = Record<keyof T, any>

export type CrudParamsHandler<T extends object> = (params: CrudParams<T>) => any
export interface CrudParamsHandlers<T extends object> {
  createParamsHandler?: CrudParamsHandler<T>
  updateParamsHandler?: CrudParamsHandler<T>
}

export interface UseCrudApis {
  create: CrudRequest
  update: CrudRequest
  delete: CrudRequest
}
export interface CrudExcludeFormFields {
  create?: string[]
  update?: string[]
}
export interface UseCrudParams {
  title: string
  formData: object
  apis: UseCrudApis
  refresh: Function
  validator: { validate: Function; restore?: Function }
  excludeFields?: CrudExcludeFormFields
  createParamsHandler?: CrudParamsHandler<any>
  updateParamsHandler?: CrudParamsHandler<any>
  viewValuesHandler?: CrudParamsHandler<any>
  beforeFormShow?: Function
  afterFormShow?: Function
  beforeCommit?: Function
  afterCommit?: Function
  commitSuccess?: Function
  commitFail?: Function
}

export interface UploadHandlerOptions {
  file: Required<UploadFileInfo>
  event?: ProgressEvent
}
