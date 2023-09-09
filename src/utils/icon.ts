import { Icon } from '@iconify/vue'
import { NIcon } from 'naive-ui'

export { Icon } from '@iconify/vue'
export { NIcon } from 'naive-ui'

export function renderIcon(icon: string, props = { size: 14 }) {
  return () => h(NIcon, props, { default: () => h(Icon, { icon }) })
}
