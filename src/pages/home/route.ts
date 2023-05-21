import Layout from '@/components/Layout/index.vue'
import type { CustomRoute } from '@/router/routes'

export const route: CustomRoute = {
  path: '/',
  component: Layout,
  redirect: 'workbench',
  order: 1,
  meta: {
    title: '主页',
    icon: 'carbon:home',
  },
  children: [
    {
      path: 'workbench',
      name: 'Workbench',
      component: () => import('./workbench/index.vue'),
      meta: {
        title: '工作台',
        icon: 'carbon:laptop',
      },
    },
    {
      path: 'analysis',
      name: 'Analysis',
      component: () => import('./data-analysis/index.vue'),
      meta: {
        title: '数据分析',
        icon: 'carbon:data-1',
      },
    },
  ],
}
