import type { RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { dynamicRoutes, errorRoutes, staticRoutes, subRoutes } from './routes'
import { setupRouteGuard } from './guards'
import { getToken, isExternalLink } from '@/utils'

export * from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...staticRoutes, ...errorRoutes],
})

// export const dynamicRoutes: RouteRecordRaw[] = []

export async function addDynamicRoutes() {
  const token = getToken()
  if (!token) {
    console.error('no token')
    return
  }
  const userStore = useUserStore()
  !userStore.userInfo && (await userStore.getUserInfo())
  if (userStore.userInfo) {
    // const { err, data } = await sysPermApi.routes()
    // if (err) {
    //   window.$message.error(err.message)
    //   return
    // }
    // fixRoutes(data)
    // dynamicRoutes.splice(0, dynamicRoutes.length, ...data)
    addRoutes(dynamicRoutes)
    // TODO 根据权限信息筛选子路由
    addRoutes(subRoutes)
  }
}

// 补全路由
// function fixRoutes(routes: RouteRecordRaw[]) {
//   routes.forEach(route => route.path = `/${route.path}`)
//   fix(routes)
//   function fix(routes: RouteRecordRaw[]) {
//     routes.forEach((route) => {
//       // 匹配路由组件
//       route.component = routeComponents.find(item => item.name === route.component || item.__name === route.component)
//       if (route.children) {
//         // 重定向到第一个子路由
//         route.redirect = route.children[0].path
//         fix(route.children)
//       }
//     })
//   }
// }

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
