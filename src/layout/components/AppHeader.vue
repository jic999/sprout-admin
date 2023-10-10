<script setup lang="ts">
import type { RouteMeta } from 'vue-router'
import { renderIcon } from '@/utils'

const route = useRoute()
const router = useRouter()

const appStore = useAppStore()
const userStore = useUserStore()

/* 面包屑 */
const breadCrumbList = computed(() =>
  route.matched.filter(item => !!item.meta?.title),
)
function handleBreadClick(path: string) {
  if (path === route.path)
    return
  router.push(path)
}
function getIcon(meta: RouteMeta) {
  return renderIcon(meta?.icon || 'carbon:bookmark', { size: 16 })
}

const userOptions = [
  { label: '个人中心', key: 'profile', cb: () => router.push('/profile') },
  { label: '退出登录', key: 'logout', cb: () => userStore.logout() },
]
</script>

<template>
  <div h-54px flex items-center justify-between border-b px-sm>
    <!-- Left -->
    <div flex items-center gap-x-xs>
      <TheIcon
        class="icon-btn"
        :icon="appStore.sidebarCollapsed ? 'ant-design:menu-unfold-outlined' : 'ant-design:menu-fold-outlined'"
        :size="20"
        @click="appStore.toggleSidebarCollapsed"
      />
      <div>
        <n-breadcrumb>
          <n-breadcrumb-item
            v-for="item in breadCrumbList"
            :key="item.path"
            @click="handleBreadClick(item.path)"
          >
            <component :is="getIcon(item.meta)" />
            {{ item.meta.title }}
          </n-breadcrumb-item>
        </n-breadcrumb>
      </div>
    </div>
    <!-- Right -->
    <div flex items-center gap-x-lg>
      <div flex items-center gap-x-xs>
        <a href="https://github.com/jic999/sprout-admin" target="_blank" i-carbon:logo-github icon-btn />
        <div :class="isFullscreen ? `i-ant-design:fullscreen-exit-outlined` : 'i-ant-design:fullscreen-outlined'" icon-btn @click="toggleFullscreen" />
        <div i-carbon:moon dark:i-carbon:sun icon-btn @click="e => toggleDark(e)" />
      </div>
      <n-dropdown
        trigger="hover"
        :options="userOptions"
        @select="(_, option) => (option as any).cb()"
      >
        <div flex-center cursor-pointer gap-x-xs>
          <span text-secondary>{{ userStore.userInfo?.nickname || userStore.userInfo?.username }}</span>
          <img v-if="userStore.userInfo?.avatar" :src="userStore.userInfo?.avatar" circle h-32 w-32>
          <div v-else i-carbon:user-avatar-filled-alt text="28px gray-500" />
        </div>
      </n-dropdown>
    </div>
  </div>
</template>
