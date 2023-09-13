import type {
  CascaderOption,
  CascaderProps,
  CheckboxGroupProps,
  CheckboxProps,
  FormItemProps,
  FormItemRule,
  FormProps,
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

export interface SpFormTypePropMap {
  'NumberInput': InputNumberProps
  'Input': InputProps
  'Switch': SwitchProps
  'Radio': RadioProps
  'Checkbox': CheckboxProps
  'CheckboxGroup': CheckboxGroupProps
  'Select': SelectProps
  'Cascader': CascaderProps
  'Upload': UploadProps
}
export type SpFormItemType = keyof SpFormTypePropMap

export type RadioGroupOption = RadioProps
export type CheckboxOption = CheckboxProps

export interface SpFormTypeOptionMap {
  'NumberInput': undefined
  'Input': undefined
  'Switch': undefined
  'Radio': RadioGroupOption
  'Checkbox': CheckboxOption
  'CheckboxGroup': CheckboxOption
  'Select': SelectOption | SelectGroupOption
  'Cascader': CascaderOption
  'Upload': undefined
}

export type SpFormItemOption = CascaderOption
| SelectOption
| TreeSelectOption
| SelectGroupOption
| SelectRenderOption

export interface SpFormItem<T extends SpFormItemType> {
  type: T
  label: string
  value: unknown
  props?: SpFormTypePropMap[T]
  formItemProps?: FormItemProps
  rule?: FormItemRule
  options: SpFormTypeOptionMap[T][]
}

export function defineFormItems<T extends SpFormItemType>(items: Record<string, SpFormItem<T>>) {
  return items
}

export interface SpFormProps {
  items: Record<string, SpFormItem<any>>
  modelValue: Record<string, any>
  disabled?: boolean
  excludes?: string[]
  nAttrs?: FormProps
}
