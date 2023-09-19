<script setup lang="ts">
import { todoList } from '@/utils'
</script>

<template>
  <div mt-12 flex gap-x-8px>
    <section shadow-section>
      <h3>介绍</h3>
      <div leading-relaxed>
        <p flex items-center gap-x-xs>
          <span i-carbon:logo-github text-24px />
          这是一个开源的后台管理模板。
        </p>
        <p flex items-center gap-x-xs text-blue-500>
          <span i-carbon:cube text-24px />
          使用了Vue3、Vite4、TypeScript、Unocss等最新前端技术栈。
        </p>
        <p flex items-center gap-x-xs text-primary>
          <span i-carbon:sprout text-24px />
          正如它的名字一样，该项目还处于萌芽阶段。
        </p>
        <p flex items-center gap-x-xs text-yellow-500>
          <span i-carbon:face-cool text-24px />
          但我会不断完善它~
        </p>
      </div>
    </section>
    <section shadow-section flex flex-1 flex-col p-6>
      <h3>TODO</h3>
      <div h-180px flex flex-col flex-wrap gap-8px overflow-auto>
        <li
          v-for="(item, i) in todoList"
          :key="i"
          :class="{ 'line-through text-gray-500 dark:text-gray-400': item.completed }"
          min-w-320px
        >
          {{ item.content }}
        </li>
      </div>
    </section>
  </div>
</template>
