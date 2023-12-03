import type { Router } from 'vue-router'
import { getRefreshToken, getToken, refreshUserToken } from '@/utils'

const WHITE_LIST_PAGE = ['/login']

/* 鉴权 */
function authGuard(router: Router) {
  router.beforeEach(async (to, from) => {
    let token = getToken()
    const refreshToken = getRefreshToken()
    if (!token && refreshToken) {
      await refreshUserToken(refreshToken)
      token = getToken()
    }
    if (token) {
      if (to.path === '/login')
        return { path: from.path }
      return true
    }
    if (WHITE_LIST_PAGE.includes(to.path))
      return true
    if (token === null)
      $notification.error({ content: '身份验证过期，请重新登录', duration: 2000 })
    return { path: '/login' }
  })
}

/* 切换title */
function changeTitleGuard(router: Router) {
  router.beforeEach((to) => {
    const title = to.meta?.title
    if (title)
      document.title = title as string
    else document.title = 'Sprout Admin'
  })
}

/* loading bar */
function loadingBarGuard(router: Router) {
  router.beforeEach(() => {
    $loadingBar?.start()
  })

  router.afterEach(() => {
    setTimeout(() => {
      $loadingBar?.finish()
    }, 200)
  })

  router.onError(() => {
    $loadingBar?.error()
  })
}

export function setupRouteGuard(router: Router) {
  authGuard(router)
  changeTitleGuard(router)
  loadingBarGuard(router)
}
