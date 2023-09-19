import type { RequestResult } from './request'
import type { FilterNegativeQueryOptions } from './utils'

export type ApiRequest = (...args: any[]) => Promise<RequestResult>

export interface UseCrudApis {
  create: ApiRequest
  update: ApiRequest
  delete: ApiRequest
  batchDelete?: ApiRequest
}

/**
 * Receive raw data, return processed data
 * you can process data or perform some operations here
 * @param form form data
 * @param row the data of the current row
 * @param result the data returned by the request
 */
export type UseCrudHook<T = any> = (params: {
  form: T
  row?: T & Record<string, any>
  result?: any
}) => any

/**
 * the first param is form data, the second is the data returned by request
 */
export interface UseCrudHooks<T = any> {
  beforeView?: UseCrudHook<T>
  beforeCreate?: UseCrudHook<T>
  beforeUpdate?: UseCrudHook<T>
  afterView?: UseCrudHook<T>
  afterCreate?: UseCrudHook<T>
  afterUpdate?: UseCrudHook<T>
  before?: UseCrudHook<T>
  after?: UseCrudHook<T>
}
/**
 * Exclude some unnecessary fields
 * Performed before the hooks
 */
export interface UseCrudFilters<T extends Record<string, any>> extends FilterNegativeQueryOptions<T> {
  create?: (keyof T)[]
  update?: (keyof T)[]
}
export interface UseCrudParams<T extends Record<string, any>> {
  title: string
  form: T
  apis: UseCrudApis
  refresh: Function
  validator: { validate: Function; restore?: Function }
  hooks?: UseCrudHooks<T>
  filters?: UseCrudFilters<T>
  getCheckedKeys?: () => (string | number)[]
}
