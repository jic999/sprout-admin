import type { RouteRecordRaw } from 'vue-router'
import { pickBy } from 'lodash-es'
import Layout from '@/layout/index.vue'

export const staticRoutes: RouteRecordRaw[] = [
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/pages/Login.vue'),
  },
]
export const dynamicRoutes: RouteRecordRaw[] = [
  {
    name: 'Home',
    path: '/',
    redirect: 'workbench',
    component: Layout,
    meta: {
      title: '主页',
      icon: 'carbon:home',
    },
    children: [
      {
        name: 'Workbench',
        path: '/workbench',
        component: () => import('@/pages/home/Workbench.vue'),
        meta: {
          title: '工作台',
          icon: 'carbon:screen',
        },
      },
      {
        path: 'https://github.com/jic999/sprout-admin',
        redirect: '',
        meta: {
          title: '仓库地址',
          icon: 'carbon:logo-github',
        },
      },

    ],
  },
  {
    name: 'System',
    path: '/system',
    redirect: 'user',
    component: Layout,
    meta: {
      title: '系统管理',
      icon: 'carbon:settings',
    },
    children: [
      {
        name: 'SystemUser',
        path: 'user',
        component: () => import('@/pages/system/user/index.vue'),
        meta: {
          title: '用户管理',
          icon: 'carbon:user',

        },
      },
      {
        name: 'SystemRole',
        path: 'role',
        component: () => import('@/pages/system/role/index.vue'),
        meta: {
          title: '角色管理',
          icon: 'carbon:user-multiple',
        },
      },
      {
        name: 'SystemPerm',
        path: 'perm',
        component: () => import('@/pages/system/perm/index.vue'),
        meta: {
          title: '权限管理',
          icon: 'carbon:menu',
        },
      },
      {
        name: 'Log',
        path: 'log',
        meta: {
          title: '日志管理',
          icon: 'carbon:license-draft',
        },
        children: [
          {
            name: 'SystemLog',
            path: 'system',
            component: () => import('@/pages/system/log/sys-log/index.vue'),
            meta: {
              title: '系统日志',
              icon: 'carbon:license-draft',
            },
          },
          {
            name: 'LoginLog',
            path: 'login',
            component: () => import('@/pages/system/log/login-log/index.vue'),
            meta: {
              title: '登录日志',
              icon: 'carbon:license-draft',
            },
          },
        ],
      },
    ],
  },
  {
    name: 'Demo',
    path: '/demo',
    redirect: 'sp-crud-user',
    component: Layout,
    meta: {
      title: '演示',
      icon: 'carbon:code',
    },
    children: [
      {
        name: 'SpCrudUser',
        path: 'sp-crud-user',
        component: () => import('@/pages/demo/SpCrudUser.vue'),
        meta: {
          title: 'SpCrud',
          icon: 'carbon:table',
        },
      },
    ],
  },
]

export const subRoutes = [
  // ------ sub page
  {
    path: '/system/user/assign-role',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        name: 'AssignRole',
        path: ':userId(\\d+)',
        component: () => import('@/pages/system/user/AssignRole.vue'),
        meta: { title: '分配角色', activeMenu: 'SystemUser', noCache: true, noTag: true },
      },
    ],
  },
]

// 读取pages目录下的所有.vue文件，排除 components 目录
const pageModules = import.meta.glob('@/pages/**/*.vue', { eager: true })
const componentsModules = import.meta.glob('@/pages/**/components/**/*.vue')
const filterModules = pickBy(pageModules, (_, key) => !componentsModules[key])

export const routeComponents = [
  Layout,
  ...Object.keys(filterModules).map(key => (filterModules[key] as any).default),
].sort((a, b) => (a.name || a.__name)!.toLowerCase() <= (b.name || b.__name)!.toLowerCase() ? -1 : 1)
