<script setup lang="ts">
import GreetingBar from './components/GreetingBar.vue'
import TechStack from './components/TechStack.vue'
import TodoList from './components/TodoList.vue'
</script>

<template>
  <div>
    <h2>工作台</h2>
    <GreetingBar class="hover-out" />
    <TechStack />
    <TodoList />
  </div>
</template>
