<script setup lang="ts">
import type { DataTableColumns } from 'naive-ui'
import { sysRoleApi } from '@/apis/system/role'
import SpTableRowActions from '@/components/sprout/SpTableRowActions.vue'
import { sysPermApi } from '@/apis/system/perm'

defineOptions({
  name: 'SystemRole',
})

const $table = ref()
const $form = ref()

const form = reactive({
  id: null,
  name: '',
  desc: '',
  permIds: [],
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
  hooks: {
    before: ({ row }) => {
      if (row)
        form.permIds = row.permIds || []
    },
  },
})

const queryParams = ref({
  roleName: '',
  roleCode: '',
})
const columns: DataTableColumns = [
  { type: 'selection' },
  { title: 'id', key: 'id' },
  { title: '角色名称', key: 'name' },
  { title: '角色描述', key: 'desc' },
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
          options: {
            edit: { perm: 'sys:role:update', onClick: handleUpdate },
            delete: { perm: 'sys:role:delete', onClick: () => handleDelete(row.id as number) },
          },
        },
      )
    },
  },
]
const rules = {
  name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
}

function tableVoHandler(data: any[]) {
  return data.map(role => ({
    ...role,
    permIds: role.permissions?.map((perm: any) => perm.id),
  }))
}

const permTree = ref()

async function getPermData() {
  const { err, data } = await sysPermApi.list()
  if (err) {
    console.warn(err)
    return
  }
  permTree.value = data
}

getPermData()
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
        <IconButton v-perm="['sys:role:delete']" icon="ant-design:delete-outlined" type="error" :icon-size="16" size="small" secondary @click="handleBatchDelete" />
        <IconButton v-perm="['sys:role:create']" icon="ant-design:plus-outlined" type="primary" :icon-size="16" size="small" secondary @click="handleCreate" />
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
        :vo-handler="tableVoHandler"
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
            <n-form-item label="角色id" path="id">
              <n-input-number v-model:value="form.id" disabled placeholder="自动" />
            </n-form-item>
            <n-form-item label="角色名称" required path="name">
              <n-input v-model:value="form.name" placeholder="请输入角色名称" />
            </n-form-item>
          </n-gi>
          <n-gi :span="12">
            <n-form-item label="角色描述" path="desc">
              <n-input v-model:value="form.desc" type="textarea" placeholder="请输入角色描述" autosize />
            </n-form-item>
            <n-form-item label="创建时间" path="createTime">
              <n-input v-model:value="form.createTime" disabled placeholder="自动" />
            </n-form-item>
          </n-gi>
        </n-grid>
        <n-form-item label="分配权限">
          <n-cascader
            v-model:value="form.permIds"
            :options="permTree"
            label-field="name"
            value-field="id"
            placeholder="分配权限"
            :show-path="false"
            :cascade="false"
            clearable multiple
          />
        </n-form-item>
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
