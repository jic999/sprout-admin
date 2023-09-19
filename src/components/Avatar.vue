<script setup lang="ts">
defineProps({
  url: {
    type: String,
    required: false,
  },
  size: {
    type: Number,
    default: 24,
  },
})
</script>

<template>
  <div inline-block overflow-hidden rounded-full>
    <img v-if="$props.url" :src="url" :style="{ width: `${$props.size}px`, height: `${$props.size}` }">
    <div i-ant-design:user-outlined :style="{ fontSize: `${$props.size}px` }" />
  </div>
</template>
