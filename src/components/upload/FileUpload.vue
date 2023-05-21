<script setup lang="ts">
import type { UploadFileInfo, UploadInst, UploadProps } from 'naive-ui'
import { getResourceUrl } from '@/utils'

interface FileUploadProps extends UploadProps {
  modelValue: string | UploadFileInfo[]
}

const props = defineProps<FileUploadProps>()

const emits = defineEmits(['update:modelValue', 'update:fileList', 'finish'])

const uploadRef = ref<UploadInst | null>()

const fileList = computed({
  get: () => props.fileList,
  set: (val: any) => emits('update:fileList', val),
})

function handleFinish(options: { file: Required<UploadFileInfo>; event?: ProgressEvent }) {
  const { file, event } = options
  emits('finish', options)

  const res = JSON.parse((event?.target as XMLHttpRequest).response)
  file.url = getResourceUrl(res.data)
  console.log('handleFinish :>> ', options)
  return file
}

/**
 * clear 清空上传列表
 * openOpenFileDialog 打开文件选择对话框
 * submit 提交当前所有处于 pending 状态的文件
 */
defineExpose<UploadInst>({
  clear: () => uploadRef.value?.clear(),
  openOpenFileDialog: () => uploadRef.value?.openOpenFileDialog(),
  submit: () => uploadRef.value?.submit(),
})
</script>

<template>
  <n-upload ref="uploadRef" v-model:file-list="fileList" @finish="handleFinish" />
</template>

<style lang="scss" scoped>

</style>
