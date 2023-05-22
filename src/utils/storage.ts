import _ from 'lodash'

const PREFIX_KEY = 'Sprout_ADMIN_'

class CustomStorage {
  constructor(
    private PREFIX_KEY: string,
    private storage: Storage,
  ) {}

  getKey(key: string) {
    return `${this.PREFIX_KEY}${key}`.toUpperCase()
  }

  set(key: string, value: unknown, expire?: number) {
    const stringData = JSON.stringify({
      value,
      time: Date.now(),
      expire: !_.isNil(expire)
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
      if (_.isNil(expire) || expire > new Date().getTime())
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

function createStorage({ PREFIX_KEY = '', storage = sessionStorage }) {
  return new CustomStorage(PREFIX_KEY, storage)
}

export const createLocalStorage = function (option: { PREFIX_KEY: string }) {
  return createStorage({
    PREFIX_KEY: option.PREFIX_KEY || '',
    storage: localStorage,
  })
}

export const createSessionStorage = function (option: { PREFIX_KEY: string }) {
  return createStorage({
    PREFIX_KEY: option.PREFIX_KEY || '',
    storage: sessionStorage,
  })
}

export const lStorage = createLocalStorage({ PREFIX_KEY })

export const sStorage = createSessionStorage({ PREFIX_KEY })
