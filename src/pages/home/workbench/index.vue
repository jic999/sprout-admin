<script setup lang="ts">
import GreetingBar from './components/GreetingBar.vue'
import TechStack from './components/TechStack.vue'
import TodoList from './components/TodoList.vue'

defineOptions({
  name: 'Workbench',
})
</script>

<template>
  <div>
    <GreetingBar class="hover-out" />
    <TechStack />
    <TodoList />
  </div>
</template>
