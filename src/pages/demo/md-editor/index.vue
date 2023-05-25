<script setup lang="ts">
import { MdEditor } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import _ from 'lodash'
import { lStorage } from '@/utils'
import { MdEnum } from '@/enums'

defineOptions({
  name: 'MdEditor',
})

const content = ref<string>(lStorage.get(MdEnum.StorageKey) || '')
const isSaving = ref(false)

const handleChange = _.debounce((val: string) => {
  lStorage.set(MdEnum.StorageKey, val)
  content.value = val
}, 1000)

function save() {
  isSaving.value = true
  setTimeout(() => {
    isSaving.value = false
    window.$message.success('保存成功~')
  }, 1000)
}

onMounted(() => {
})
</script>

<template>
  <div>
    <h2>MD 编辑器</h2>
    <div br-8 p-12 bg="$el-bg-c">
      <div my-12 flex justify-between>
        <input text="20 $primary-c" w-full bg-inherit pr-24 font-700 placeholder="请输入文章标题">
        <n-button type="primary" size="large" :loading="isSaving" @click="save">
          <template #icon>
            <TheIcon icon="carbon:save" :size="16" />
          </template>
          保存
        </n-button>
      </div>
      <MdEditor
        v-model="content"
        :theme="isDark ? 'dark' : 'default'"
        style="height: calc(100vh - 246px);"
        @change="handleChange"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
