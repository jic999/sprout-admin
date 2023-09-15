import { isEmpty, isNull, isString, isUndefined, pickBy } from 'lodash-es'
import type { FilterNegativeQueryOptions } from '@/types'

export function isExternalLink(url: string) {
  const pattern = /^(https?:\/\/)/i
  return pattern.test(url)
}

export function isBlank(value: unknown) {
  return isString(value) && isEmpty(value)
}

export function objToQueryStr(obj: object) {
  const queryStr = new URLSearchParams()
  for (const key in obj)
    queryStr.append(key, obj[key as keyof object])
  return `${queryStr.toString()}`
}

export function filterNegativeQuery<T extends Record<string, any>>(obj: T, options?: FilterNegativeQueryOptions<T>) {
  const defaultOptions: FilterNegativeQueryOptions<T> = { empty: true }
  options = { ...defaultOptions, ...options }
  let newObj: Partial<T> = { ...obj }
  if (options.blank || options.empty)
    newObj = pickBy(newObj, (val, k) => !options!.excludes?.includes(k) && !isBlank(val)) as Partial<T>
  if (options.null || options.empty)
    newObj = pickBy(newObj, (val, k) => !options!.excludes?.includes(k) && !isNull(val)) as Partial<T>
  if (options.undef || options.empty)
    newObj = pickBy(newObj, (val, k) => !options!.excludes?.includes(k) && !isUndefined(val)) as Partial<T>
  return newObj
}
