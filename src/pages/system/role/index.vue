<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui'
import { sysRoleApi } from '@/apis/system/role'
import SpTableRowActions from '@/components/sprout/SpTableRowActions.vue'

defineOptions({
  name: 'SystemRole',
})

const $table = ref()
const $form = ref()

const form = reactive({
  id: null,
  roleName: '',
  roleCode: '',
  description: '',
  createTime: '',
})

const {
  formTitle,
  formVisible,
  formLoading,
  handleCreate,
  handleUpdate,
  handleDelete,
  handleBatchDelete,
  handleCommit,
  handleCancel,
} = useCrud({
  title: '角色',
  form,
  apis: sysRoleApi,
  refresh: () => $table.value.refresh(),
  validator: { validate: () => $form.value.validate() },
  getCheckedKeys: () => $table.value.getCheckedKeys(),
})

const queryParams = ref({
  roleName: '',
  roleCode: '',
})
const columns: DataTableColumns = [
  { type: 'selection' },
  { title: 'id', key: 'id' },
  { title: '名称', key: 'roleName' },
  { title: '标识', key: 'roleCode' },
  { title: '描述', key: 'description' },
  { title: '创建时间', key: 'createTime' },
  {
    title: '操作',
    key: 'action',
    width: 200,
    render(row, index) {
      return h(
        SpTableRowActions,
        {
          row,
          index,
          onEdit: handleUpdate,
          onDelete: () => handleDelete(row.id as number),
        },
      )
    },
  },
]
const rules = {
  name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
  code: [{ required: true, message: '请输入角色标识', trigger: 'blur' }],
}
</script>

<template>
  <PageMain>
    <!-- Search bar -->
    <section mb-8px flex items-end justify-between sp-section>
      <n-form :model="queryParams" label-placement="left" label-width="auto" label-align="right" :show-feedback="false">
        <n-space>
          <n-form-item label="角色名">
            <n-input v-model:value="queryParams.roleName" placeholder="搜索用户名" />
          </n-form-item>
          <n-form-item label="角色标识">
            <n-input v-model:value="queryParams.roleCode" placeholder="搜索昵称" />
          </n-form-item>
        </n-space>
      </n-form>
      <div flex gap-x-2>
        <IconButton icon="ant-design:redo-outlined" :icon-size="16" size="small" secondary @click="() => $table?.handleReset()" />
        <IconButton icon="ant-design:search-outlined" type="info" :icon-size="16" size="small" secondary @click="() => $table?.handleSearch()" />
        <IconButton icon="ant-design:delete-outlined" type="error" :icon-size="16" size="small" secondary @click="handleBatchDelete" />
        <IconButton icon="ant-design:plus-outlined" type="primary" :icon-size="16" size="small" secondary @click="handleCreate" />
      </div>
    </section>
    <!-- Table -->
    <section sp-section>
      <SpTable
        ref="$table"
        v-model:query-params="queryParams"
        :get-data="sysRoleApi.list"
        :columns="columns"
        :row-key="row => row.id"
      />
    </section>
    <n-modal
      v-model:show="formVisible"
      :style="{ width: '600px' }"
      :auto-focus="false"
      :title="formTitle"
      preset="card"
    >
      <n-form ref="$form" :model="form" :rules="rules" label-placement="left" label-width="auto" label-align="right">
        <n-grid :x-gap="24">
          <n-gi :span="12">
            <n-form-item label="角色id">
              <n-input v-model:value="form.id" disabled placeholder="自动" />
            </n-form-item>
            <n-form-item label="角色名称" required>
              <n-input v-model:value="form.roleName" placeholder="请输入角色名称" />
            </n-form-item>
            <n-form-item label="角色标识" required>
              <n-input v-model:value="form.roleCode" placeholder="请输入角色标识" />
            </n-form-item>
          </n-gi>
          <n-gi :span="12">
            <n-form-item label="角色描述">
              <n-input v-model:value="form.description" type="textarea" placeholder="请输入角色描述" />
            </n-form-item>
            <n-form-item label="创建时间">
              <n-input v-model:value="form.createTime" disabled placeholder="自动" />
            </n-form-item>
          </n-gi>
        </n-grid>
      </n-form>
      <template #footer>
        <div flex justify-end gap-x-sm>
          <n-button type="primary" :loading="formLoading" @click="handleCommit">提交</n-button>
          <n-button @click="handleCancel">取消</n-button>
        </div>
      </template>
    </n-modal>
  </PageMain>
</template>
