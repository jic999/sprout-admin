<script setup lang="ts">
import type { DataTableColumns, InputNumberProps, SwitchProps } from 'naive-ui'
import { NButton, NTag } from 'naive-ui'
import _ from 'lodash'
import type { CrudParamsHandler, SmartFormItems } from '@/types'
import { renderIcon } from '@/utils'

defineOptions({
  name: 'TableDemo2',
})

/* Form */
const smartFormRef = ref()
const formItems: SmartFormItems = {
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
}
const excludeFields = ['id', 'createTime', 'updateTime']
const formData = reactive(_.mapValues(formItems, item => item['value']))

const createParamsHandler: CrudParamsHandler<typeof formData> = (params) => {
  const formData = _.omit(params, ['id'])
  return formData
}

/* table */
const smartTableRef = ref()
const {
  formTitle,
  formAction,
  formVisible,
  formLoading,
  handleView,
  handleCreate,
  handleUpdate,
  handleDelete,
  handleCommit,
  handleCancel,
} = useCrud({
  title: '用户',
  formData,
  apis: {
    create: userApi.create,
    update: userApi.update,
    delete: userApi.delete,
  },
  refresh: () => smartTableRef.value.refresh(),
  validator: {
    validate: () => smartFormRef.value.validate(),
  },
  createParamsHandler,
})

const modalFooterStyle = {
  display: 'flex',
  justifyContent: 'end',
  gap: '0 16px',
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
  {
    title: '操作',
    key: 'actions',
    fixed: 'right',
    render(row: any) {
      return h('div', { class: 'flex gap-12' }, [
        h(
          NButton,
          { type: 'primary', size: 'tiny', secondary: true, onClick: () => handleView(row) },
          {
            default: () => '查看',
            icon: renderIcon('carbon:view', { size: 14 }),
          },
        ),
        h(
          NButton,
          { type: 'default', size: 'tiny', onClick: () => handleUpdate(row) },
          {
            default: () => '编辑',
            icon: renderIcon('carbon:edit', { size: 14 }),
          },
        ),
        h(
          NButton,
          { type: 'error', size: 'tiny', secondary: true, onClick: () => handleDelete(row.id) },
          {
            default: () => '删除',
            icon: renderIcon('carbon:trash-can', { size: 14 }),
          },
        ),
      ])
    },
  },
]

const queryParams = ref({
  keyword: '',
})

function handleQuery() {
  smartTableRef.value.refresh()
}
function handleReset() {
  smartTableRef.value.handleReset()
}
</script>

<template>
  <div>
    <div>
      <n-space justify="space-between" align="center">
        <h2 text-22 font-500>
          用户管理2
        </h2>
      </n-space>
      <n-space justify="space-between" py-16>
        <n-space>
          <n-input v-model:value="queryParams.keyword" placeholder="请输入用户名" @keydown.enter="handleQuery" />
          <NButton secondary @click="handleReset">
            <template #icon>
              <TheIcon icon="carbon:reset" :size="16" />
            </template>
            重置
          </NButton>
          <NButton type="primary" @click="handleQuery">
            <template #icon>
              <TheIcon icon="carbon:search" :size="16" />
            </template>
            搜索
          </NButton>
        </n-space>
        <n-space>
          <NButton type="primary" secondary @click="handleCreate">
            新增用户
          </NButton>
        </n-space>
      </n-space>
      <SmartTable
        ref="smartTableRef"
        v-model:query-params="queryParams"
        :get-data="userApi.page"
        :table-attrs="{
          columns,
        }"
      />
    </div>
    <n-modal
      v-model:show="formVisible"
      preset="card"
      :title="formTitle"
      :auto-focus="false"
      :footer-style="modalFooterStyle"
      w-600
    >
      <SmartForm
        ref="smartFormRef"
        v-model:model-value="formData"
        :form-items="formItems"
        :excludes="excludeFields"
        :disabled="formAction === 'view'"
      />
      <template #footer>
        <NButton @click="handleCancel">
          取消
        </NButton>
        <NButton type="primary" :loading="formLoading" @click="handleCommit">
          提交
        </NButton>
      </template>
    </n-modal>
  </div>
</template>
