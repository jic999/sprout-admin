import type { FormItemRule, FormRules } from 'naive-ui'
import type { InternalRowData, TableColumn } from 'naive-ui/es/data-table/src/interface'
import type { VNode } from 'vue'
import type { ApiRequest, SpFormItemType, SpFormProps, SpFormTypeOptionMap, SpFormTypePropMap, SpTableProps, UseCrudParams } from '@/types'

export interface CrudApis {
  create?: ApiRequest
  update?: ApiRequest
  delete?: ApiRequest
  list?: ApiRequest
  page?: ApiRequest
  batchDelete?: ApiRequest
}

export type SpCrudItemTableColumn = TableColumn

export interface SpCrudItemFormItem<T extends SpFormItemType> {
  value: unknown
  type: T
  props?: SpFormTypePropMap[T]
  rule?: FormRules | FormItemRule | FormItemRule[]
  options?: SpFormTypeOptionMap[T][]
}

export interface SpCrudItem<T extends SpFormItemType> {
  title: string
  formItem?: SpCrudItemFormItem<T>
  tableColumn?: Partial<SpCrudItemTableColumn>
}

export type SpCrudItems<
  T extends SpFormItemType,
  R extends Record<string, SpCrudItem<SpFormItemType>>,
> = {
  [k in keyof R]: SpCrudItem<T>
}

/**
 * 类型推导 可以推导出 props 和 options
 */
export function defineCrudItem<T extends SpFormItemType>(value: SpCrudItem<T>): SpCrudItem<T> {
  return value
}

/**
 * 类型推导 但无法推断出 props 和 options
 */
export function defineCrudItems<T extends SpFormItemType, R extends Record<string, SpCrudItem<T>>>(
  value: R,
): R {
  return value
}

/**
 * 扩展默认 Action
 */
export type SpCrudActionExtender = (row: InternalRowData, i: number) => VNode[]

export interface SpCrudExtendActions {
  before?: SpCrudActionExtender
  after?: SpCrudActionExtender
}

export interface SpCrudQueryOption {
  label: string
  value: string | number
}
export type SpCrudQueryOptions = Record<string, SpCrudQueryOption>
export interface SpCrudProps {
  /* crudItems */
  crudItems: SpCrudItems<any, any>
  /* crud apis */
  apis: CrudApis
  /* 表格参数 */
  tableProps?: SpTableProps
  /* 表单参数 */
  formProps?: SpFormProps
  /* 想沿用默认actions 但要扩展更多行为时可用 */
  extendActions?: SpCrudExtendActions
  /* useCrudParams */
  useCrudParams?: UseCrudParams<any>
  /* 查询参数 */
  queryParams?: object
  /* * With defaults */
  /* 页面标题 */
  title?: string
  /* 实体名称 */
  entityName?: string
  /* 是否分页 */
  isPagination?: boolean
  /* 是否完全自定义操作 为true时 不会显示默认的action列 */
  isCustomActions?: boolean
}

// types for expose
export interface SpCrudExpose {
  handleQuery: () => void
  handleReset: () => void
  getCheckedKeys: () => Array<number | string>
  getFormData: () => any
  // useCrud
  getFormTitle: () => string
  getFormAction: () => string
  getFormVisible: () => boolean
  getFormLoading: () => boolean
  handleView: (row: any) => void
  handleCreate: () => void
  handleUpdate: (row: any) => void
  handleDelete: (id: number | string) => void
  handleBatchDelete: () => void
  handleCommit: () => Promise<void>
  handleCancel: () => void
}
