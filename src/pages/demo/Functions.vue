<script setup lang="ts">
function hello() {
  window.$message.success('hello')
}
</script>

<template>
  <PageMain>
    <section sp-section>
      <h2>防抖节流</h2>
      <n-space>
        <n-button v-debounce="[hello, 1000]" type="info">
          试一下防抖
        </n-button>
        <n-button v-throttle="hello" type="success">
          这是节流
        </n-button>
      </n-space>
    </section>
  </PageMain>
</template>
