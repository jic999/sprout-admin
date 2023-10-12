<script setup lang="ts">
import type { RouteRecordRaw } from 'vue-router'
import { isNumber } from 'lodash-es'
import { isExternalLink, renderIcon } from '@/utils'
import { dynamicRoutes } from '@/router'

const route = useRoute()
const router = useRouter()

const appStore = useAppStore()

function handleMenuChange(key: string, item: any) {
  if (isExternalLink(item.path))
    return window.open(item.path)
  router.push({ name: key })
}
const activeMenu = computed<any>(() => route.meta?.activeMenu || route.name)
const menuOptions = ref()

function getMenuOptions(routes: RouteRecordRaw[]) {
  return routes
    .filter(route => !route.meta?.hidden)
    .map((route: RouteRecordRaw) => getMenuItem(route))
    .filter((item: any) => !item.children || item.children.length)
    .sort((a, b) => a.order - b.order)
}
function getMenuItem(route: RouteRecordRaw) {
  const menuItem = {
    label: route.meta?.title || route.name,
    key: route.name || route.path,
    order: isNumber(route.meta?.order) ? route.meta!.order : 9999,
    icon: renderIcon(route.meta?.icon || 'carbon:bookmark', { size: 18 }),
    path: route.path,
  }
  // 无子路由 直接返回 有子路由 递归处理
  if (!route.children)
    return menuItem
  else
    (menuItem as any).children = getMenuOptions(route.children)
  return menuItem
}

onMounted(() => {
  menuOptions.value = getMenuOptions(dynamicRoutes)
})
</script>

<template>
  <RouterLink class="flex-center gap-x-xs py-xs italic text-primary" to="/workbench">
    <TheIcon icon="carbon:sprout" :size="24" />
    <span v-if="!appStore.sidebarCollapsed" whitespace-nowrap>Sprout Admin</span>
  </RouterLink>
  <n-menu
    v-if="menuOptions"
    :value="activeMenu"
    :options="menuOptions"
    :collapsed="appStore.sidebarCollapsed"
    :indent="12"
    @update:value="handleMenuChange"
  />
</template>
