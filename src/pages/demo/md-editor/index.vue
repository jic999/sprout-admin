<script setup lang="ts">
import Vditor from 'vditor'
import { lStorage } from '@/utils'
import 'vditor/dist/index.css'
import { MdEnum } from '@/enums'

const vditor = ref<Vditor | null>(null)
const content = ref<string>('')

function createEditor() {
  vditor.value = new Vditor('vditor', {
    minHeight: 480,
    mode: 'sv',
    input: (val) => {
      content.value = val
      lStorage.set(MdEnum.StorageKey, val)
    },
    value: lStorage.get(MdEnum.StorageKey) || '',
    upload: {
      accept: 'image/*',
      multiple: true,
      handler: async (files) => {
        console.log(files)
        return null
      },
    },
  })
}

onMounted(() => {
  createEditor()
})
</script>

<template>
  <div>
    <h2>MD 编辑器</h2>
    <div bg="$el-bg-c">
      <div id="vditor" />
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
