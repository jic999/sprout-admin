export interface SystemPermission {
  id: number
  parentId: number
  name: string
  code: string
  desc: string
  // type: 'C' | 'M' | 'B'
  // icon: string
  // path: string
  // component: string
  // orderNum: number
  // hidden: number
  // cache: number
  // status: number
}

export interface MenuTreeNode extends SystemPermission {
  children?: MenuTreeNode[]
}
