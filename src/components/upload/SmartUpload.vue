<script setup lang="ts">
import type { PropType } from 'vue'
import { req } from '@/apis/request'

const props = defineProps({
  target: {
    type: String,
    default: undefined,
  },
  fileList: {
    type: Array as PropType<UploadFileInfo[]>,
    default: undefined,
  },
  autoUpload: {
    type: Boolean,
    default: true,
  },
  limit: {
    type: Number,
    default: 1,
  },
  accept: {
    type: String,
    default: 'image/*',
  },
  multiple: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  onSuccess: {
    type: Function,
    default: undefined,
  },
})

const emits = defineEmits(['update:fileList', 'success'])

interface UploadFileInfo {
  url: string
  file: File | null
}

type UploadAction = 'add' | 'update'

const uploadRef = ref<HTMLInputElement | null>(null)
const fileListRef = ref<HTMLElement[] | null>(null)

const action = ref<UploadAction>('add')
const fileList = ref<UploadFileInfo[]>(props.fileList || [])
let currentIndex = -1

const limitMsg = computed(() => `至多可上传${props.limit}个`)

function createImage(file: File): UploadFileInfo {
  return {
    url: URL.createObjectURL(file),
    file,
  }
}

function binding() {
  props.fileList && emits('update:fileList', fileList.value)
}
function handleAdd() {
  action.value = 'add'
  uploadRef.value?.click()
}
function handleView(i: number) {
  fileListRef.value![i].querySelector('img')?.click()
}
function handleUpdate(i: number) {
  currentIndex = i
  action.value = 'update'
  nextTick(() => uploadRef.value?.click())
}
function handleDelete(i: number) {
  fileList.value.splice(i, 1)
  binding()
}

async function onChange(e: Event) {
  const rawFiles = (e.target as HTMLInputElement).files!
  if (rawFiles.length === 0)
    return
  // 若上传数量超出上限
  if (
    fileList.value.length + rawFiles.length > props.limit
    && action.value === 'add'
  )
    return window.$message.warning(limitMsg.value)

  const files = Object.keys(rawFiles).map(key => createImage(rawFiles[key as unknown as number]))
  if (props.autoUpload && props.target) {
    const data = await submit(files)
    console.log('data :>> ', data)
  }
  const handler = {
    add() {
      if (props.limit > 1)
        fileList.value = fileList.value.concat(files)
      else
        fileList.value.push(files[0])
    },
    update() {
      fileList.value[currentIndex] = files[0]
    },
  }

  handler[action.value]()
  binding()
  uploadRef.value!.value = ''
}

function submit(files: UploadFileInfo[]) {
  const formData = new FormData()
  files.forEach((file) => {
    formData.append('file', file.file!)
  })
  return req.post(props.target!, formData)
}

defineExpose({
  submit: () => submit(fileList.value),
})
</script>

<template>
  <div flex gap-12>
    <div
      v-for="(img, i) in fileList"
      ref="fileListRef"
      :key="img.url"
      class="preview-img"
      relative border bg-gray-2 br-4 h-96 overflow-hidden w-96
    >
      <n-image
        class="h-full w-full"
        :src="img.url"
        object-fit="cover"
        :img-props="{ class: 'w-full h-full', style: { objectPosition: 'center' } }"
      />
      <div
        class="preview-img__mark"
        hover="bg-hex-1116"
        absolute h-full w-full flex-center gap-x-4 l-0 t-0
      >
        <div
          hover="text-white"
          text="14 gray-2"
          i-carbon:view cursor-pointer transition
          @click="handleView(i)"
        />
        <div
          hover="text-white"
          text="14 gray-2"
          i-carbon:edit cursor-pointer transition
          @click="handleUpdate(i)"
        />
        <div
          hover="text-white"
          text="14 gray-2"
          i-carbon:trash-can cursor-pointer transition
          @click="handleDelete(i)"
        />
      </div>
    </div>
    <div
      hover="border-$primary-c"
      border="1 dashed gray-3"
      flex-center cursor-pointer bg-hex-1111 transition duration-300 br-4 h-96 w-96
      @click="handleAdd"
    >
      <div class="i-carbon:add" text="20" />
    </div>
  </div>
  <input ref="uploadRef" class="hidden" type="file" :accept="accept" :multiple="multiple" @change="onChange">
</template>

<style lang="scss" scoped>
.preview-img {
  &__mark {
    display: none;
  }
  &:hover > &__mark {
    display: flex;
  }
}
</style>
