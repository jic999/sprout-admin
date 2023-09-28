import type { Router } from 'vue-router'
import { getToken } from '@/utils'

const WHITE_LIST_PAGE = ['/login']

/* 鉴权 */
function authGuard(router: Router) {
  router.beforeEach((to, from) => {
    const token = getToken()
    if (token) {
      if (to.path === '/login')
        return { path: from.path }
      return true
    }
    if (WHITE_LIST_PAGE.includes(to.path))
      return true
    window.$notification.error({ content: '身份验证失败，请登录', duration: 2000 })
    return { path: '/login' }
  })
}

/* 切换title */
function changeTitleGuard(router: Router) {
  router.beforeEach((to) => {
    const title = to.meta?.title
    if (title)
      document.title = title as string
    else document.title = 'Sprout Admin Pro'
  })
}

/* loading bar */
function loadingBarGuard(router: Router) {
  router.beforeEach(() => {
    window.$loadingBar?.start()
  })

  router.afterEach(() => {
    setTimeout(() => {
      window.$loadingBar?.finish()
    }, 200)
  })

  router.onError(() => {
    window.$loadingBar?.error()
  })
}

export function setupRouteGuard(router: Router) {
  authGuard(router)
  changeTitleGuard(router)
  loadingBarGuard(router)
}
