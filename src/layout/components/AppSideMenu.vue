<script setup lang="ts">
import type { CustomRoute } from '@/types'
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

function getMenuOptions(routes: CustomRoute[]) {
  return routes.map((route: any) => getMenuItem(route))
    .sort((a, b) => a.order - b.order)
}
function getMenuItem(route: CustomRoute) {
  const menuItem = {
    label: route.meta?.title || route.name,
    key: route.name || route.path,
    order: route.order || 9999,
    icon: renderIcon(route.meta?.icon || 'carbon:bookmark', { size: 18 }),
    path: route.path,
  }
  // 无子路由 直接返回
  if (!route.children)
    return menuItem
    // 有子路由 判断isSingle
    // - isSingle 则所有子路由都不显示在menu中
    //   - 判断组件 不为 Layout 返回本身信息
    //   - 若为Layout返回首个子路由的信息
  if (route.isSingle) {
    if (route.component?.name !== 'Layout')
      return menuItem
    const theRoute = route.children[0]
    return {
      ...menuItem,
      key: theRoute.name,
      label: theRoute.meta?.title || theRoute.name,
      icon: renderIcon(theRoute.meta?.icon || 'carbon:bookmark', { size: 16 }),
    }
  }
  // - !isSingle 筛选路由 继续获取
  // - 否则 继续获取子菜单
  (menuItem as any).children = getMenuOptions(route.children)
  return menuItem
}

onMounted(() => {
  menuOptions.value = getMenuOptions(dynamicRoutes)
})
</script>

<template>
  <RouterLink class="flex-center gap-x-xs py-xs italic text-primary" :to="{ path: '/' }">
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

<style lang="scss" scoped>

</style>
