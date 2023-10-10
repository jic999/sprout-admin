import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

export default {
  name: 'System',
  path: '/system',
  redirect: 'user',
  component: Layout,
  meta: {
    title: '系统管理',
    icon: 'carbon:settings',
    order: 5,
  },
  children: [
    {
      name: 'SystemUser',
      path: 'user',
      component: () => import('./user/index.vue'),
      meta: {
        title: '用户管理',
        icon: 'carbon:user',
        perms: ['sys:user:read'],
      },
    },
    {
      name: 'AssignRole',
      path: 'user/assign-role/:userId(\\d+)',
      component: () => import('./user/AssignRole.vue'),
      meta: {
        title: '分配角色',
        perms: ['sys:user:assignRoles'],
        activeMenu: 'SystemUser',
        noCache: true,
        noTag: true,
        hidden: true,
      },
    },
    {
      name: 'SystemRole',
      path: 'role',
      component: () => import('./role/index.vue'),
      meta: {
        title: '角色管理',
        icon: 'carbon:user-multiple',
        perms: ['sys:role:read'],
      },
    },
    {
      name: 'SystemPerm',
      path: 'perm',
      component: () => import('./perm/index.vue'),
      meta: {
        title: '权限管理',
        icon: 'carbon:menu',
        perms: ['sys:perm:read'],
      },
    },
  ],
} as RouteRecordRaw
