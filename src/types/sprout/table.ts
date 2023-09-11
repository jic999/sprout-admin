import type { DataTableProps, TableColumns } from 'naive-ui/es/data-table/src/interface'

export interface SpTableProps {
  getData: Function
  columns?: TableColumns
  /* 是否分页 决定data获取方式 */
  isPagination?: boolean
  queryParams?: object
  tableAttrs?: DataTableProps
}
