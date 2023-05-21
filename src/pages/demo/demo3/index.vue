<script setup lang="ts">
import type { DataTableColumns, InputNumberProps, InputProps, SwitchProps } from 'naive-ui'
import { NTag } from 'naive-ui'
import _ from 'lodash'
import type { CrudParamsHandlers } from '@/types'
import { defFormItems } from '@/types'

defineOptions({
  name: 'TableDemo3',
})

// TODO 文件上传

/* Form */
const formItems = defFormItems({
  id: {
    label: 'id',
    value: null,
    type: 'NumberInput',
    attrs: { disabled: true, placeholder: '自动' } as InputNumberProps,
  },
  username: {
    label: '用户名',
    value: '',
    type: 'Input',
    rule: {
      required: true,
      min: 5,
      trigger: 'blur',
      message: '请输入用户名，长度在5字符以上',
    },
  },
  name: {
    label: '姓名',
    value: '',
    type: 'Input',
    rule: {
      required: true,
      min: 2,
      trigger: 'blur',
      message: '请输入姓名，长度在2字符以上',
    },
  },
  phone: {
    label: '手机号码',
    value: '',
    type: 'Input',
    rule: {
      len: 11,
      trigger: 'blur',
      message: '手机号长度为11位',
    },
  },
  description: {
    label: '介绍',
    value: '',
    type: 'Input',
    attrs: { type: 'textarea' } as InputProps,
  },
  status: {
    label: '状态',
    value: 0,
    type: 'Switch',
    attrs: { checkedValue: 0, uncheckedValue: 1 } as SwitchProps,
  },
  createTime: {
    label: '创建时间',
    value: '',
    type: 'Input',
    attrs: { disabled: true, placeholder: '自动' },
  },
  updateTime: {
    label: '更新时间',
    value: '',
    type: 'Input',
    attrs: { disabled: true, placeholder: '自动' },
  },
})
/* Table */
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
    title: '名称',
    key: 'name',
  },
  {
    title: '头像',
    key: 'avatar',
    render(row) {
      if (row.avatar) {
        return h('img', {
          src: row.avatar,
          class: 'w-36 h-36 object-cover object-center',
        })
      }
      else { return h('span', {}, '无') }
    },
  },
  {
    title: '手机号码',
    key: 'phone',
  },
  {
    title: '介绍',
    key: 'description',
    width: 200,
    render(row) {
      return h('p', { class: 'ellipsis-1' }, row.description as string || '无')
    },
  },
  {
    title: '状态',
    key: 'status',
    render(row) {
      if (row.status === 0)
        return h(NTag, { type: 'success' }, () => '正常')
      return h(NTag, { type: 'warning' }, () => '禁用')
    },
  },
  {
    title: '创建时间',
    key: 'createTime',
  },
  {
    title: '更新时间',
    key: 'updateTime',
  },
]

const paramsHandler: CrudParamsHandlers = {
  createParamsHandler: (params: any) => _.omit(params, ['id', 'createTime', 'updateTime']),
  updateParamsHandler: (params: any) => _.omit(params, ['createTime', 'updateTime']),
}

const queryFieldsOptions = [
  {
    label: '用户名',
    value: 'username',
  },
  {
    label: '姓名',
    value: 'name',
  },
]
const queryParams = ref({
  field: 'username',
  keyword: '',
})
</script>

<template>
  <SmartCrud
    v-model:query-params="queryParams"
    title="用户管理"
    entity-name="用户"
    :params-handler="paramsHandler"
    :columns="columns"
    :form-items="formItems"
    :apis="userApi"
    :query-fields-options="queryFieldsOptions"
  />
</template>
