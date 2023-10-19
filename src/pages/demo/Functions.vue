<script setup lang="ts">
import type { NUploadBefore } from '@/types'
import { cropImage } from '@/utils'

function hello() {
  window.$message.success('hello')
}

const onBeforeUploadAvatar: NUploadBefore = async ({ file }) => {
  if (file.file!.size! > 1024 * 1024) {
    window.$message.error('上传头像大小不能超过1MB')
    return false
  }
  const result = await cropImage(file.file!)
  if (!result)
    return false
  file.file = result
}
</script>

<template>
  <PageMain>
    <section flex flex-col gap-y-lg sp-section>
      <div>
        <h2>防抖节流</h2>
        <n-space>
          <n-button v-debounce="[hello, 1000]" type="info">
            试一下防抖
          </n-button>
          <n-button v-throttle="hello" type="success">
            这是节流
          </n-button>
        </n-space>
      </div>
      <div>
        <h2>图片裁剪</h2>
        <n-upload
          list-type="image-card"
          response-type="json"
          accept=".png, .jpeg, .jpg"
          :max="1"
          @before-upload="onBeforeUploadAvatar"
        />
      </div>
    </section>
  </PageMain>
</template>
