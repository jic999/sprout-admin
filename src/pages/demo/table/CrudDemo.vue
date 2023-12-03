<script setup lang="ts">
import { NTag } from 'naive-ui'
import { sysUserApi } from '@/apis/system/user'
import SpCrud from '@/components/sprout/SpCrud.vue'
import { defineCrudItems } from '@/types'

const genderOptions = [
  { label: '男', value: 1 },
  { label: '女', value: 0 },
  { label: '未知', value: 2 },
]
const crudItems = defineCrudItems({
  id: {
    title: 'id',
    formItem: {
      type: 'NumberInput',
      value: 0,
    },
  },
  username: {
    title: '用户名',
    formItem: {
      type: 'Input',
      value: '',
    },
  },
  nickname: {
    title: '昵称',
    formItem: {
      type: 'Input',
      value: '',
    },
  },
  gender: {
    title: '性别',
    formItem: {
      type: 'Select',
      value: 2,
      options: genderOptions,
    },
    tableColumn: {
      render(row) {
        return h('div', {}, genderOptions.find(item => item.value === row.gender)!.label)
      },
    },
  },
  email: {
    title: '邮箱',
    formItem: {
      type: 'Input',
      value: '',
    },
  },
  phone: {
    title: '手机号码',
    formItem: {
      type: 'Input',
      value: '',
    },
  },
  roles: {
    title: '角色',
    tableColumn: {
      render(row) {
        const roles = row.roles as any[]
        if (!roles || !roles.length)
          return '-'
        return h('div', { class: 'flex flex-col items-start gap-y-1' }, roles.map(role => h(
          NTag,
          { type: 'info', size: 'small' },
          () => role.name,
        )))
      },
    },
  },
  status: {
    title: '状态',
    formItem: {
      type: 'Switch',
      value: false,
    },
    tableColumn: {
      render: ({ status }) => h(
        NTag,
        { type: status ? 'error' : 'success' },
        () => status ? '禁用' : '启用',
      ),
    },
  },
  createTime: {
    title: '创建时间',
    formItem: {
      type: 'Input',
      value: '',
    },
  },
})
</script>

<template>
  <PageMain>
    <SpCrud
      title="用户"
      :apis="sysUserApi"
      :crud-items="crudItems"
      is-pagination
    />
  </PageMain>
</template>
