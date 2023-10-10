import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

export default {
  name: 'Home',
  path: '/',
  redirect: 'workbench',
  component: Layout,
  meta: {
    title: '主页',
    icon: 'carbon:home',
    order: 1,
  },
  children: [
    {
      name: 'Workbench',
      path: '/workbench',
      component: () => import('./workbench/index.vue'),
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
} as RouteRecordRaw
