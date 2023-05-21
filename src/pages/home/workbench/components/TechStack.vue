<script setup lang="ts">
import { techStackList } from '@/utils'
</script>

<template>
  <div mt-12 flex gap-12>
    <!-- left -->
    <div
      class="hover-out"
      flex-center flex-col gap-y-24 br-8 bg="$el-bg-c" p-48
    >
      <div class="rotate-animation" circle p-24 border="1 $primary-c!">
        <div class="i-carbon:sprout" text="96 $primary-c" />
      </div>
      <i text="24 $primary-c">Sprout Admin</i>
    </div>
    <!-- right -->
    <div class="hover-out" w-full self-stretch br-8 bg="$el-bg-c" p-24>
      <h3>主要技术栈</h3>
      <div grid grid-cols-4 gap-12>
        <a
          v-for="item in techStackList"
          :key="item.name"
          :href="item.url"
          target="_blank"
          hover="border-$primary-c"
          border transition duration-300 br-4 h-118 p-16
        >
          <div flex items-center gap-x-12>
            <img :src="item.img" h-28 w-28>
            <span text-20 font-600>{{ item.name }}</span>
          </div>
          <div mt-12 lh-160p>
            {{ item.desc }}
          </div>
        </a>
      </div>
    </div>
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
