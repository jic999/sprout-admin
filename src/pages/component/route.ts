import Layout from '@/components/Layout/index.vue'
import type { CustomRoute } from '@/router/routes'

export const route: CustomRoute = {
  path: '/component',
  component: Layout,
  redirect: 'upload',
  order: 5,
  meta: {
    title: '组件展示',
    icon: 'carbon:grid',
  },
  children: [
    {
      path: 'upload',
      name: 'Upload',
      component: () => import('./upload/index.vue'),
      meta: {
        title: '文件上传',
        icon: 'carbon:upload',
      },
    },
  ],
}
