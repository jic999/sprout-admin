<script setup lang="ts">
import { techStackList } from '@/utils'
</script>

<template>
  <div flex gap-x-8px>
    <!-- left -->
    <section shadow-section flex-center flex-col gap-y-sm>
      <div class="rotate-animation" border="2 primary!" rounded-full p-8>
        <div class="i-carbon:sprout" text="24 primary" />
      </div>
      <i text="lg primary">Sprout Admin Pro</i>
    </section>
    <!-- right -->
    <section shadow-section w-full self-stretch>
      <h3>主要技术栈</h3>
      <div grid grid-cols-4 gap-sm>
        <a
          v-for="item in techStackList"
          :key="item.name"
          :href="item.url"
          target="_blank"
          hover="border-primary"
          h-118px border rounded p-sm transition duration-300
        >
          <div flex items-center gap-x-xs>
            <img :src="item.img" h-28px w-28px>
            <span text-lg font-600>{{ item.name }}</span>
          </div>
          <div mt-xs leading-relaxed text="$sp-text-c-1" ellipsis-2>
            {{ item.desc }}
          </div>
        </a>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.rotate-animation {
  animation: rotate 12s linear infinite;
  &:hover {
    animation-play-state: paused;
  }
}
</style>
