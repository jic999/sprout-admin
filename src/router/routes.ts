import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

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
        component: () => import('@/pages/home/workbench/index.vue'),
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
          perms: ['sys:user:read'],
        },
      },
      {
        name: 'SystemRole',
        path: 'role',
        component: () => import('@/pages/system/role/index.vue'),
        meta: {
          title: '角色管理',
          icon: 'carbon:user-multiple',
          perms: ['sys:role:read'],
        },
      },
      {
        name: 'SystemPerm',
        path: 'perm',
        component: () => import('@/pages/system/perm/index.vue'),
        meta: {
          title: '权限管理',
          icon: 'carbon:menu',
          perms: ['sys:perm:read'],
        },
      },
      // {
      //   name: 'Log',
      //   path: 'log',
      //   meta: {
      //     title: '日志管理',
      //     icon: 'carbon:license-draft',
      //     hidden: true,
      //   },
      //   children: [
      //     {
      //       name: 'SystemLog',
      //       path: 'system',
      //       component: () => import('@/pages/system/log/sys-log/index.vue'),
      //       meta: {
      //         title: '系统日志',
      //         icon: 'carbon:license-draft',
      //       },
      //     },
      //     {
      //       name: 'LoginLog',
      //       path: 'login',
      //       component: () => import('@/pages/system/log/login-log/index.vue'),
      //       meta: {
      //         title: '登录日志',
      //         icon: 'carbon:license-draft',
      //       },
      //     },
      //   ],
      // },
    ],
  },
  // {
  //   name: 'Monitor',
  //   path: '/monitor',
  //   component: Layout,
  //   meta: {
  //     title: '系统监控',
  //     icon: 'carbon:analytics',
  //     hidden: true,
  //   },
  //   children: [
  //     {
  //       name: 'DataMonitor',
  //       path: 'data',
  //       component: () => import('@/pages/monitor/data/index.vue'),
  //       meta: {
  //         title: '数据监控',
  //         icon: 'carbon:analytics',
  //       },
  //     },
  //     {
  //       name: 'ServerMonitor',
  //       path: 'server',
  //       component: () => import('@/pages/monitor/server/index.vue'),
  //       meta: {
  //         title: '服务监控',
  //         icon: 'carbon:analytics',
  //       },
  //     },
  //   ],
  // },
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
        name: 'Functions',
        path: 'functions',
        component: () => import('@/pages/demo/Functions.vue'),
        meta: {
          title: '功能',
          icon: 'carbon:data-enrichment',
        },
      },
    ],
  },
]

export const subRoutes: RouteRecordRaw[] = [
  // ------ sub page
  {
    path: '/system/user/assign-role',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        name: 'AssignRole',
        //
        path: ':userId(\\d+)',
        component: () => import('@/pages/system/user/AssignRole.vue'),
        meta: {
          title: '分配角色',
          perms: ['sys:user:assignRoles'],
          activeMenu: 'SystemUser',
          noCache: true,
          noTag: true,
        },
      },
    ],
  },
]

export const errorRoutes: RouteRecordRaw[] = [
  {
    name: 'NotFound',
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
]
