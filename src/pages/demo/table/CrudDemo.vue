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
      type: 'Input',
      value: '自动',
      props: { disabled: true },
    },
  },
  username: {
    title: '用户名',
    formItem: {
      type: 'Input',
      value: '',
      rule: [{ type: 'string', required: true, min: 5, max: 20, message: '昵称长度应在5-20之间' }],
    },
  },
  nickname: {
    title: '昵称',
    formItem: {
      type: 'Input',
      value: '',
      rule: [{ type: 'string', min: 5, max: 20, message: '昵称长度应在5-20之间' }],
    },
  },
  gender: {
    title: '性别',
    formItem: {
      type: 'Select',
      value: 2,
      options: genderOptions,
      rule: [{ type: 'enum', enum: [0, 1, 2], message: '非法的数据' }],
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
      rule: [{ type: 'email', message: '请输入正确的邮箱' }],
    },
  },
  phone: {
    title: '手机号码',
    formItem: {
      type: 'Input',
      value: '',
      rule: [{ type: 'string', message: '请输入正确的手机号', pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/ }],
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
      value: 0,
      props: { checkedValue: 0, uncheckedValue: 1 },
      rule: [{ type: 'enum', enum: [0, 1], message: '非法的数据' }],
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
      value: '自动',
      props: { disabled: true },
    },
  },
})
</script>

<template>
  <PageMain>
    <SpCrud
      entity-name="用户"
      :apis="sysUserApi"
      :crud-items="crudItems"
      is-pagination
    />
  </PageMain>
</template>
