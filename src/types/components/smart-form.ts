import type {
  CascaderOption,
  CascaderProps,
  CheckboxGroupProps,
  CheckboxProps,
  FormItemProps,
  FormItemRule,
  InputNumberProps,
  InputProps,
  RadioProps,
  SelectGroupOption,
  SelectOption,
  SelectProps,
  SelectRenderOption,
  SwitchProps,
  TreeSelectOption,
  UploadProps,
} from 'naive-ui'

export type SmartFormItemType = 'NumberInput' | 'Input' | 'Switch' | 'Radio' | 'Checkbox' | 'CheckboxGroup' | 'Select' | 'Cascader' | 'Upload'
export type SmartFormItemAttrs = InputNumberProps | InputProps | SwitchProps | RadioProps | CheckboxProps | CheckboxGroupProps | SelectProps | CascaderProps | UploadProps

export type SmartFormItemOption = CascaderOption
| SelectOption
| TreeSelectOption
| SelectGroupOption
| SelectRenderOption
export interface SmartFormItem {
  type: SmartFormItemType
  label: string
  value: any
  attrs?: SmartFormItemAttrs
  formItemAttrs?: FormItemProps
  rule?: FormItemRule
  options?: SmartFormItemOption[]
}

export type SmartFormItems<T extends Record<string, SmartFormItem>> = {
  [K in keyof T]: SmartFormItem
}

export const defFormItems = <T extends Record<string, SmartFormItem>>(value: T): SmartFormItems<T> => value

export interface SmartFormProps {
  formItems: {
    type: SmartFormItem
    required: true
  }
  modelValue: {
    type: Object
    required: true
  }
  disabled: {
    type: Boolean
    default: false
  }
  excludes: {
    type: string[]
    default: undefined
  }
}
