import Layout from '@/components/layout/index.vue'
import type { CustomRoute } from '@/router/routes'

export const route: CustomRoute = {
  path: '/demo',
  component: Layout,
  redirect: '/demo/table',
  order: 3,
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
          path: 'ordinary-table',
          name: 'OrdinaryTable',
          component: () => import('./table/ordinary-table/index.vue'),
          meta: {
            title: '普通表格',
            icon: 'carbon:data-table',
            keepAlive: true,
          },
        }, {
          path: 'smart-table',
          name: 'SmartTable',
          component: () => import('./table/smart-table/index.vue'),
          meta: {
            title: '智能表格',
            icon: 'carbon:table-alias',
            keepAlive: true,
          },
        }, {
          path: 'smart-crud',
          name: 'SmartCrud',
          component: () => import('./table/smart-crud/index.vue'),
          meta: {
            title: '全自动的',
            icon: 'carbon:executable-program',
            keepAlive: true,
          },
        },
      ],
    },
    {
      path: 'md-editor',
      name: 'MdEditor',
      component: () => import('./md-editor/index.vue'),
      meta: {
        title: 'MD编辑器',
        icon: 'carbon:edit',
        keepAlive: true,
      },
    },
  ],
}
