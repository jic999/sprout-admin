<script setup lang="ts">
const totalList = ref([
  {
    title: '访问量',
    icon: 'i-carbon:view text-blue-600',
    count: 12345,
    fluctuation: '+12%',
  },
  {
    title: '销售额（￥）',
    icon: 'i-carbon:currency-yen text-purple-600',
    count: 54321,
    fluctuation: '-9%',
  },
  {
    title: '订单量',
    icon: 'i-carbon:border-full text-orange-600',
    count: 2345,
    fluctuation: '+5%',
  },
  {
    title: '咨询次数',
    icon: 'i-carbon:help-desk text-teal-600',
    count: 7890,
    fluctuation: '-13%',
  },
])

function judgeFluctuation(str: string) {
  if (str.charAt(0) === '+')
    return true
  return false
}
</script>

<template>
  <div flex gap-x-12>
    <div
      v-for="item in totalList"
      :key="item.title"
      class="hover-out"
      flex justify-between bg="$el-bg-c" p-12 w-25p
    >
      <div flex flex-col gap-8>
        <div :class="item.icon" text="24" />
        <div>{{ item.title }}</div>
        <div text-32>
          <n-number-animation :from="0" :to="item.count" :duration="1500" />
        </div>
      </div>
      <div flex flex-col items-end justify-between>
        <div>周</div>
        <div flex-center gap-x-8>
          <span
            text="12 fff"
            :class="judgeFluctuation(item.fluctuation) ? 'bg-green-600' : 'bg-red-600'"
            px-8 py-4 br-12
          >
            {{ item.fluctuation }}
          </span>
          <span
            :class="judgeFluctuation(item.fluctuation) ? 'text-green-600  i-carbon:arrow-up' : 'text-red-600  i-carbon:arrow-down'"
            text-20
          />
        </div>
      </div>
    </div>
  </div>
</template>
