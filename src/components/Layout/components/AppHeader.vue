<script setup lang="ts">
import type { CustomRouteMeta } from '@/router/routes'
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
  <div flex items-center justify-between border-b px-12 h-54>
    <!-- Left -->
    <div flex items-center gap-x-12>
      <TheIcon
        class="icon-btn"
        :icon="appStore.collapsed ? 'ep:expand' : 'ep:fold'"
        :size="20"
        @click="appStore.toggleSidebar"
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
    <div flex items-center gap-16>
      <div flex items-center gap-x-12>
        <div i-carbon:moon dark:i-carbon:sun icon-btn @click="toggleDark()" />
        <a href="https://github.com/jic999/sprout-admin" target="_blank" i-carbon:logo-github icon-btn />
        <div
          :class="isFullscreen ? 'i-carbon:minimize' : 'i-carbon:maximize'"
          icon-btn
          @click="toggleFullscreen"
        />
      </div>
      <span>|</span>
      <n-dropdown
        trigger="hover"
        :options="userOptions"
        @select="handleSelect"
      >
        <div flex-center cursor-pointer gap-x-12>
          <span>{{ userStore.userInfo.username }}</span>
          <img :src="userStore.userInfo.avatar" circle h-32 w-32>
        </div>
      </n-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
