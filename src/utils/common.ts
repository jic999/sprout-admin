export function isExternalLink(url: string) {
  const pattern = /^(https?:\/\/)/i
  return pattern.test(url)
}
