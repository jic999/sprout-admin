import type { Component } from 'vue'
import Layout from '@/components/layout/index.vue'
import type { CustomRoute, MenuItem } from '@/types'

export const staticRoutes: CustomRoute[] = [
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/pages/login/index.vue'),
    meta: {
      title: '登录',
    },
  },
]

// const modules = import.meta.glob('@/pages/**/route.ts', { eager: true })
// export const dynamicRoutes = Object.keys(modules)
//   .map(key => ((modules[key] as any).route) as CustomRoute,
//   )

const componentModules = import.meta.glob('@/pages/**/**/index.vue', { eager: true })
export const routeComponents = [
  Layout,
  ...Object.keys(componentModules).map(key => (componentModules[key] as any).default as Component),
]

type RouteTreeNode = CustomRoute & { id: number }

export function menuToRoute(menu: MenuItem) {
  return {
    id: menu.id,
    name: menu.name,
    path: menu.path,
    component: routeComponents.find(comp => comp.name === menu.component),
    redirect: menu.redirect,
    order: menu.orderNum,
    isSingle: menu.isSingle === 1,
    perms: menu.perm,
    meta: {
      title: menu.title,
      icon: menu.icon,
      activeMenu: menu.activeMenu,
      keepAlive: menu.keepAlive === 1,
      noTag: menu.noTag === 1,
    },
  } as RouteTreeNode
}
export function buildRouteTree(parentRoute: RouteTreeNode, data: MenuItem[]) {
  data.forEach((item) => {
    if (item.parentId === parentRoute.id) {
      const route = menuToRoute(item)
      buildRouteTree(route, data)
      if (!parentRoute.children)
        parentRoute.children = []
      parentRoute.children.push(route)
    }
  })
}
export function getDynamicRoutes(data: MenuItem[]) {
  data = data.filter(item => item.status === 0)
  const routes: RouteTreeNode[] = []
  data.sort((a, b) => a.orderNum - b.orderNum)
    .filter(item => item.parentId === 0)
    .map((parentMenu) => {
      return menuToRoute(parentMenu)
    })
    .forEach((parentRoute) => {
      buildRouteTree(parentRoute, data)
      routes.push(parentRoute)
    })
  return routes
}
