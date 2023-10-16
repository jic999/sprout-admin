<script setup lang="ts">
import { todoList } from '@/utils'
</script>

<template>
  <div mt-12 flex gap-x-8px>
    <section shadow-section>
      <h3>特性</h3>
      <div leading-8>
        <ul px-lg>
          <li>⚡️ Vite 4 + Vue 3 + pnpm, - 速度飞快</li>
          <li>🎨 Unocss - 高性能且极具灵活性的即时原子化 CSS 引擎</li>
          <li>🍎 NaiveUI - Evan You 推荐的 Vue3 UI 组件库</li>
          <li>😃 Unocss + Icon组件封装，简单而优雅地引用海量图标</li>
          <li>🦾 TypeScript, 安全的类型检查，更加 STRONG 的代码</li>
          <li>⚙️ Eslint - 规范的代码风格，支持一键修复代码</li>
          <li>📦 unplugin 自动导入插件，组件&API 自动化加载</li>
          <li>🍒 Nestjs + TypeORM + MySQL 后端服务支持</li>
        </ul>
      </div>
    </section>
    <section flex flex-1 flex-col shadow-section p-6>
      <h3>TODO</h3>
      <div h-260px flex flex-col flex-wrap gap-8px overflow-auto>
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
