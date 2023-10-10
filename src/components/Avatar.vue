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
  <img v-if="$props.url" :src="url" :style="{ width: `${$props.size}px`, height: `${$props.size}` }" rounded-full>
  <div v-else i-carbon:user-avatar :style="{ fontSize: `${$props.size! * 0.8}px` }" text-hex-888 />
</template>
