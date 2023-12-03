import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

export default {
  name: 'Demo',
  path: '/demo',
  redirect: 'functions',
  component: Layout,
  meta: {
    title: '演示',
    icon: 'carbon:code',
    order: 10,
  },
  children: [
    {
      name: 'Functions',
      path: 'functions',
      component: () => import('./Functions.vue'),
      meta: {
        title: '功能',
        icon: 'carbon:data-enrichment',
      },
    },
    {
      name: '404',
      path: '404',
      component: () => import('@/pages/error/404.vue'),
      meta: {
        title: '404页',
        icon: 'carbon:number-4',
      },
    },
    {
      name: 'CrudDemo',
      path: 'crud-demo',
      component: () => import('./table/CrudDemo.vue'),
      meta: {
        title: '表单示例',
        icon: 'carbon:table',
      },
    },
    {
      name: 'MultiMenu',
      path: 'multi-menu',
      meta: {
        title: '多级菜单',
        icon: 'carbon:menu',
      },
      children: [
        {
          name: 'MenuA',
          path: 'menu-a',
          component: () => import('./menus/MenuA.vue'),
          meta: {
            title: '菜单 A',
            icon: 'carbon:bookmark',
          },
        },
        {
          name: 'MenuB',
          path: 'menu-b',
          component: () => import('./menus/MenuB.vue'),
          meta: {
            title: '菜单 B',
            icon: 'carbon:bookmark',
          },
        },
      ],
    },
  ],
} as RouteRecordRaw
