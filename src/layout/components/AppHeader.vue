<script setup lang="ts">
import type { CustomRouteMeta } from '@/types'
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
function getIcon(meta: CustomRouteMeta) {
  return renderIcon(meta.icon || '', { size: 16 })
}

const userOptions = [
  { label: '退出登录', key: 'logout' },
]
function handleSelect(key: string) {
  const handler = {
    async logout() {
      await userStore.logout()
      router.push('/login')
    },
  }
  handler[key as keyof typeof handler]()
}
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
            <component :is="getIcon(item.meta as unknown as CustomRouteMeta)" />
            {{ item.meta.title }}
          </n-breadcrumb-item>
        </n-breadcrumb>
      </div>
    </div>
    <!-- Right -->
    <div flex items-center gap-x-sm>
      <div flex items-center gap-x-xs>
        <div i-carbon:moon dark:i-carbon:sun icon-btn @click="toggleDark()" />
        <a href="https://github.com/jic999/sprout-admin" target="_blank" i-carbon:logo-github icon-btn />
        <div
          :class="isFullscreen ? `i-ant-design:fullscreen-exit-outlined` : 'i-ant-design:fullscreen-outlined'"
          icon-btn @click="toggleFullscreen"
        />
      </div>
      <n-dropdown
        trigger="hover"
        :options="userOptions"
        @select="handleSelect"
      >
        <div flex-center cursor-pointer gap-x-xs>
          <span>{{ userStore.userInfo?.username }}</span>
          <img v-if="userStore.userInfo?.avatar" :src="userStore.userInfo?.avatar" circle h-32 w-32>
          <div v-else i-carbon:user-avatar-filled-alt text="28px gray-500" />
        </div>
      </n-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
