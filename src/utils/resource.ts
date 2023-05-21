import { VITE_API_BASE_URL } from '@/utils'

export function getResourceUrl(url: string) {
  return VITE_API_BASE_URL + url
}
