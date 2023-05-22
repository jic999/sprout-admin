<script setup lang="ts">
import { sStorage } from '@/utils'

interface TagInfo {
  name: string
  fullPath: string
  icon: string
}

const route = useRoute()
const router = useRouter()

const tagList = ref<TagInfo[]>(sStorage.get('tagList') || [])
const currentIndex = ref(0)
const currentPath = computed(() => tagList.value[currentIndex.value].fullPath)

watch(() => route.fullPath, () => {
  const index = tagList.value.findIndex(item => item.fullPath === route.fullPath)
  if (index !== -1)
    return currentIndex.value = index
  tagList.value.push({
    fullPath: route.fullPath,
    name: route.meta.title as string || route.name as string,
    icon: route.meta.icon as string || 'carbon:bookmark-filled',
  })
  currentIndex.value = tagList.value.length - 1
}, { immediate: true })

watch(tagList.value, () => {
  console.log('tagList :>> ', tagList)
  sStorage.set('tagList', tagList.value)
})

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
}
</script>

<template>
  <section flex items-center gap-x-8 px-12 h-44 bg="$bg-c dark:$dark-bg-c">
    <n-tag
      v-for="(tag, i) in tagList"
      :key="tag.fullPath"
      class="cursor-pointer"
      hover="text-$primary-c"
      :type="i === currentIndex ? 'primary' : 'default'"
      :closable="tagList.length > 1"
      @click="handleChange(i)"
      @close="handleClose(i)"
    >
      {{ tag.name }}
      <template #icon>
        <TheIcon :icon="tag.icon" :size="16" />
      </template>
    </n-tag>
  </section>
</template>

<style lang="scss" scoped>

</style>
