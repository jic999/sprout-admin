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
  code: '',
  desc: '',
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

// <--- Assign perms
const permModalVisible = ref(false)
const assignPermsLoading = ref(false)
const defaultParams = {
  id: 0,
  permIds: [],
}
const assignPermsParams = reactive(defaultParams)

function handleAssignPerms(row: any) {
  permModalVisible.value = true
  assignPermsParams.id = row.id
  assignPermsParams.permIds = row.permIds || []
}
function handleAssignPermsCancel() {
  permModalVisible.value = false
}
function handleAssignPermsLeave() {
  Object.assign(assignPermsParams, defaultParams)
}
async function handleAssignPermsCommit() {
  assignPermsLoading.value = true
  const { err } = await sysRoleApi.assignPerms(assignPermsParams)
  assignPermsLoading.value = false
  if (err) {
    $message.error(err.message || '分配权限失败')
    return
  }
  $message.success('分配权限成功')
  $table.value.refresh()
  handleAssignPermsCancel()
}
// --->

const queryParams = ref({
  name: '',
  code: '',
})
const columns: DataTableColumns = [
  { type: 'selection' },
  { title: 'id', key: 'id' },
  { title: '角色名称', key: 'name' },
  { title: '角色标识', key: 'code' },
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
          options: [
            { label: '编辑', type: 'info', perm: 'sys:role:update', callback: () => handleUpdate(row) },
            { label: '删除', type: 'error', perm: 'sys:role:delete', callback: () => handleDelete(row.id as string) },
            { label: '分配权限', perm: 'sys:role:assignPerms', callback: () => handleAssignPerms(row) },
          ],
        },
      )
    },
  },
]
const rules = {
  name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
  code: [{ required: true, message: '请输入角色标识', trigger: 'blur' }],
}

function tableVoHandler(data: any[]) {
  return data.map(role => ({
    ...role,
    permIds: role.permissions?.map((perm: any) => perm.id),
  }))
}

const permTree = ref()
const permTreeExpandedKeys = computed(() => permTree.value
  ? permTree.value.map((perm: any) => perm.id)
  : [],
)

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
          <n-form-item label="角色名称">
            <n-input v-model:value="queryParams.name" placeholder="角色名称" />
          </n-form-item>
          <n-form-item label="角色标识">
            <n-input v-model:value="queryParams.code" placeholder="角色标识" />
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
          <n-form-item-gi :span="12" label="角色id" path="id">
            <n-input-number v-model:value="form.id" disabled placeholder="自动" />
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="角色名称" required path="name">
            <n-input v-model:value="form.name" placeholder="请输入角色名称" />
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="角色标识" required path="code">
            <n-input v-model:value="form.code" placeholder="请输入角色标识" />
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="角色描述" path="desc">
            <n-input v-model:value="form.desc" type="textarea" placeholder="请输入角色描述" autosize />
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="创建时间" path="createTime">
            <n-input v-model:value="form.createTime" disabled placeholder="自动" />
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
    <n-modal
      v-model:show="permModalVisible"
      :style="{ width: '480px' }"
      :auto-focus="false"
      title="分配权限"
      preset="card"
      @after-leave="handleAssignPermsLeave"
    >
      <n-tree
        v-model:checked-keys="assignPermsParams.permIds"
        :data="permTree"
        label-field="name"
        key-field="id"
        placeholder="分配权限"
        check-strategy="child"
        :selectable="false"
        :expanded-keys="permTreeExpandedKeys"
        multiple checkable cascade expand-on-click show-line
      />
      <template #footer>
        <div flex justify-end gap-x-sm>
          <n-button type="primary" :loading="assignPermsLoading" @click="handleAssignPermsCommit">
            提交
          </n-button>
          <n-button @click="handleAssignPermsCancel">
            取消
          </n-button>
        </div>
      </template>
    </n-modal>
  </PageMain>
</template>
