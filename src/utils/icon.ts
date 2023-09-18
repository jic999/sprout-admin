import { Icon } from '@iconify/vue'
import { NIcon } from 'naive-ui'

export { Icon } from '@iconify/vue'
export { NIcon } from 'naive-ui'

export function renderIcon(icon: string, props: { size?: number; color?: string } = { size: 14, color: undefined }) {
  return () => h(NIcon, props, { default: () => h(Icon, { icon }) })
}
