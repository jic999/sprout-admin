<script setup lang="ts">
import GreetingBar from './components/GreetingBar.vue'
import TechStack from './components/TechStack.vue'
import TodoList from './components/TodoList.vue'

defineOptions({
  name: 'Workbench',
})
</script>

<template>
  <PageMain>
    <GreetingBar />
    <TechStack mt-8px />
    <TodoList mt-8px />
  </PageMain>
</template>
