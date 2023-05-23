<script setup lang="ts">
import type { DataTableColumns, InputNumberProps } from 'naive-ui'
import _ from 'lodash'
import type { CrudParamsHandlers } from '@/types'
import { defFormItems } from '@/types'

defineOptions({
  name: 'SystemRole',
})

const formItems = defFormItems({
  id: {
    label: 'id',
    value: null,
    type: 'NumberInput',
    attrs: { disabled: true, placeholder: '自动' } as InputNumberProps,
  },
  roleName: {
    label: '角色名称',
    value: '',
    type: 'Input',
    rule: {
      required: true,
      min: 2,
      trigger: 'blur',
      message: '角色名称长度在2字符以上',
    },
  },
  roleCode: {
    label: '角色表示',
    value: '',
    type: 'Input',
    rule: {
      required: true,
      min: 4,
      trigger: 'blur',
      message: '角色标识长度在2字符以上',
    },
  },
  description: {
    label: '描述',
    value: '',
    type: 'Input',
    attrs: { type: 'textarea' },
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
const paramsHandler: CrudParamsHandlers<typeof formItems> = {
  createParamsHandler: (params) => {
    const _params = _.omit(params, ['id', 'createTime', 'updateTime'])
    return _params
  },
  updateParamsHandler: (params) => {
    const _params = _.omit(params, ['createTime', 'updateTime'])
    return _params
  },
}

const columns: DataTableColumns = [
  {
    title: 'id',
    key: 'id',
  }, {
    title: '角色名称',
    key: 'roleName',
  }, {
    title: '角色标识',
    key: 'roleCode',
  }, {
    title: '描述',
    key: 'description',
  }, {
    title: '创建时间',
    key: 'createTime',
  }, {
    title: '更新时间',
    key: 'updateTime',
  },
]
const queryFieldsOptions = [
  {
    label: '角色名称',
    value: 'roleName',
  }, {
    label: '角色标识',
    value: 'roleCode',
  },
]
const queryParams = ref({
  field: 'roleName',
  keyword: '',
})
</script>

<template>
  <SmartCrud
    v-model:query-params="queryParams"
    title="角色管理"
    entity-name="角色"
    :columns="columns"
    :form-items="formItems"
    :apis="roleApi"
    :params-handler="paramsHandler"
    :query-fields-options="queryFieldsOptions"
  />
</template>
