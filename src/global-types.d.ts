import type { DialogProviderInst, LoadingBarProviderInst, MessageProviderInst, NotificationProviderInst } from 'naive-ui'
import 'vue-router'

export {}

declare module 'vue' {
  interface HTMLAttributes {
    [key: string]: unknown
  }
}

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    icon?: string
    order?: number
    activeMenu?: string
    noCache?: boolean
    noTag?: boolean
    hidden?: boolean
    perms?: string[]
  }
}

declare global {
  interface Window {
    $loadingBar: LoadingBarProviderInst
    $dialog: DialogProviderInst
    $message: MessageProviderInst
    $notification: NotificationProviderInst
  }
}
