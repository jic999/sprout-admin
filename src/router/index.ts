import type { App } from 'vue'
import type { RouteRecordNormalized } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { getDynamicRoutes, staticRoutes } from './routes'
import { setupRouteGuard } from './guards'
import type { CustomRoute } from '@/types'
import { getToken, hasRole } from '@/utils'

export * from './routes'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...staticRoutes],
})

export const dynamicRoutes: CustomRoute[] = []

export async function addDynamicRoutes() {
  const token = getToken()
  // 若无token
  if (!token)
    return console.log('no token')

  /**
   * 获取menus
   * 转为route树形结构
   * 添加路由
   */
  try {
    const userStore = useUserStore()
    const { data } = await menuApi.list()
    dynamicRoutes.splice(0, 0, ...getDynamicRoutes(data))
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
