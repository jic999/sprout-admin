<script setup>
import { renderIcon } from '@/utils'

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    default: 14,
  },
  color: {
    type: String,
    default: undefined,
  },
})

const iconCom = computed(() => renderIcon(props.icon, { size: props.size, color: props.color }))
</script>

<template>
  <component :is="iconCom" />
</template>
