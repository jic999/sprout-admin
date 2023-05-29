import type { Component } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/components/layout/index.vue'

export interface CustomRouteMeta {
  title: string
  icon?: string
  activeMenu?: string
  keepAlive?: boolean
  noTag?: boolean
}

interface ExtendedInfo {
  meta?: CustomRouteMeta
  children?: CustomRoute[]
  isSingle?: boolean // 有子路由但无需展示时使用
  order?: number
  roles?: string[]
  perms?: string
}

export declare type CustomRoute = RouteRecordRaw & ExtendedInfo

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

const modules = import.meta.glob('@/pages/**/route.ts', { eager: true })
export const dynamicRoutes = Object.keys(modules)
  .map(key => ((modules[key] as any).route) as CustomRoute,
  )

const componentModules = import.meta.glob('@/pages/**/**/index.vue', { eager: true })
export const routeComponents = [
  Layout,
  ...Object.keys(componentModules).map(key => (componentModules[key] as any).default as Component),
]
