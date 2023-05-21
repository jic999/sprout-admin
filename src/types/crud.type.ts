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
  UploadProps,
} from 'naive-ui'
import type { InternalRowData } from 'naive-ui/es/data-table/src/interface'
import type { VNode } from 'vue'
import type { RequestResult } from '@/apis/request'

/* useCrud */
export declare type CrudRequest = (...args: any[]) => RequestResult
export declare type CrudParamsHandler = (params: unknown) => any

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
  createParamsHandler?: CrudParamsHandler
  updateParamsHandler?: CrudParamsHandler
  viewValuesHandler?: CrudParamsHandler
}

/* Components */
export declare type CrudExtendAction = (row: InternalRowData, i: number) => VNode[]
export interface SmartFormItem {
  type: 'NumberInput' | 'Input' | 'Switch' | 'Radio' | 'Checkbox' | 'CheckboxGroup' | 'Select' | 'Cascader' | 'Upload'
  label: string
  value: any
  attrs?: InputNumberProps | InputProps | SwitchProps | RadioProps | CheckboxProps | CheckboxGroupProps | SelectProps | CascaderProps | UploadProps
  formItemAttrs?: FormItemProps
  rule?: FormItemRule
  options?: any
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

// 使用类型函数来创建一个对象
export const defFormItems = <T extends Record<string, SmartFormItem>>(value: T): SmartFormItems<T> => value

export interface CrudParamsHandlers {
  createParamsHandler?: CrudParamsHandler
  updateParamsHandler?: CrudParamsHandler
}

export interface CrudApis {
  create: CrudRequest
  update: CrudRequest
  delete: CrudRequest
  list?: CrudRequest
  page?: CrudRequest
}
