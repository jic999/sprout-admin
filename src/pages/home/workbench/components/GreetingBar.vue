<script setup lang="ts">
import { greetingBarInfoList } from '@/utils'

const userStore = useUserStore()

const greetMsg = ref('')

function getGreeting() {
  const currentHour = new Date().getHours()
  if (4 <= currentHour && currentHour < 12)
    greetMsg.value = '早上好'
  else if (12 <= currentHour && currentHour < 14)
    greetMsg.value = '中午好'
  else if (14 <= currentHour && currentHour < 18)
    greetMsg.value = '下午好'
  else
    greetMsg.value = '晚上好'
}

onMounted(() => {
  getGreeting()
})
</script>

<template>
  <div flex items-center justify-between br-8 bg="$el-bg-c" p-24>
    <div flex items-center gap-x-16>
      <img :src="userStore.userInfo.avatar" circle h-64 w-64>
      <div flex flex-col gap-12>
        <div text-18 font-600>
          {{ `${greetMsg}，${userStore.userInfo.username}，又是充满希望的一天~` }}
        </div>
        <div text-gray-500 dark="text-gray-400">
          欢迎体验 <i>Sprout Admin</i> !
        </div>
      </div>
    </div>
    <div flex gap-x-24>
      <div v-for="item in greetingBarInfoList" :key="item.title" flex flex-col gap-y-4 text-center>
        <div text-gray-500 dark="text-gray-400">
          {{ item.title }}
        </div>
        <div text-24>
          {{ item.content }}
        </div>
      </div>
    </div>
  </div>
</template>
