import type { RouteRecordRaw } from 'vue-router'

export const staticRoutes: RouteRecordRaw[] = [
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/pages/Login.vue'),
  },
  {
    name: 'Error404',
    path: '/404',
    component: () => import('@/pages/error/404.vue'),
    meta: { title: '404' },
  },
]

export const errorRoutes: RouteRecordRaw[] = [
  {
    name: 'NotFound',
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
]

const routeModules = import.meta.glob(['/src/pages/**/routes.ts'], { eager: true })
export const dynamicRoutes = Object.entries(routeModules)
  .map(([_, module]) => (module as any).default as RouteRecordRaw)
