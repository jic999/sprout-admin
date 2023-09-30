<script setup lang="ts">
import { greetingBarInfoList } from '@/utils'

const userStore = useUserStore()

const greetMsg = ref('')

function getGreeting() {
  const currentHour = new Date().getHours()
  if (currentHour >= 4 && currentHour < 12)
    greetMsg.value = '早上好'
  else if (currentHour >= 12 && currentHour < 14)
    greetMsg.value = '中午好'
  else if (currentHour >= 14 && currentHour < 18)
    greetMsg.value = '下午好'
  else
    greetMsg.value = '晚上好'
}

onMounted(() => {
  getGreeting()
})
</script>

<template>
  <section flex justify-between shadow-section>
    <div v-if="userStore.userInfo" flex items-center gap-x-sm>
      <Avatar :url="userStore.userInfo.avatar" :size="36" />
      <div flex flex-col gap-y-2>
        <div text-lg>
          {{ `${greetMsg}，${userStore.userInfo.nickname || userStore.userInfo.username}，又是充满希望的一天~` }}
        </div>
        <div text="sm $sp-text-c-1">欢迎体验 <i>Sprout Admin Pro</i> !</div>
      </div>
    </div>
    <div flex gap-x-lg>
      <div v-for="item in greetingBarInfoList" :key="item.title" flex flex-col gap-y-xs text-center>
        <div text="$sp-text-c-1">{{ item.title }}</div>
        <div text-xl>{{ item.content }}</div>
      </div>
    </div>
  </section>
</template>
