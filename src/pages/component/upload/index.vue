<script setup lang="ts">
import type { UploadFileInfo, UploadInst } from 'naive-ui'
import { VITE_API_BASE_URL, getToken } from '@/utils'

defineOptions({
  name: 'UploadPage',
})
const ACTION = 'http://localhost:1666/file/upload'

const fileList = ref<UploadFileInfo[]>([
  {
    id: 'url-test',
    name: '测试',
    url: 'https://www.naiveui.com/assets/naivelogo-93278402.svg',
    status: 'finished',
  },
])

const uploadRef = ref<UploadInst | null>(null)

function submit() {
  uploadRef.value?.submit()
}
function handleError(a: any, b: any) {
  console.log('======Error')
  console.log('a :>> ', a)
  console.log('b :>> ', b)
}
function handleFinish({ file, event }: { file: UploadFileInfo; event?: ProgressEvent }) {
  console.log('======Finish')
  console.log('res :>> ', VITE_API_BASE_URL + JSON.parse((event?.target as XMLHttpRequest).response).data)
  console.log('file :>> ', file)
}

function success(options: unknown) {
  console.log('000 :>> ', options)
}

const fileUploadRef = ref()

const files = ref([])

onMounted(() => {
  console.log('fileUploadRef :>> ', fileUploadRef.value)
})
</script>

<template>
  <div>
    <h2>文件上传</h2>
    <div bg="$el-bg-c" p-12>
      <n-button @click="submit">
        提交
      </n-button>
      <n-upload
        ref="uploadRef"
        v-model:file-list="fileList"
        :action="ACTION"
        :headers="{ Authorization: getToken() }"
        :default-upload="false"
        list-type="image-card"
        @error="handleError"
        @finish="handleFinish"
      />
      <h3>上传组件二次封装</h3>
      <FileUpload
        ref="fileUploadRef"
        v-model:file-list="files"
        :action="ACTION"
        :headers="{ Authorization: getToken() }"
        response-type="json"
        list-type="image-card"
        @error="handleError"
        @finish="success"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
