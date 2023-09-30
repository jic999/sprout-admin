<script setup lang="ts">
import type { TableRowActionsProps } from '@/types'
import { hasPerm } from '@/utils'

const props = defineProps<TableRowActionsProps>()
defineEmits(['edit', 'delete', 'select'])

const dropdownOptions = computed(() => props.dropdownOptions?.filter(
  option => !option.perm || hasPerm(option.perm, useUserStore().userInfo?.perms ?? []),
))
</script>

<template>
  <div flex gap-x-1>
    <IconButton v-perm="options?.edit.perm" type="info" size="tiny" secondary icon="ant-design:edit-outlined" @click="() => options.edit.onClick(row, index)">
      编辑
    </IconButton>
    <IconButton v-perm="options?.delete.perm" type="error" size="tiny" secondary icon="ant-design:delete-outlined" @click="() => options.delete.onClick(row, index)">
      删除
    </IconButton>
    <n-dropdown
      v-if="dropdownOptions?.length"
      trigger="hover"
      size="small"
      :options="dropdownOptions"
      @select="(key, option) => $emit('select', row, index, key, option)"
    >
      <IconButton size="tiny" secondary icon="ant-design:down-outlined">
        更多
      </IconButton>
    </n-dropdown>
  </div>
</template>
