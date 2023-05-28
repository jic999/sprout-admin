import Layout from '@/components/layout/index.vue'
import type { CustomRoute } from '@/router/routes'

export const route: CustomRoute = {
  path: '/system',
  component: Layout,
  redirect: '/system/sys-user',
  order: 2,
  roles: ['SUPER_ADMIN', 'SYSTEM_ADMIN'],
  meta: {
    title: '系统管理',
    icon: 'carbon:settings',
  },
  children: [
    {
      path: 'sys-user',
      name: 'SystemUser',
      component: () => import('./user/index.vue'),
      roles: ['SUPER_ADMIN'],
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
    }, {
      path: 'sys-menu',
      name: 'SystemMenu',
      component: () => import('./menu/index.vue'),
      meta: {
        title: '菜单管理',
        icon: 'carbon:menu',
        keepAlive: true,
      },
    },
  ] as CustomRoute[],
}
