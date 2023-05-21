<script setup lang="ts">
import type { CustomRoute } from '@/router/routes'
import { dynamicRoutes, staticRoutes } from '@/router/routes'
import { renderIcon } from '@/utils'

const route = useRoute()
const router = useRouter()

const appStore = useAppStore()

const routes = staticRoutes.concat(dynamicRoutes)

const menuOptions = computed(() => getMenuOptions(routes as CustomRoute[]))

function getMenuOptions(routes: CustomRoute[]) {
  return routes.filter((route: any) => !route.isHidden)
    .map((route: any) => getMenuItem(route))
    .sort((a, b) => a.order - b.order)
}
function getMenuItem(route: CustomRoute) {
  const menuItem = {
    label: route.meta?.title || route.name,
    // ! dangerous
    key: route.name || route.path,
    order: route.order || 9999,
    icon: renderIcon(route.meta?.icon || 'carbon:bookmark', { size: 16 }),
  }
  // 无子路由 直接返回
  if (!route.children)
    return menuItem
  // 有子路由 判断isSingle
  // - isSingle 则所有子路由都不显示在menu中
  //   返回首个子路由的信息
  if (route.isSingle) {
    const theRoute = route.children[0]
    return {
      ...menuItem,
      key: theRoute.name,
      label: theRoute.meta?.title || theRoute.name,
      icon: renderIcon(theRoute.meta?.icon || 'carbon:bookmark', { size: 16 }),
    }
  }
  // - !isSingle 筛选路由 继续获取
  (menuItem as any).children = getMenuOptions(route.children)
  return menuItem
}

function handleMenuChange(key: string) {
  router.push({ name: key })
}

const activeMenu = computed(() => route.name)
</script>

<template>
  <RouterLink class="mt-8 flex-center gap-x-8 py-8 text-16 italic text-$primary-c" :to="{ name: 'Workbench' }">
    <TheIcon icon="carbon:sprout" :size="24" />
    <span v-if="!appStore.collapsed" whitespace-nowrap> Sprout Admin</span>
  </RouterLink>
  <n-menu
    :value="activeMenu"
    :options="menuOptions"
    :indent="12"
    @update:value="handleMenuChange"
  />
</template>
