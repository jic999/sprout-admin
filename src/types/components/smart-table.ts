import type { DataTableProps } from 'naive-ui'

export interface SmartTableProps {
  getData: {
    type: Function
    required: true
  }
  isPagination: {
    type: Boolean
    default: true
  }
  queryParams: {
    type: Object
    default: () => ({})
  }
  viewDataHandler: {
    type: (data: any) => any
    default: (data: any) => any
  }
  tableAttrs: {
    type: DataTableProps
    required: true
  }
}
