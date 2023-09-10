import { isEmpty, isString } from 'lodash-es'

export function isExternalLink(url: string) {
  const pattern = /^(https?:\/\/)/i
  return pattern.test(url)
}

export function isBlank(value: unknown) {
  return isString(value) && isEmpty(value)
}
