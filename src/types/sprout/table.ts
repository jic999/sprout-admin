import type { DataTableProps, TableColumn, TableColumns } from 'naive-ui/es/data-table/src/interface'
import type { ApiRequest } from '@/types'

export type SpTableColumn = TableColumn
export type SpTableColumns = TableColumns

export interface SpTableProps {
  getData: ApiRequest
  columns?: TableColumns
  /* 是否分页 决定data获取方式 */
  isPagination?: boolean
  queryParams?: object
  tableAttrs?: DataTableProps
}
