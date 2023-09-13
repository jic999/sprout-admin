<script setup lang="ts">
import type { SwitchProps } from 'naive-ui'
import { NTag } from 'naive-ui'
import { sysUserApi } from '@/apis/system/user'
import { defineCrudItems } from '@/types'

const sexList = [
  { value: 0, label: '女' },
  { value: 1, label: '男' },
  { value: 2, label: '未知' },
]
const items = defineCrudItems({
  id: {
    title: 'id',
    formItem: { type: 'NumberInput', value: null, props: { disabled: true, placeholder: '自动' } },
  },
  username: {
    title: '用户名',
    formItem: {
      type: 'Input',
      value: null,
      props: { placeholder: '请输入用户名' },
      rule: { required: true, min: 5, max: 20, trigger: 'blur', message: '请输入5-20位用户名' },
    },
  },
  nickname: {
    title: '昵称',
    formItem: {
      type: 'Input',
      value: null,
      props: { placeholder: '请输入昵称' },
    },
  },
  email: {
    title: '邮箱',
    formItem: {
      type: 'Input',
      value: null,
      props: { placeholder: '请输入邮箱' },
    },
  },
  phone: {
    title: '手机号',
    formItem: { type: 'Input', value: null, props: { placeholder: '请输入手机号' } },
  },
  sex: {
    title: '性别',
    formItem: { type: 'Radio', value: null, props: { }, options: [{ label: '女', value: 0 }, { label: '男', value: 1 }, { label: '未知', value: 2 }] },
    tableColumn: {
      render: (rowData) => {
        return sexList[rowData.sex as number].label
      },
    },
  },
  status: {
    title: '状态',
    formItem: { type: 'Switch', value: 0, props: { checkedValue: 0, uncheckedValue: 1 } as SwitchProps },
    tableColumn: {
      render(rowData) {
        if (rowData.status === 0)
          return h(NTag, { type: 'success' }, () => '正常')
        return h(NTag, { type: 'warning' }, () => '禁用')
      },
    },
  },
  createTime: {
    title: '创建时间',
    formItem: { type: 'Input', value: null, props: { placeholder: '自动', disabled: true } },
  },
})

const queryParams = ref({
  username: '',
  nickname: '',
})
// const useCrudParams: Partial<UseCrudParams<typeof items>> = {
//   filters: {
//     create: ['']
//     empty: true,
//   }
// }
</script>

<template>
  <SpCrud
    v-model:query-params="queryParams"
    entity-name="用户"
    :apis="sysUserApi"
    :crud-items="items"
    is-pagination
  >
    <template #BarLeft>
      <n-form :model="queryParams" label-placement="left" :show-feedback="false">
        <n-space>
          <n-form-item label="用户名">
            <n-input v-model:value="queryParams.username" />
          </n-form-item>
          <n-form-item label="昵称">
            <n-input v-model:value="queryParams.nickname" />
          </n-form-item>
        </n-space>
      </n-form>
    </template>
  </SpCrud>
</template>

<style lang="scss" scoped>

</style>
