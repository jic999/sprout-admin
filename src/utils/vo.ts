import type { MenuTreeNode, SystemPermission } from '@/types'

export function buildPermTree(parentMenu: MenuTreeNode, perms: SystemPermission[]) {
  perms.forEach((perm) => {
    if (perm.parentId === parentMenu.id) {
      buildPermTree(perm, perms)
      if (!parentMenu.children)
        parentMenu.children = []
      parentMenu.children.push(perm)
    }
  })
}

export function getPermTree(perms: SystemPermission[]) {
  const menuList: MenuTreeNode[] = []
  perms.filter(item => item.type !== 'B')
    .sort((a, b) => a.orderNum - b.orderNum)
    .filter(item => item.parentId === 0)
    .forEach((parentMenu) => {
      buildPermTree(parentMenu, perms)
      menuList.push(parentMenu)
    })
  return menuList
}
