<script setup lang="ts">
import type { TableRowActionsProps } from '@/types'
import { hasPerm } from '@/utils'

const props = defineProps<TableRowActionsProps>()

const dropdownOptions = computed(
  () => props.dropdownOptions
    ?.filter(option => !option.perm || hasPerm(option.perm, useUserStore().userInfo?.perms ?? []))
    .map((option) => {
      option.key = option.key ?? option.label as string
      return option
    }),
)
</script>

<template>
  <div flex gap-x-1>
    <IconButton
      v-for="(option, i) in options"
      :key="i"
      v-perm="option.perm"
      :type="option.type"
      size="tiny"
      secondary
      :icon="option.icon"
      @click="() => option.callback(row, index)"
    >
      {{ option.label }}
    </IconButton>
    <n-dropdown
      v-if="dropdownOptions?.length"
      trigger="hover"
      size="small"
      :options="dropdownOptions"
      @select="(_, option) => (option as any).callback(row, index, option)"
    >
      <IconButton size="tiny" secondary icon="ant-design:down-outlined">
        更多
      </IconButton>
    </n-dropdown>
  </div>
</template>
