import { h } from 'vue'
import { Icon } from '@iconify/vue'
import { NIcon } from 'naive-ui'
import UnoIcon from '@/components/icon/UnoIcon.vue'

export function renderIcon(icon: string, props = { size: 14 }) {
  return () => h(NIcon, props, { default: () => h(Icon, { icon }) })
}

export function renderUnoIcon(icon: string, props?: { size?: number; color?: string }) {
  return () => h(UnoIcon, { icon, ...props })
}
