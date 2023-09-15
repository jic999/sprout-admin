<script setup lang="ts">
import type { TableRowActionsProps } from '@/types'

defineProps<TableRowActionsProps>()
defineEmits(['edit', 'delete', 'select'])
</script>

<template>
  <div flex gap-x-1>
    <IconButton type="info" size="tiny" secondary icon="ant-design:edit-outlined" @click="$emit('edit', $props.row, $props.index)">
      编辑
    </IconButton>
    <IconButton type="error" size="tiny" secondary icon="ant-design:delete-outlined" @click="$emit('delete', $props.row, $props.index)">
      删除
    </IconButton>
    <n-dropdown
      v-if="!$props.noMore"
      trigger="hover"
      size="small"
      :options="$props.dropdownOptions"
      @select="(key, option) => $emit('select', $props.row, $props.index, key, option)"
    >
      <IconButton size="tiny" secondary icon="ant-design:down-outlined">
        更多
      </IconButton>
    </n-dropdown>
  </div>
</template>
