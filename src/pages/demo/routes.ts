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
      name: 'MultiMenu',
      path: 'multi-menu',
      meta: {
        title: '多级菜单',
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
