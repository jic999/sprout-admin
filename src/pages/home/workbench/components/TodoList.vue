<script setup lang="ts">
import { todoList } from '@/utils'
</script>

<template>
  <div mt-12 flex gap-12>
    <div class="hover-out" br-8 bg="$el-bg-c" p-24>
      <h3>介绍</h3>
      <div text="16" lh-175p>
        <p flex items-center gap-x-12>
          <span i-carbon:logo-github text-24 />
          这是一个开源的后台管理模板。
        </p>
        <p flex items-center gap-12>
          <span i-carbon:cube text="24 blue-500" />
          使用了Vue3、Vite4、TypeScript、Unocss等最新前端技术栈。
        </p>
        <p flex items-center gap-12>
          <span i-carbon:sprout text="24 $primary-c" />
          正如它的名字一样，该项目还处于萌芽阶段。
        </p>
        <p flex items-center gap-12>
          <span i-carbon:face-cool text="24 orange-400" />
          但我会不断完善它~
        </p>
      </div>
    </div>
    <div class="hover-out" flex flex-1 flex-col br-8 bg="$el-bg-c" p-24>
      <h3>TODO</h3>
      <div flex flex-col flex-wrap gap-8 h-180 overflow-auto>
        <li
          v-for="(item, i) in todoList"
          :key="i"
          :class="{ 'line-through text-gray-500 dark:text-gray-400': item.completed }"
          text-16 min-w-320
        >
          {{ item.content }}
        </li>
      </div>
    </div>
  </div>
</template>
