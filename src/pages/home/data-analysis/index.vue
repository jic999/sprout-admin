<script setup lang="ts">
import DataDisplay from './components/DataDisplay.vue'
import DataAnalysis from './components/DataAnalysis.vue'

defineOptions({
  name: 'DataAnalysis',
})
</script>

<template>
  <div>
    <DataDisplay />
    <DataAnalysis />
  </div>
</template>
