import type { MenuTreeNode, SystemPermission } from '@/types'

// 一般在后端完成 如果前后端分离人不分离的话就...
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
  perms.filter(item => item.parentId === 0)
    .forEach((parentMenu) => {
      buildPermTree(parentMenu, perms)
      menuList.push(parentMenu)
    })
  return menuList
}
