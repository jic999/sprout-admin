<script setup lang="ts">
import type { DataTableColumns, FormItemRule, InputNumberProps, InputProps, SwitchProps, UploadFileInfo, UploadProps } from 'naive-ui'
import { NTag } from 'naive-ui'
import _ from 'lodash'
import type { CrudParamsHandler, CrudParamsHandlers } from '@/types'
import { defFormItems } from '@/types'
import { ENV, getResourceUrl, getToken } from '@/utils'

defineOptions({
  name: 'SmartCrud',
})

/* Form */
const ACTION = ENV.VITE_UPLOAD_TARGET
const avatarFinish = ({ file, event }: { file: UploadFileInfo; event?: ProgressEvent }) => {
  const { code, data } = (event?.target as XMLHttpRequest).response
  if (code !== SUCCESS_CODE)
    window.$message.error('上传失败，请稍候再试')
  file.url = getResourceUrl(data)
}
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
  avatar: {
    label: '头像',
    value: [],
    type: 'Upload',
    attrs: {
      listType: 'image-card',
      action: ACTION,
      headers: {
        Authorization: getToken(),
      },
      max: 1,
      accept: 'image/*',
      onFinish: avatarFinish,
    } as UploadProps,
    rule: {
      trigger: 'change',
      validator(rule: FormItemRule, val: UploadFileInfo[]) {
        if (val.length < 1)
          return new Error('请上传头像')
      },
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
const paramsHandler: CrudParamsHandlers<typeof formItems> = {
  createParamsHandler: (params) => {
    const _params = _.omit(params, ['id', 'createTime', 'updateTime'])
    _params.avatar = _params.avatar[0]?.url
    return _params
  },
  updateParamsHandler: (params) => {
    const _params = _.omit(params, ['createTime', 'updateTime'])
    _params.avatar = _params.avatar[0]?.url
    return _params
  },
}
const valuesHandler: CrudParamsHandler<typeof formItems> = (values) => {
  return { ...values, avatar: values.avatar ? [{ url: values.avatar, status: 'finished' }] as UploadFileInfo[] : [] }
}

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

const queryFieldsOptions = [
  {
    label: '用户名',
    value: 'username',
  }, {
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
    title="用户管理3"
    entity-name="用户"
    :columns="columns"
    :form-items="formItems"
    :apis="userApi"
    :params-handler="paramsHandler"
    :values-handler="valuesHandler"
    :query-fields-options="queryFieldsOptions"
  />
</template>
