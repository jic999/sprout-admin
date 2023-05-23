import Layout from '@/components/Layout/index.vue'
import type { CustomRoute } from '@/router/routes'

export const route: CustomRoute = {
  path: '/system',
  component: Layout,
  order: 2,
  meta: {
    title: '系统管理',
    icon: 'carbon:settings',
  },
  children: [
    {
      path: 'sys-user',
      name: 'SystemUser',
      component: () => import('./user/index.vue'),
      meta: {
        title: '用户管理',
        icon: 'carbon:user',
        keepAlive: true,
      },
    }, {
      path: 'sys-role',
      name: 'SystemRole',
      component: () => import('./role/index.vue'),
      meta: {
        title: '角色管理',
        icon: 'carbon:user-role',
        keepAlive: true,
      },
    },
  ],
}
