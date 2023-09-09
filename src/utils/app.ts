import { sStorage } from './storage'

const TAB_BAR_DATA_KEY = 'tab_bar_data'

export function setTabBarData(data: any) {
  sStorage.set(TAB_BAR_DATA_KEY, data)
}
export function getTabBarData() {
  return sStorage.get(TAB_BAR_DATA_KEY)
}
export function removeTabBarData() {
  sStorage.remove(TAB_BAR_DATA_KEY)
}
