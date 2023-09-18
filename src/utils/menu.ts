import type { MenuTreeNode, SystemPermission } from '@/types'

export function buildMenuTree(parentMenu: MenuTreeNode, perms: SystemPermission[]) {
  perms.filter(perm => perm.type !== 'B').forEach((perm) => {
    if (perm.parentId === parentMenu.id) {
      if (!parentMenu.children)
        parentMenu.children = []
      parentMenu.children.push(perm)
    }
  })
}

export function getMenuList(perms: SystemPermission[]) {
  const menuList: MenuTreeNode[] = []
  perms.filter(item => item.type !== 'B')
    .sort((a, b) => a.orderNum - b.orderNum)
    .filter(item => item.parentId === 0)
    .forEach((parentMenu) => {
      buildMenuTree(parentMenu, perms)
      menuList.push(parentMenu)
    })
  return menuList
}
