<script setup lang="ts">
import type { IconButtonProps } from '@/types'
import { renderIcon } from '@/utils'

defineProps<IconButtonProps>()
</script>

<template>
  <n-button :render-icon="renderIcon($props.icon, { size: $props.iconSize || 14 })" v-bind="$props">
    <slot />
  </n-button>
</template>
