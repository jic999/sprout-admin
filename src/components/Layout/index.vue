<script setup lang="ts">
defineOptions({
  name: 'Layout',
})

const appStore = useAppStore()
const router = useRouter()

const keepAliveRouteNames = computed(() => {
  return router.getRoutes().filter(route => route.meta?.keepAlive).map(route => route.name)
})
</script>

<template>
  <n-layout has-sider position="absolute">
    <!-- Sider -->
    <n-layout-sider
      bordered
      :width="216"
      :collapsed-width="60"
      :collapsed="appStore.collapsed"
      collapse-mode="width"
      content-style="padding: 6px; height: 100vh;"
    >
      <AppSideMenu />
    </n-layout-sider>
    <n-layout>
      <!-- Header -->
      <n-layout-header position="static" class="h-98" bordered>
        <AppHeader />
        <TabBar />
      </n-layout-header>
      <!-- Content -->
      <n-layout-content
        style="height: calc(100vh - 98px); overflow: auto;"
        class="bg-$bg-c h-2000 dark:bg-$dark-bg-c"
        bordered
        content-style="padding: 0 12px 12px"
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

<style lang="scss">
.page-transition-enter-active,
.page-transition-leave-active {
  transition: all .3s;
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
