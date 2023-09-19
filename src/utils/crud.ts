// 解除所有权限的禁用
export function resetTreeDisabled(permTree: any[]) {
  permTree.forEach((item) => {
    item.disabled = false
    if (item.children)
      resetTreeDisabled(item.children)
  })
}
// 寻找当前权限的所有子级权限 并禁用
export function setTreeDisabled(permTree: any[], id: number) {
  for (const item of permTree) {
    if (item.id === id) {
      item.disabled = true
      return
    }
    if (item.children)
      setTreeDisabled(item.children, id)
  }
}
