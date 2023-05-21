export const useAppStore = defineStore('app', () => {
  const collapsed = ref(false)

  function toggleSidebar() {
    collapsed.value = !collapsed.value
  }
  return {
    collapsed,
    toggleSidebar,
  }
})
