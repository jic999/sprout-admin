// 解除所有权限的禁用
export function resetTreeDisabled(permTree: any[], disabled = false) {
  permTree.forEach((item) => {
    item.disabled = disabled
    if (item.children)
      resetTreeDisabled(item.children)
  })
}
// 寻找当前权限 和 按钮权限 并禁用
export function setTreeDisabled(permTree: any[], id: number) {
  for (const item of permTree) {
    if (item.type === 'B' || item.id === id)
      item.disabled = true
    if (item.children)
      setTreeDisabled(item.children, id)
  }
}
