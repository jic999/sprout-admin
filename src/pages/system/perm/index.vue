<script setup lang="ts">
import type { DataTableColumns, FormRules } from 'naive-ui'
import { sysPermApi } from '@/apis/system/perm'
import SpTableRowActions from '@/components/sprout/SpTableRowActions.vue'
import { resetTreeDisabled, setTreeDisabled } from '@/utils'

defineOptions({
  name: 'SystemPerm',
})
const permData = ref()

// ------------------------------
const $table = ref()
const $form = ref()

const form = reactive({
  id: null,
  parentId: null,
  name: '',
  code: '',
  desc: '',
  createTime: '',
})

const rules: FormRules = {
  name: [{ required: true, message: '请输入权限名称', trigger: 'blur' }],
  code: [{ required: true, message: '请输入权限标识', trigger: 'blur' }],
}

const {
  formTitle,
  formVisible,
  formLoading,
  handleCreate,
  handleUpdate,
  handleDelete,
  handleCommit,
  handleCancel,
} = useCrud({
  title: '权限',
  form,
  apis: sysPermApi,
  refresh: () => $table.value.refresh(),
  validator: { validate: () => $form.value.validate() },
  hooks: {
    before: ({ row }) => {
      permData.value = $table.value.getData()
      resetTreeDisabled(permData.value)
      if (row) {
        // 禁止将 自己的父级权限 设置为 自己或自己的子级权限
        setTreeDisabled(permData.value, +row.id!)
      }
    },
  },
})

function _handleDelete(row: any) {
  if (!(row.code as string).includes('sys'))
    return handleDelete(row.id)
  $dialog.create({
    title: '警告',
    content: '删除系统权限可能会导致异常，请谨慎操作！',
    type: 'warning',
    autoFocus: false,
    positiveText: '继续删除',
    negativeText: '取消',
    onPositiveClick: () => handleDelete(row.id),

  })
}

const columns: DataTableColumns = [
  { title: 'id', key: 'id' },
  { title: '权限名称', key: 'name' },
  { title: '权限标识', key: 'code' },
  { title: '描述', key: 'desc' },
  { title: '创建时间', key: 'createTime' },
  {
    title: '操作',
    key: 'actions',
    fixed: 'right',
    render: (row, index) => h(
      SpTableRowActions,
      {
        row,
        index,
        options: [
          { label: '编辑', type: 'info', perm: 'sys:user:update', callback: () => handleUpdate(row) },
          { label: '删除', type: 'error', perm: 'sys:user:delete', callback: () => _handleDelete(row) },
        ],
      },
    ),
  },
]
</script>

<template>
  <PageMain>
    <!-- Search -->
    <section mb-8px flex justify-between sp-section>
      <div />
      <div flex gap-x-2>
        <IconButton icon="ant-design:redo-outlined" :icon-size="16" size="small" secondary @click="() => $table?.handleReset()" />
        <IconButton v-perm="['sys:perm:create']" icon="ant-design:plus-outlined" type="primary" :icon-size="16" size="small" secondary @click="handleCreate" />
      </div>
    </section>
    <!-- Table -->
    <section sp-section>
      <SpTable ref="$table" :get-data="sysPermApi.list" :columns="columns" :row-key="row => row.id" default-expand-all lazy-show />
    </section>
    <!-- Form -->
    <n-modal
      v-model:show="formVisible"
      :style="{ width: '720px' }"
      :auto-focus="false"
      :title="formTitle"
      preset="card"
    >
      <n-form ref="$form" :model="form" :rules="rules" label-placement="left" label-width="auto" label-align="right">
        <n-grid x-gap="24">
          <n-form-item-gi :span="12" label="id" path="id">
            <n-input-number v-model:value="form.id" placeholder="自动" disabled />
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="父级权限" path="parentId">
            <n-cascader v-model:value="form.parentId" :options="permData" label-field="name" value-field="id" placeholder="默认为一级权限" clearable />
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="权限名称" path="name" required>
            <n-input v-model:value="form.name" placeholder="请输入权限名称" />
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="权限标识" path="code" required>
            <n-input v-model:value="form.code" placeholder="请输入权限名称" />
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="权限描述" path="desc">
            <n-input v-model:value="form.desc" type="textarea" placeholder="请输入描述" autosize />
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="创建时间" path="createTime">
            <n-input v-model:value="form.createTime" placeholder="自动" disabled />
          </n-form-item-gi>
        </n-grid>
      </n-form>
      <template #footer>
        <div flex justify-end gap-x-sm>
          <n-button type="primary" :loading="formLoading" @click="handleCommit">
            提交
          </n-button>
          <n-button @click="handleCancel">
            取消
          </n-button>
        </div>
      </template>
    </n-modal>
  </PageMain>
</template>
