<script setup lang="ts">
import type { CustomRoute } from '@/types'
import { dynamicRoutes } from '@/router'
import { hasRole, isExternalLink, renderIcon } from '@/utils'

const route = useRoute()
const router = useRouter()

const appStore = useAppStore()
const userStore = useUserStore()

const routes = dynamicRoutes

const menuOptions = computed(() => getMenuOptions(routes as CustomRoute[]))
function getMenuOptions(routes: CustomRoute[]) {
  return routes.filter(
    (route: CustomRoute) => (!route.roles || hasRole(route.roles, userStore.userInfo.roles)))
    .map((route: any) => getMenuItem(route))
    .sort((a, b) => a.order - b.order)
}
function getMenuItem(route: CustomRoute) {
  const menuItem = {
    label: route.meta?.title || route.name,
    key: route.name || route.path,
    order: route.order || 9999,
    icon: renderIcon(route.meta?.icon || 'carbon:bookmark', { size: 16 }),
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

function handleMenuChange(key: string, item: any) {
  if (isExternalLink(item.path))
    return window.open(item.path)
  router.push({ name: key })
}

const activeMenu = computed(() => route.meta.activeMenu || route.name)
</script>

<template>
  <RouterLink class="mt-8 flex-center gap-x-8 py-8 text-16 italic text-$primary-c" :to="{ path: '/' }">
    <TheIcon icon="carbon:sprout" :size="24" />
    <span v-if="!appStore.collapsed" whitespace-nowrap>Sprout Admin</span>
  </RouterLink>
  <n-menu
    :value="activeMenu"
    :options="menuOptions"
    :indent="12"
    @update:value="handleMenuChange"
  />
</template>
