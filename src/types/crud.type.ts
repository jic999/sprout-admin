import type {
  CascaderProps,
  CheckboxGroupProps,
  CheckboxProps,
  FormItemProps,
  FormItemRule,
  InputNumberProps,
  InputProps,
  RadioProps,
  SelectProps,
  SwitchProps,
  UploadFileInfo,
  UploadProps,
} from 'naive-ui'
import type { InternalRowData, TableColumn } from 'naive-ui/es/data-table/src/interface'
import type { VNode } from 'vue'
import type { RequestResult } from '@/apis/request'

/* useCrud */
export declare type CrudRequest = (...args: any[]) => RequestResult
export declare type CrudParamsHandler<T extends object> = (params: CrudParams<T>) => any
export interface CrudParamsHandlers<T extends object> {
  createParamsHandler?: CrudParamsHandler<T>
  updateParamsHandler?: CrudParamsHandler<T>
}

export interface UseCrudApis {
  create: CrudRequest
  update: CrudRequest
  delete: CrudRequest
}
export interface UseCrudParams {
  title: string
  formData: Object
  apis: UseCrudApis
  refresh: Function
  validator: { validate: Function; restore?: Function }
  createParamsHandler?: CrudParamsHandler<any>
  updateParamsHandler?: CrudParamsHandler<any>
  viewValuesHandler?: CrudParamsHandler<any>
}
export interface SmartFormItemOption {
  label: string
  value: string
  options?: SmartFormItemOption[]
}

/* Components */
export declare type SmartFormItemType = 'NumberInput' | 'Input' | 'Switch' | 'Radio' | 'Checkbox' | 'CheckboxGroup' | 'Select' | 'Cascader' | 'Upload'
export declare type SmartFormItemAttrs = InputNumberProps | InputProps | SwitchProps | RadioProps | CheckboxProps | CheckboxGroupProps | SelectProps | CascaderProps | UploadProps
export declare type CrudExtendAction = (row: InternalRowData, i: number) => VNode[]
export interface SmartFormItem {
  type: SmartFormItemType
  label: string
  value: any
  attrs?: SmartFormItemAttrs
  formItemAttrs?: FormItemProps
  rule?: FormItemRule
  options?: SmartFormItemOption[]
}

// export interface SmartFormItems {
//   [K: string]: SmartFormItem
// }

// 定义一个类型函数，它接受一个对象作为参数，并返回一个包含对象属性的类型
export declare type SmartFormItems<T extends Record<string, SmartFormItem>> = {
  [key in keyof T]: SmartFormItem
}

// 定义一个类型函数，它接受一个值作为参数，并返回一个包含值属性的类型
export type InferSmartFormItems<T> = T extends SmartFormItems<infer U> ? U : never
export type CrudParams<T extends object> = Record<keyof T, any>

// 使用类型函数来创建一个对象
export const defFormItems = <T extends Record<string, SmartFormItem>>(value: T): SmartFormItems<T> => value

export interface CrudApis {
  create: CrudRequest
  update: CrudRequest
  delete: CrudRequest
  list?: CrudRequest
  page?: CrudRequest
}
/* Upload */

export declare interface UploadHandlerOptions {
  file: Required<UploadFileInfo>
  event?: ProgressEvent
}

/* CRUD */
export interface CrudItemFormItem {
  value: any
  type: SmartFormItemType
  attrs?: SmartFormItemAttrs
  rule?: FormItemRule
  options?: SmartFormItemOption[]
}
export declare type CrudItemTableColumn = TableColumn
export interface SmartCrudItem {
  title: string
  formItem: CrudItemFormItem
  tableColumn?: Partial<CrudItemTableColumn>
}
export declare type SmartCrudItems<T extends Record<string, SmartCrudItem>> = {
  [key in keyof T]: SmartCrudItem
}
export const defCrudItems = <T extends Record<string, SmartCrudItem>>(value: T): SmartCrudItems<T> => value
