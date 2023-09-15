import type { TableColumn, TableColumns } from 'naive-ui/es/data-table/src/interface'
import { dataTableProps } from 'naive-ui/es/data-table/src/interface'
import type { DropdownProps } from 'naive-ui'
import type { ExtractPublicPropTypes } from 'naive-ui/es/_utils'

export type SpTableColumn = TableColumn
export type SpTableColumns = TableColumns

export interface TableRowActionsProps {
  row: any
  index: number
  dropdownOptions?: DropdownProps['options']
  noMore?: boolean
}

export const spTableProps = {
  ...dataTableProps,
  getData: {
    type: Function,
    required: true,
  },
  queryParams: {
    type: Object,
    default: () => ({}),
  },
  isPagination: {
    type: Boolean,
    default: false,
  },
}

export type SpTableProps = ExtractPublicPropTypes<typeof spTableProps>
