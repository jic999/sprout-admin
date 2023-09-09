<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import AppSideMenu from './components/AppSideMenu.vue'
import AppFooter from './components/AppFooter.vue'
import AppTabBar from './components/AppTabBar.vue'

defineOptions({
  name: 'Layout',
})

const router = useRouter()
const appStore = useAppStore()

const keepAliveRouteNames = computed(() => {
  return router.getRoutes().filter(route => route.meta?.keepAlive).map(route => route.name) as string[]
})
</script>

<template>
  <n-layout has-sider position="absolute">
    <!-- Sider -->
    <n-layout-sider
      bordered
      :width="216"
      :collapsed-width="60"
      :collapsed="appStore.sidebarCollapsed"
      collapse-mode="width"
      content-style="padding: 6px 0; height: 100vh;"
    >
      <AppSideMenu />
    </n-layout-sider>
    <n-layout>
      <!-- Header -->
      <n-layout-header bordered position-static h-98px>
        <AppHeader />
        <AppTabBar />
      </n-layout-header>
      <!-- Content -->
      <n-layout-content
        style="height: calc(100vh - 98px); overflow: auto;"
        bordered
        content-style="padding: 8px; background: var(--sp-bg-c)"
      >
        <RouterView v-slot="{ Component }">
          <Transition name="page-transition" mode="out-in" appear>
            <KeepAlive :include="keepAliveRouteNames">
              <component :is="Component" />
            </KeepAlive>
          </Transition>
        </RouterView>
        <AppFooter />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<style lang="scss" scoped>
.page-transition-enter-active,
.page-transition-leave-active {
  transition: all .2s;
}
.page-transition-leave-to {
  opacity: 0;
  transform: translateX(24px);
}
.page-transition-enter-from {
  opacity: 0;
  transform: translateX(-24px);
}
.page-transition-enter-to {
  opacity: 1;
  transform: translateX(0);
}
</style>
