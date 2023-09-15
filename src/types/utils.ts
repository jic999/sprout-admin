export interface FilterNegativeQueryOptions<T extends Record<string, any>> {
  undef?: boolean // undefined
  blank?: boolean // ''
  null?: boolean // null
  empty?: boolean // undefined || '' || null
  excludes?: (keyof T)[] // exclude fields
}
