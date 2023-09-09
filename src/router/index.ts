import { createRouter, createWebHistory } from 'vue-router'
import type { App } from 'vue'
import { dynamicRoutes, staticRoutes } from './routes'
import { setupRouteGuard } from './grards'
import type { CustomRoute } from '@/types'
import { getToken, isExternalLink } from '@/utils'

export { dynamicRoutes, staticRoutes }

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...staticRoutes,
  ] as CustomRoute[],
})

export async function addDynamicRoutes() {
  const token = getToken()
  if (!token)
    return console.error('no token')
  const userStore = useUserStore()
  // 若无用户信息 getUserInfo
  !userStore.userInfo && (await userStore.getUserInfo())
  // TODO 根据权限信息筛选路由
  if (userStore.userInfo)
    addRoutes(dynamicRoutes)
}
export function addRoutes(routes: CustomRoute[]) {
  routes.forEach((route: CustomRoute) => {
    !isExternalLink(route.path) && router.addRoute(route)
  })
}

export async function setupRouter(app: App) {
  await addDynamicRoutes()
  setupRouteGuard(router)
  app.use(router)
}

export default router
