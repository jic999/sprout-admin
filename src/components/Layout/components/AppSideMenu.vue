<script setup lang="ts">
import { isExternalLink } from '@/utils'
import { useMenuStore } from '@/stores/menu'

const route = useRoute()
const router = useRouter()

const appStore = useAppStore()
const menuStore = useMenuStore()

menuStore.refreshMenuOptions()

function handleMenuChange(key: string, item: any) {
  if (isExternalLink(item.path))
    return window.open(item.path)
  router.push({ name: key })
}

const activeMenu = computed(() => route.meta.activeMenu || route.name)
</script>

<template>
  <RouterLink class="mt-8 flex-center gap-x-8 py-8 text-16 italic text-$primary-c" :to="{ path: '/' }">
    <TheIcon icon="carbon:sprout" :size="24" />
    <span v-if="!appStore.collapsed" whitespace-nowrap>Sprout Admin</span>
  </RouterLink>
  <n-menu
    :value="activeMenu"
    :options="menuStore.menuOptions"
    :indent="12"
    @update:value="handleMenuChange"
  />
</template>
