export interface MenuItem {
  id: number
  createTime: string
  updateTime: string
  parentId: number
  name: string
  path: string
  component: string
  title: string
  perm: string
  redirect: string
  icon: string
  orderNum: number
  keepAlive: number
  status: number
  isSingle: number
  noTag: number
  activeMenu: string
}

export interface MenuTreeNode extends MenuItem {
  children?: MenuTreeNode[]
}
