export interface SystemPermission {
  id: number
  parentId: number
  permName: string
  type: 'C' | 'M' | 'B'
  permCode: string
  description: string
  icon: string
  path: string
  component: string
  orderNum: number
  hidden: number
  cache: number
  status: number
}

export interface MenuTreeNode extends SystemPermission {
  children?: MenuTreeNode[]
}
