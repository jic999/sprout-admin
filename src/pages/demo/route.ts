import Layout from '@/components/Layout/index.vue'
import type { CustomRoute } from '@/router/routes'

export const route: CustomRoute = {
  path: '/demo',
  component: Layout,
  redirect: '/demo/demo1',
  order: 2,
  meta: {
    title: '演示',
    icon: 'carbon:code',
  },
  children: [
    {
      path: 'demo1',
      name: 'Demo1',
      component: () => import('./demo1/index.vue'),
      meta: {
        title: 'Demo 1',
        icon: 'carbon:code',
      },
    }, {
      path: 'demo2',
      name: 'Demo2',
      component: () => import('./demo2/index.vue'),
      meta: {
        title: 'Demo 2',
        icon: 'carbon:code',
      },
    }, {
      path: 'demo3',
      name: 'Demo3',
      component: () => import('./demo3/index.vue'),
      meta: {
        title: 'Demo 3',
        icon: 'carbon:code',
      },
    },
  ],
}
