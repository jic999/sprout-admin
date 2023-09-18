import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { dynamicRoutes, staticRoutes, subRoutes } from './routes'
import { setupRouteGuard } from './guards'
import { getToken, isExternalLink } from '@/utils'

export * from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...staticRoutes,
  ],
})

export async function addDynamicRoutes() {
  const token = getToken()
  if (!token)
    return console.error('no token')
  const userStore = useUserStore()
  // 若无用户信息 getUserInfo
  !userStore.userInfo && (await userStore.getUserInfo())
  // TODO 根据权限信息筛选路由
  if (userStore.userInfo) {
    addRoutes(dynamicRoutes)
    addRoutes(subRoutes)
  }
}
export function addRoutes(routes: RouteRecordRaw[]) {
  routes.forEach((route: RouteRecordRaw) => {
    !isExternalLink(route.path) && router.addRoute(route)
  })
}

export async function setupRouter(app: App) {
  await addDynamicRoutes()
  setupRouteGuard(router)
  app.use(router)
}

export default router
