<script setup lang="ts">
import { getTabBarData, setTabBarData } from '@/utils/app'

interface TagInfo {
  name: string
  fullPath: string
  icon: string
}

const route = useRoute()
const router = useRouter()

const tagList = ref<TagInfo[]>(getTabBarData() || [])
const currentIndex = ref(0)
const currentPath = computed(() => tagList.value[currentIndex.value].fullPath)

watch(() => route.fullPath, () => {
  if (route.meta.noTag)
    return
  const index = tagList.value.findIndex(item => item.fullPath === route.fullPath)
  if (index !== -1)
    return currentIndex.value = index
  tagList.value.push({
    fullPath: route.fullPath,
    name: route.meta.title as string || route.name as string,
    icon: route.meta.icon as string || 'carbon:bookmark',
  })
  currentIndex.value = tagList.value.length - 1
  setTabBarData(tagList.value)
}, { immediate: true })

function handleChange(i: number) {
  currentIndex.value = i
  router.push({ path: currentPath.value })
}
function handleClose(i: number) {
  tagList.value.splice(i, 1)
  // 若删除了激活项左侧标签 或当前索引大于tagList.length
  if (i < currentIndex.value || currentIndex.value >= tagList.value.length)
    currentIndex.value--
  router.push({ path: currentPath.value })
  setTabBarData(tagList.value)
}
</script>

<template>
  <section h-44px flex items-center gap-x-2 overflow-x-auto px-xs>
    <n-tag
      v-for="(tag, i) in tagList"
      :key="tag.name"
      hover="text-primary"
      :type="i === currentIndex ? 'primary' : 'default'"
      :closable="tagList.length > 1"
      @click="handleChange(i)"
      @close="handleClose(i)"
    >
      {{ tag.name }}
      <template #icon>
        <div v-if="i === currentIndex" h-10px w-10px rounded-full bg-primary />
      </template>
    </n-tag>
  </section>
</template>
