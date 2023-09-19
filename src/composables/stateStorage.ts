import { createSessionStorage } from '@/utils'

const PREFIX = 'State_Storage_'
const stateStorage = createSessionStorage({ prefix: PREFIX })

class StateStorage<T = any> {
  constructor(
    private key: string,
    private defaultValue?: T,
  ) {}

  set(val: T) {
    stateStorage.set(this.key, val)
  }

  get() {
    return stateStorage.get(this.key)
  }

  restore() {
    if (this.defaultValue !== undefined)
      stateStorage.set(this.key, this.defaultValue)
  }

  clear() {
    stateStorage.remove(this.key)
  }
}

export const refreshSS = new StateStorage('refresh', false)
