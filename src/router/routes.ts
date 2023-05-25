import type { RouteRecordRaw } from 'vue-router'

export interface CustomRouteMeta {
  title: string
  icon?: string
  activeMenu?: string
  keepAlive?: boolean
}

interface ExtendedInfo {
  meta?: CustomRouteMeta
  children?: CustomRoute[]
  isHidden?: boolean // 不显示在菜单中
  isSingle?: boolean
  order?: number
  roles?: string[]
}

export declare type CustomRoute = RouteRecordRaw & ExtendedInfo

export const staticRoutes: CustomRoute[] = [
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/pages/login/index.vue'),
    isHidden: true,
    meta: {
      title: '登录',
    },
  },
]

const modules = import.meta.glob('@/pages/**/route.ts', { eager: true })
export const dynamicRoutes = Object.keys(modules).map(key =>
  ((modules[key] as any).route) as CustomRoute,
)
