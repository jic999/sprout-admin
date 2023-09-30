import type { App, Directive } from 'vue'
import { hasPerm } from './auth'

interface CustomDirective {
  name: string
  directive: Directive
}

export const vPerm: CustomDirective = {
  name: 'perm',
  directive: {
    mounted(el, binding) {
      let needPerms = binding.value
      if (!needPerms)
        return
      if (!Array.isArray(needPerms))
        needPerms = [needPerms]
      const perms = useUserStore().userInfo!.perms
      if (hasPerm(needPerms, perms))
        return
      el.parentNode?.removeChild(el)
    },
  },
}

export function setupDirectives(app: App) {
  app.directive(vPerm.name, vPerm.directive)
}
