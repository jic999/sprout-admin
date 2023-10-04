import { isNil } from 'lodash-es'

const DEFAULT_PREFIX = 'SPROUT_ADMIN_'

class CustomStorage {
  constructor(
    private prefix: string,
    private storage: Storage,
  ) {}

  getKey(key: string) {
    return `${this.prefix}${key}`.toUpperCase()
  }

  /**
   * set storage
   * @param key 属性名
   * @param value 属性值
   * @param expire 过期时间（s）
   */
  set(key: string, value: unknown, expire?: number) {
    const stringData = JSON.stringify({
      value,
      time: Date.now(),
      expire: !isNil(expire)
        ? new Date().getTime() + expire * 1000
        : null,
    })
    this.storage.setItem(this.getKey(key), stringData)
  }

  get(key: string) {
    return this.getItem(key)?.value || null
  }

  getItem(key: string) {
    const val = this.storage.getItem(this.getKey(key))
    if (!val)
      return null
    try {
      const data = JSON.parse(val)
      const { value, time, expire } = data
      // 若未过期 返回存储值和存储时间
      if (isNil(expire) || expire > new Date().getTime())
        return { value, time }
      // 否则 移除记录
      this.remove(key)
      return null
    }
    catch (error) {
      this.remove(key)
      return null
    }
  }

  remove(key: string) {
    this.storage.removeItem(this.getKey(key))
  }

  clear() {
    this.storage.clear()
  }
}

function createStorage({ prefix = '', storage = sessionStorage }) {
  return new CustomStorage(prefix, storage)
}

export function createLocalStorage(option: { prefix: string }) {
  return createStorage({
    prefix: option.prefix || '',
    storage: localStorage,
  })
}

export function createSessionStorage(option: { prefix: string }) {
  return createStorage({
    prefix: option.prefix || '',
    storage: sessionStorage,
  })
}

export const lStorage = createLocalStorage({ prefix: DEFAULT_PREFIX })

export const sStorage = createSessionStorage({ prefix: DEFAULT_PREFIX })
