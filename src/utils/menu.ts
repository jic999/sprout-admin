import type { MenuItem, MenuTreeNode } from '@/types'

export function buildMenuTree(parentMenu: MenuTreeNode, data: MenuItem[]) {
  data.forEach((item) => {
    if (item.parentId === parentMenu.id) {
      buildMenuTree(item, data)
      if (!parentMenu.children)
        parentMenu.children = []
      parentMenu.children.push(item)
    }
  })
}
export function getMenuList(data: MenuItem[]) {
  const result: MenuTreeNode[] = []
  data.sort((a, b) => a.orderNum - b.orderNum)
    .filter(item => item.parentId === 0)
    .forEach((parentMenu) => {
      buildMenuTree(parentMenu, data)
      result.push(parentMenu)
    })
  return result
}
function findPerm(menu: MenuItem, data: MenuItem[]): boolean {
  // 若有perm 直接返回
  return !!menu.perm || (() => {
    // 否则 查询其子菜单是否拥有perm
    const children = data.filter(child => child.parentId === menu.id)
    if (children.length === 0)
      return false
    return children.some(item => findPerm(item, data))
    // if(children.some(item => !!item.perm))
    //   return true
    // else
    //   return children.some(item => findPerm(item, data))
  })()
}
export function filterPermMenus(data: MenuItem[]) {
  return data.filter(menu => findPerm(menu, data))
}

export function isExternalLink(url: string) {
  const pattern = /^(https?:\/\/)/i
  return pattern.test(url)
}
