import type { App } from 'vue'
import type { RouteRecordNormalized } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import type { CustomRoute } from './routes'
import { dynamicRoutes, staticRoutes } from './routes'
import { setupRouteGuard } from './guards'
import { getToken, hasRole } from '@/utils'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...staticRoutes],
})

export async function addDynamicRoutes() {
  console.log('addDynamicRouter')
  const token = getToken()
  // 若无token
  if (!token)
    return console.log('no token')

  // 有 token
  try {
    const userStore = useUserStore()

    // 若无用户信息 getUserInfo
    !userStore.userInfo.id && (await userStore.getUserInfo())
    // TODO 根据 permission添加路由
    dynamicRoutes.forEach((route: CustomRoute) => {
      if (
        !route.roles
        || hasRole(route.roles, userStore.userInfo.roles)
      )
        router.addRoute(route)
    })
  }
  catch (error) {
    console.error('error :>> ', error)
  }
}

export function resetRouter() {
  const staticRouteNames = staticRoutes.map(item => item.name)
  router.getRoutes().forEach((route: RouteRecordNormalized) => {
    const name = route.name
    if (!staticRouteNames.includes(name))
      name && router.removeRoute(name)
  })
}
export async function setupRouter(app: App) {
  await addDynamicRoutes()
  setupRouteGuard(router)
  app.use(router)
}

export default router
