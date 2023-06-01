import type { App } from 'vue'
import type { RouteRecordNormalized } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { NOT_FOUND_ROUTE, getDynamicRoutes, staticRoutes } from './routes'
import { setupRouteGuard } from './guards'
import type { CustomRoute } from '@/types'
import { getToken, isExternalLink } from '@/utils'

export * from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...staticRoutes, NOT_FOUND_ROUTE],
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
  const userStore = useUserStore()
  // 若无用户信息 getUserInfo
  !userStore.userInfo.id && (await userStore.getUserInfo())

  const { err, data } = await menuApi.list()
  if (err) {
    console.error(err.message)
    return
  }
  dynamicRoutes.splice(0, dynamicRoutes.length, ...getDynamicRoutes(data))
  addRoutes(dynamicRoutes)
}

export function addRoutes(routes: CustomRoute[]) {
  routes.forEach((route: CustomRoute) => {
    !isExternalLink(route.path) && router.addRoute(route)
  })
}

export function resetRouter() {
  const staticRouteNames = staticRoutes.map(item => item.name)
  router.getRoutes().forEach((route: RouteRecordNormalized) => {
    const name = route.name
    if (!staticRouteNames.includes(name))
      name && router.removeRoute(name)
  })
}

export function refreshRouter(routes: CustomRoute[]) {
  resetRouter()
  addRoutes(routes)
  console.log('refreshRouter')
}

export async function setupRouter(app: App) {
  await addDynamicRoutes()
  setupRouteGuard(router)
  app.use(router)
}

export default router
