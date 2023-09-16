import type { RouteRecordRaw } from 'vue-router'
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
        name: 'SystemMenu',
        path: 'menu',
        component: () => import('@/pages/system/SystemMenu.vue'),
        meta: {
          title: '菜单管理',
          icon: 'carbon:menu',
        },
      },
      {
        name: 'SystemLog',
        path: 'log',
        component: () => import('@/pages/system/SystemLog.vue'),
        meta: {
          title: '日志管理',
          icon: 'carbon:license-draft',
        },
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
