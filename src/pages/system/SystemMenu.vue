<script setup lang="ts">
import type { TableColumns } from 'naive-ui/es/data-table/src/interface'
import type { FormRules } from 'naive-ui'
import { NButton } from 'naive-ui'
import { pick } from 'lodash-es'
import { sysPermApi } from '@/apis/system/perm'
import type { UseCrudApis } from '@/types'
import { renderIcon } from '@/utils'

const $form = ref()
const $table = ref()

const modalFooterStyle = {
  display: 'flex',
  justifyContent: 'end',
  gap: '0 16px',
}
const formData = reactive({
  id: null,
  name: '',
  code: '',
  createTime: '',
})
const rules: FormRules = {
  name: { required: true },
  code: { required: true },
}
const queryParams = ref(pick(formData, 'name', 'code'))

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
  title: '权限',
  formData,
  apis: sysPermApi as UseCrudApis,
  validator: {
    validate: () => $form.value.validate(),
  },
  refresh: () => $table.value?.refresh(),
  filters: {
    create: ['id', 'createTime'],
    update: ['createTime'],
    empty: true,
  },
})

const columns: TableColumns = [
  { key: 'id', title: 'id' },
  { key: 'name', title: '权限名称' },
  { key: 'code', title: '权限标识' },
  { key: 'createTime', title: '创建时间' },
  {
    title: '操作',
    key: 'actions',
    fixed: 'right',
    render(row: any) {
      return h('div', { class: 'flex gap-x-1' }, [
        h(
          NButton,
          { type: 'primary', size: 'tiny', secondary: true, onClick: () => handleView(row) },
          {
            icon: renderIcon('carbon:view', { size: 14 }),
          },
        ),
        h(
          NButton,
          { type: 'default', size: 'tiny', onClick: () => handleUpdate(row) },
          {
            icon: renderIcon('carbon:edit', { size: 14 }),
          },
        ),
        h(
          NButton,
          { type: 'error', size: 'tiny', secondary: true, onClick: () => handleDelete(row.id) },
          {
            icon: renderIcon('carbon:trash-can', { size: 14 }),
          },
        ),
      ])
    },
  },
]
</script>

<template>
  <AppPageMain>
    <!-- Search bar -->
    <n-space justify="space-between" py-sm>
      <n-space>
        <n-form-item label="权限名称" label-placement="left">
          <n-input v-model:value="queryParams.name" />
        </n-form-item>
        <n-form-item label="权限标识" label-placement="left">
          <n-input v-model:value="queryParams.code" />
        </n-form-item>
      </n-space>
      <n-space>
        <NButton secondary @click="$table?.handleReset">
          重置
          <template #icon>
            <div i-carbon:reset />
          </template>
        </NButton>
        <NButton type="info" secondary @click="$table?.handleSearch">
          搜索
          <template #icon>
            <div i-carbon:search />
          </template>
        </NButton>
        <NButton type="primary" secondary @click="handleCreate">
          新增权限
          <template #icon>
            <div i-carbon:add />
          </template>
        </NButton>
      </n-space>
    </n-space>
    <SpTable ref="$table" v-model:query-params="queryParams" :get-data="sysPermApi.page" :columns="columns" />
    <n-modal
      v-model:show="formVisible"
      class="w-600px!"
      preset="card"
      :title="formTitle"
      :auto-focus="false"
      :footer-style="modalFooterStyle"
    >
      <n-form
        ref="$form"
        :model="formData"
        :rules="rules"
        label-placement="left"
        label-width="auto"
        :disabled="formAction === 'view'"
      >
        <n-form-item path="id" label="id">
          <n-input-number v-model:value="formData.id" :disabled="true" placeholder="自动生成" />
        </n-form-item>
        <n-form-item path="username" label="权限名称">
          <n-input v-model:value="formData.name" />
        </n-form-item>
        <n-form-item path="name" label="权限标识">
          <n-input v-model:value="formData.code" />
        </n-form-item>
        <n-form-item path="createTime" label="创建时间">
          <n-input v-model:value="formData.createTime" :disabled="true" placeholder="自动生成" />
        </n-form-item>
      </n-form>
      <template #footer>
        <NButton @click="handleCancel">
          取消
        </NButton>
        <NButton type="primary" :loading="formLoading" @click="handleCommit">
          提交
        </NButton>
      </template>
    </n-modal>
  </AppPageMain>
</template>

<style lang="scss" scoped>

</style>
