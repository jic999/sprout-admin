import type { FormItemRule } from 'naive-ui'
import type { InternalRowData, TableColumn } from 'naive-ui/es/data-table/src/interface'
import type { VNode } from 'vue'
import type { SmartFormItemAttrs, SmartFormItemOption, SmartFormItemType } from './smart-form'
import type { CrudRequest } from '@/types'

export type CrudExtendAction = (row: InternalRowData, i: number) => VNode[]

export interface CrudApis {
  create: CrudRequest
  update: CrudRequest
  delete: CrudRequest
  list?: CrudRequest
  page?: CrudRequest
}

export interface CrudItemFormItem {
  value: any
  type: SmartFormItemType
  attrs?: SmartFormItemAttrs
  rule?: FormItemRule
  options?: SmartFormItemOption[]
}
export type CrudItemTableColumn = TableColumn
export interface SmartCrudItem {
  title: string
  formItem: CrudItemFormItem
  tableColumn?: Partial<CrudItemTableColumn>
}
export type SmartCrudItems<T extends Record<string, SmartCrudItem>> = {
  [K in keyof T]: SmartCrudItem
}
export const defCrudItems = <T extends Record<string, SmartCrudItem>>(value: T): SmartCrudItems<T> => value
