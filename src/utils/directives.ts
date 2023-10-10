import type { App, Directive } from 'vue'
import { hasPerm } from './auth'

const directives: Record<string, Directive> = {
  perm: {
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
  debounce: {
    mounted(el, binding) {
      if (!Array.isArray(binding.value))
        binding.value = [binding.value, 600]
      let timer: any
      el.addEventListener('click', () => {
        if (timer)
          clearTimeout(timer)
        timer = setTimeout(() => {
          binding.value[0]()
        }, binding.value[1])
      })
    },
  },
  throttle: {
    mounted(el, binding) {
      if (!Array.isArray(binding.value))
        binding.value = [binding.value, 600]
      let timer: any
      el.addEventListener('click', () => {
        if (timer)
          return
        binding.value[0]()
        timer = setTimeout(() => {
          timer = null
        }, binding.value[1])
      })
    },
  },
}

export function setupDirectives(app: App) {
  Object.keys(directives).forEach((key) => {
    app.directive(key, directives[key])
  })
}
