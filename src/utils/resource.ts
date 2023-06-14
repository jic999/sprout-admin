import { ENV } from '@/utils'

export function getResourceUrl(url: string) {
  return ENV.VITE_API_BASE_URL.replace(/^https?:/, '') + url
}
