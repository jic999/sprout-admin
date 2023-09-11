import { isEmpty, isString } from 'lodash-es'

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
