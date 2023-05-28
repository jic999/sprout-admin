<script setup lang="ts">
import type { FormItemRule, InputNumberProps, InputProps, SwitchProps, UploadFileInfo, UploadProps } from 'naive-ui'
import { NTag } from 'naive-ui'
import _ from 'lodash'
import type { CrudParamsHandler, CrudParamsHandlers } from '@/types'
import { defCrudItems } from '@/types'
import { ENV, getResourceUrl, getToken } from '@/utils'

defineOptions({
  name: 'SmartCrudPlus',
})

const avatarFinish = ({ file, event }: { file: UploadFileInfo; event?: ProgressEvent }) => {
  const { code, data } = (event?.target as XMLHttpRequest).response
  if (code !== SUCCESS_CODE)
    window.$message.error('上传失败，请稍候再试')
  file.url = getResourceUrl(data)
}

const crudItems = defCrudItems({
  id: {
    title: 'id',
    formItem: {
      type: 'NumberInput',
      value: null,
      attrs: { disabled: true, placeholder: '自动' } as InputNumberProps,
    },
  },
  username: {
    title: '用户名',
    formItem: {
      value: '',
      type: 'Input',
      rule: {
        required: true,
        min: 5,
        trigger: 'blur',
        message: '请输入用户名，长度在5字符以上',
      },
    },
  },
  name: {
    title: '姓名',
    formItem: {
      value: '',
      type: 'Input',
      rule: {
        required: true,
        min: 2,
        trigger: 'blur',
        message: '请输入姓名，长度在2字符以上',
      },
    },
  },
  avatar: {
    title: '头像',
    formItem: {
      value: [],
      type: 'Upload',
      attrs: {
        listType: 'image-card',
        action: ENV.VITE_UPLOAD_TARGET,
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
    tableColumn: {
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
  },
  phone: {
    title: '手机号码',
    formItem: {
      value: '',
      type: 'Input',
      rule: {
        len: 11,
        trigger: 'blur',
        message: '手机号长度为11位',
      },
    },
  },
  description: {
    title: '介绍',
    formItem: {
      value: '',
      type: 'Input',
      attrs: { type: 'textarea' } as InputProps,
    },
    tableColumn: {
      width: 200,
      render(row) {
        return h('p', { class: 'ellipsis-1' }, row.description as string || '无')
      },
    },
  },
  status: {
    title: '状态',
    formItem: {
      value: 0,
      type: 'Switch',
      attrs: { checkedValue: 0, uncheckedValue: 1 } as SwitchProps,
    },
    tableColumn: {
      render(row) {
        if (row.status === 0)
          return h(NTag, { type: 'success' }, () => '正常')
        return h(NTag, { type: 'warning' }, () => '禁用')
      },
    },
  },
  createTime: {
    title: '创建时间',
    formItem: {
      value: '',
      type: 'Input',
      attrs: { disabled: true, placeholder: '自动' },
    },
  },
  updateTime: {
    title: '更新时间',
    formItem: {
      value: '',
      type: 'Input',
      attrs: { disabled: true, placeholder: '自动' },
    },
  },
})

const paramsHandler: CrudParamsHandlers<typeof crudItems> = {
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
const valuesHandler: CrudParamsHandler<typeof crudItems> = (values) => {
  return { ...values, avatar: values.avatar ? [{ url: values.avatar, status: 'finished' }] as UploadFileInfo[] : [] }
}

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
    title="用户管理4"
    entity-name="用户"
    :crud-items="crudItems"
    :apis="userApi"
    :params-handler="paramsHandler"
    :values-handler="valuesHandler"
    :query-fields-options="queryFieldsOptions"
  />
</template>
