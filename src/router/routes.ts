import type { RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'

export const staticRoutes: RouteRecordRaw[] = [
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/pages/Login.vue'),
  },
  {
    name: 'Error404',
    path: '/404',
    component: () => import('@/pages/error/404.vue'),
    meta: { title: '404' },
  },
]

export const freeRoutes: RouteRecordRaw[] = [
  {
    name: 'Profile',
    path: '/profile',
    component: Layout,
    meta: {
      title: '个人中心',
      hidden: true,
      icon: 'carbon:user-avatar',
    },
    children: [
      {
        name: 'ProfileCenter',
        path: '',
        component: () => import('@/pages/Profile.vue'),
        meta: {
          title: '个人中心',
          icon: 'carbon:user-avatar',
        },
      },
    ],
  },
  {
    name: 'ExternalLink',
    path: '/external-link',
    meta: {
      title: '外部链接',
      icon: 'carbon:link',
    },
    children: [
      {
        name: 'Github',
        redirect: '',
        path: 'https://github.com/jic999/sprout-admin',
        meta: {
          title: '仓库地址',
          icon: 'carbon:logo-github',
        },
      },
      {
        name: 'Document',
        redirect: '',
        path: 'https://github.com/jic999/sprout-admin',
        meta: {
          title: '文档地址',
          icon: 'carbon:document',
        },
      },
      {
        name: 'MyBlog',
        redirect: '',
        path: 'https://jic999.netlify.app',
        meta: {
          title: '我的博客',
          icon: 'carbon:pen-fountain',
        },
      },
    ],
  },
]

export const errorRoutes: RouteRecordRaw[] = [
  {
    name: 'NotFound',
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
]

const routeModules = import.meta.glob(['/src/pages/**/routes.ts'], { eager: true })

export const dynamicRoutes = [
  ...Object.entries(routeModules).map(([_, module]) => (module as any).default as RouteRecordRaw),
  ...freeRoutes,
]
