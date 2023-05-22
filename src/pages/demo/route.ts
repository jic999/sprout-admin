import Layout from '@/components/Layout/index.vue'
import type { CustomRoute } from '@/router/routes'

export const route: CustomRoute = {
  path: '/demo',
  component: Layout,
  redirect: '/demo/table',
  order: 2,
  meta: {
    title: '演示',
    icon: 'carbon:code',
  },
  children: [
    {
      path: 'table',
      name: 'CommonTable',
      redirect: '/demo/table/common-table',
      meta: {
        title: '表格',
        icon: 'carbon:data-table',
      },
      children: [
        {
          path: 'common-table',
          name: 'CommonTable',
          component: () => import('./demo1/index.vue'),
          meta: {
            title: '普通表格',
            icon: 'carbon:data-table',
            keepAlive: true,
          },
        },
        {
          path: 'smart-table',
          name: 'SmartTable',
          component: () => import('./demo2/index.vue'),
          meta: {
            title: '智能表格',
            icon: 'carbon:table-alias',
            keepAlive: true,
          },
        }, {
          path: 'smart-crud',
          name: 'SmartCrud',
          component: () => import('./demo3/index.vue'),
          meta: {
            title: '全自动的',
            icon: 'carbon:executable-program',
            keepAlive: true,
          },
        },
      ],
    },
  ],
}
