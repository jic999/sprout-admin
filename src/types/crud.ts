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
 * @param data raw data
 * @param result the data returned by request
 * @returns processed data
 * @example (data, result) => ({ ...data, id: result.id })
 */
export type UseCrudHook<T = any> = (data: T, result?: any) => any

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
