import type { TableColumn, TableColumns } from 'naive-ui/es/data-table/src/interface'
import { dataTableProps } from 'naive-ui/es/data-table/src/interface'
import type { DropdownProps } from 'naive-ui'
import type { ExtractPublicPropTypes } from 'naive-ui/es/_utils'
import type { PropType } from 'vue'

export type SpTableColumn = TableColumn
export type SpTableColumns = TableColumns

export interface TableRowActionsProps {
  row: any
  index: number
  dropdownOptions?: DropdownProps['options']
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
  voHandler: {
    type: Function as PropType<SpTableVoHandler>,
    default: (vo: any[]) => vo,
  },
  lazyShow: {
    type: Boolean,
    default: false,
  },
}

export type SpTableProps = ExtractPublicPropTypes<typeof spTableProps>
export type VoHandler<V, R = any> = (vo: V[]) => R[]
export type SpTableVoHandler = VoHandler<any>
