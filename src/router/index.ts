import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { dynamicRoutes, errorRoutes, staticRoutes } from './routes'
import { setupRouteGuard } from './guards'
import { getRefreshToken, getToken, hasPerm, isExternalLink, refreshUserToken } from '@/utils'

export * from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...staticRoutes, ...errorRoutes],
})

export async function addDynamicRoutes() {
  const token = getToken()
  const refreshToken = getRefreshToken()
  if (!token && !refreshToken) {
    console.error('no token')
    return
  }
  else if (!token && refreshToken) {
    await refreshUserToken(refreshToken)
  }
  const userStore = useUserStore()
  !userStore.userInfo && (await userStore.getUserInfo())
  if (userStore.userInfo) {
    const availableRoutes = getAvailableRoutes(
      dynamicRoutes,
      userStore.userInfo.perms,
    )
    addRoutes(availableRoutes)
  }
}

export function getAvailableRoutes(routes: RouteRecordRaw[], perms: string[]) {
  return routes.filter((route: RouteRecordRaw) => {
    if (route.children)
      route.children = getAvailableRoutes(route.children, perms)

    return !route.meta?.perms?.length || hasPerm(route.meta.perms, perms)
  })
}

export function addRoutes(routes: RouteRecordRaw[]) {
  routes.forEach((route: RouteRecordRaw) => {
    !isExternalLink(route.path) && router.addRoute(route)
  })
}

export async function setupRouter(app: App) {
  setupRouteGuard(router)
  await addDynamicRoutes()
  app.use(router)
}

export default router
