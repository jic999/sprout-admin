<script setup lang="ts">
const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  size: {
    type: [Number, String],
    default: 14,
  },
  color: {
    type: String,
    default: undefined,
  },
})
defineOptions({
  name: 'UnoIcon',
})
function iconNode() {
  return h(
    'div',
    {
      class: `${props.icon}`,
      style: {
        fontSize: typeof props.size === 'number' ? `${props.size}px` : props.size,
        color: props.color,
      },
    },
  )
}
</script>

<template>
  <component :is="iconNode" />
</template>
