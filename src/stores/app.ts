export const useAppStore = defineStore('app', () => {
  const sidebarCollapsed = ref(false)

  function toggleSidebarCollapsed() {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }
  return {
    sidebarCollapsed,
    toggleSidebarCollapsed,
  }
})
