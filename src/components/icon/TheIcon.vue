<script setup lang="ts">
import { renderIcon } from '@/utils'

export interface TheIconProps {
  icon: string
  size?: number
  color?: string
}

const props = withDefaults(defineProps<TheIconProps>(), {
  size: 16,
})
const iconCom = computed(() => renderIcon(props.icon, { size: props.size, color: props.color }))
</script>

<template>
  <component :is="iconCom" />
</template>
