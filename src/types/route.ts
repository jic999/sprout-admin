import type { RouteRecordRaw } from 'vue-router'

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
  perm?: string
}

export declare type CustomRoute = RouteRecordRaw & ExtendedInfo
