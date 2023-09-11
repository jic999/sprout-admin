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
export type SpFormItemOption = CascaderOption
| SelectOption
| TreeSelectOption
| SelectGroupOption
| SelectRenderOption
export type SpFormItemType = keyof SpFormTypePropMap

export interface SpFormItem<T extends SpFormItemType> {
  type: T
  label: string
  value: unknown
  attrs?: SpFormTypePropMap[T]
  formItemAttrs?: FormItemProps
  rule?: FormItemRule
  options?: SpFormItemOption[]
}

export function defineFormItems<T extends SpFormItemType>(items: Record<string, SpFormItem<T>>) {
  return items
}

export interface SpFormProps {
  items: Record<string, SpFormItem<SpFormItemType>>
  modelValue: Record<string, any>
  disabled?: boolean
  excludes?: string[]
}
