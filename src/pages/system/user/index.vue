<script setup lang="ts">
import { NTag } from 'naive-ui'
import type { DataTableColumns, FormRules } from 'naive-ui'
import { sysUserApi } from '@/apis/system/user'
import SpTableRowActions from '@/components/sprout/SpTableRowActions.vue'

defineOptions({
  name: 'SystemUser',
})

const router = useRouter()

const $table = ref()
const $form = ref()

const form = reactive({
  id: null,
  username: '',
  nickname: '',
  email: '',
  phone: '',
  status: 0,
  createTime: '',
})

const queryParams = ref({
  username: '',
  nickname: '',
  sex: null,
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
  title: '用户',
  form,
  apis: sysUserApi,
  refresh: () => $table.value.refresh(),
  validator: { validate: () => $form.value.validate() },
  getCheckedKeys: () => $table.value.getCheckedKeys(),
})

const columns: DataTableColumns = [
  { type: 'selection' },
  { title: 'id', key: 'id' },
  { title: '用户名', key: 'username' },
  { title: '昵称', key: 'nickname' },
  { title: '邮箱', key: 'email' },
  { title: '手机号', key: 'phone' },
  {
    title: '角色',
    key: 'roles',
    render(row) {
      const roles = row.roles as any[]
      if (!roles || !roles.length)
        return '-'
      return h('div', { class: 'flex flex-col items-start gap-y-1' }, roles.map(role => h(
        NTag,
        { type: 'info', size: 'small' },
        () => role.name,
      )))
    },
  },
  {
    title: '状态',
    key: 'status',
    render: ({ status }) => h(
      NTag,
      { type: status ? 'error' : 'success' },
      () => status ? '禁用' : '启用',
    ),
  },
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
          { label: '删除', type: 'error', perm: 'sys:user:delete', callback: () => handleDelete(row.id as string) },
        ],
        dropdownOptions: [
          { label: '分配角色', perm: 'sys:user:assignRoles', callback: () => router.push(`/system/user/assign-role/${row.id}`) },
          { label: '重置密码', callback: () => window.$message.info('重置密码') },
        ],
      },
    ),
  },
]

const rules: FormRules = {
  username: [{ type: 'string', required: true, message: '请输入用户名', min: 3, max: 20 }],
  nickname: [{ type: 'string', min: 1, max: 20, message: '昵称长度在1-20之间' }],
  email: [{ type: 'email', message: '请输入正确的邮箱' }],
  phone: [{ type: 'string', message: '请输入正确的手机号', pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/ }],
  status: [{ type: 'enum', enum: [0, 1], message: '非法的数据' }],
}

onBeforeUpdate(() => {
  if (refreshSS.get()) {
    $table.value.refresh()
    refreshSS.restore()
  }
})
</script>

<template>
  <PageMain>
    <!-- Search bar -->
    <section mb-8px flex items-end justify-between sp-section>
      <n-form :model="queryParams" label-placement="left" label-width="auto" label-align="right" :show-feedback="false">
        <n-space vertical>
          <n-space>
            <n-form-item label="用户名">
              <n-input v-model:value="queryParams.username" placeholder="搜索用户名" />
            </n-form-item>
            <n-form-item label="昵称">
              <n-input v-model:value="queryParams.nickname" placeholder="搜索昵称" />
            </n-form-item>
            <n-form-item label="性别">
              <n-radio-group v-model:value="queryParams.sex">
                <div flex items-center gap-x-xs>
                  <n-radio label="男" :value="1" />
                  <n-radio label="女" :value="0" />
                  <n-radio label="未知" :value="2" />
                  <IconButton icon="ant-design:close-outlined" size="tiny" circle quaternary @click="queryParams.sex = null" />
                </div>
              </n-radio-group>
            </n-form-item>
          </n-space>
        </n-space>
      </n-form>
      <div flex gap-x-2>
        <IconButton icon="ant-design:redo-outlined" :icon-size="16" size="small" secondary @click="() => $table?.handleReset()" />
        <IconButton icon="ant-design:search-outlined" type="info" :icon-size="16" size="small" secondary @click="() => $table?.handleSearch()" />
        <IconButton v-perm="['sys:user:delete']" icon="ant-design:delete-outlined" type="error" :icon-size="16" size="small" secondary @click="handleBatchDelete" />
        <IconButton v-perm="['sys:user:create']" icon="ant-design:plus-outlined" type="primary" :icon-size="16" size="small" secondary @click="handleCreate" />
      </div>
    </section>
    <section sp-section>
      <!-- Table -->
      <SpTable
        ref="$table"
        v-model:query-params="queryParams"
        :get-data="sysUserApi.page"
        :columns="columns"
        :row-key="row => row.id"
        is-pagination
      />
    </section>
    <!-- Form -->
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
            <n-form-item label="用户名" path="id">
              <n-input v-model:value="form.id" placeholder="自动" disabled />
            </n-form-item>
            <n-form-item label="用户名" path="username">
              <n-input v-model:value="form.username" placeholder="请输入用户名" />
            </n-form-item>
            <n-form-item label="昵称" path="nickname">
              <n-input v-model:value="form.nickname" placeholder="请输入昵称" />
            </n-form-item>
            <n-form-item label="邮箱" path="email">
              <n-input v-model:value="form.email" placeholder="请输入邮箱" />
            </n-form-item>
          </n-gi>
          <n-gi :span="12">
            <n-form-item label="手机号" path="phone">
              <n-input v-model:value="form.phone" placeholder="请输入手机号" />
            </n-form-item>
            <n-form-item label="状态" path="status">
              <n-switch v-model:value="form.status" :checked-value="0" :unchecked-value="1" />
            </n-form-item>
            <n-form-item label="创建时间" path="createTime">
              <n-input v-model:value="form.createTime" disabled placeholder="自动" />
            </n-form-item>
          </n-gi>
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
