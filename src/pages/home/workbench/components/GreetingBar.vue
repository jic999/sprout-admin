<script setup lang="ts">
import { greetingBarInfoList } from '@/utils'

const userStore = useUserStore()

const greetIndex = ref(0)

getGreeting()

const greetMsgs = [
  { msg: '早上好', more: '一日之计在于晨!' },
  { msg: '中午好', more: '午间休息一下吧~' },
  { msg: '下午好', more: '下午茶时间到了!' },
  { msg: '晚上好', more: '早睡身体好~' },
  { msg: '凌晨好', more: '这个点还不睡，不要命了？' },
]
const greetMsg = computed(() => greetMsgs[greetIndex.value])

function getGreeting() {
  const currentHour = new Date().getHours()
  if (currentHour >= 4 && currentHour < 12)
    greetIndex.value = 0
  else if (currentHour >= 12 && currentHour < 14)
    greetIndex.value = 1
  else if (currentHour >= 14 && currentHour < 18)
    greetIndex.value = 2
  else if ((currentHour >= 18 && currentHour < 24) || (currentHour >= 0 && currentHour < 1))
    greetIndex.value = 3
  else
    greetIndex.value = 4
}
</script>

<template>
  <section flex justify-between shadow-section>
    <div v-if="userStore.userInfo" flex items-center gap-x-sm>
      <Avatar :url="userStore.userInfo.avatar" :size="42" />
      <div flex flex-col gap-y-2>
        <div text-lg>
          {{ `${greetMsg.msg}，${userStore.userInfo.nickname || userStore.userInfo.username}，${greetMsg.more}` }}
        </div>
        <div text="sm $sp-text-c-1">
          欢迎体验 <i>Sprout Admin</i> !
        </div>
      </div>
    </div>
    <div flex gap-x-lg>
      <div v-for="item in greetingBarInfoList" :key="item.title" flex flex-col gap-y-xs text-center>
        <div text="$sp-text-c-1">
          {{ item.title }}
        </div>
        <div text-xl>
          {{ item.content }}
        </div>
      </div>
    </div>
  </section>
</template>
