import { getDynamicRoutes } from '@/router'
import type { CustomRoute } from '@/types'
import { hasRole, renderIcon } from '@/utils'

export const useMenuStore = defineStore('menu', () => {
  const menuOptions = ref()

  async function refreshMenuOptions() {
    const { data } = await menuApi.list()
    const dynamicRoutes = getDynamicRoutes(data)
    menuOptions.value = getMenuOptions(dynamicRoutes)
  }
  function getMenuOptions(routes: CustomRoute[]) {
    const userStore = useUserStore()
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
  return {
    menuOptions,
    refreshMenuOptions,
  }
})
