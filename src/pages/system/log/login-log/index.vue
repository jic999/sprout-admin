<script setup lang="ts">
import { type DataTableColumns, NTag } from 'naive-ui'

defineOptions({
  name: 'LoginLog',
})

const columns: DataTableColumns = [
  {
    title: 'id',
    key: 'id',
  },
  {
    title: '用户名',
    key: 'username',
  },
  {
    title: 'ip地址',
    key: 'ipaddr',
  },
  {
    title: '登录结果',
    key: 'status',
    render(row) {
      return h(NTag,
        { type: row.status ? 'error' : 'success' },
        () => row.status ? '失败' : '成功')
    },
  },
  {
    title: '登录信息',
    key: 'msg',
  },
  {
    title: '登录时间',
    key: 'loginTime',
  },
]

const queryFieldsOptions = [
  {
    label: '用户名',
    value: 'username',
  },
  {
    label: '登录结果',
    value: 'status',
    placeholder: '0表示成功，1表示失败',
  },
]
const queryParams = ref({
  field: 'username',
  keyword: '',
})
</script>

<template>
  <div>
    <SmartCrud
      v-model:query-params="queryParams"
      :apis="loginLogApi"
      :columns="columns"
      :query-fields-options="queryFieldsOptions"
    />
  </div>
</template>
