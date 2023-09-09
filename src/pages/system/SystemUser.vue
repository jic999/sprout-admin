<script setup lang="ts">
import { type DataTableColumns, type FormRules, NButton } from 'naive-ui'
import { sysUserApi } from '@/apis/system/user'
import type { UseCrudApis } from '@/types'
import { renderIcon } from '@/utils'

/* Form */
const formData = reactive({
  id: null,
  username: '',
  nickname: '',
  avatar: '',
  email: '',
  phone: '',
  sex: 2,
  status: 0,
  createTime: '',
})
const rules: FormRules = {
  username: { required: true, min: 5, max: 20, message: '用户名长度在5-20之间' },
}

const $form = ref()

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
  apis: sysUserApi as UseCrudApis,
  validator: {
    validate: () => $form.value.validate(),
  },
  refresh: () => handleQuery(),
})

const modalFooterStyle = {
  display: 'flex',
  justifyContent: 'end',
  gap: '0 16px',
}

/* Table */
const columns: DataTableColumns = [
  { key: 'id', title: 'id' },
  { key: 'username', title: '用户名' },
  { key: 'nickname', title: '昵称' },
  { key: 'avatar', title: '头像' },
  { key: 'email', title: '邮箱' },
  { key: 'phone', title: '手机号码' },
  { key: 'sex', title: '性别' },
  { key: 'status', title: '状态' },
  { key: 'createTime', title: '创建时间' },
  {
    title: '操作',
    key: 'actions',
    fixed: 'right',
    render(row: any) {
      return h('div', { class: 'flex gap-x-xs' }, [
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
const isLoading = ref(false)
const tableData = ref()

async function handleQuery() {
  isLoading.value = true
  const { err, data } = await sysUserApi.list()
  isLoading.value = false
  if (err) {
    window.$message.error(err.message)
    return
  }
  tableData.value = data
}

onMounted(() => {
  handleQuery()
})
</script>

<template>
  <AppPageMain>
    <!-- Search bar -->
    <n-space justify="space-between" py-sm>
      <n-space />
      <n-space>
        <NButton type="primary" secondary @click="handleCreate">
          新增用户
        </NButton>
      </n-space>
    </n-space>
    <!-- Table -->
    <n-data-table
      :columns="columns"
      :data="tableData"
      :loading="isLoading"
    />
    <!-- Form -->
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
        <n-form-item path="username" label="用户名">
          <n-input v-model:value="formData.username" />
        </n-form-item>
        <n-form-item path="name" label="名称">
          <n-input v-model:value="formData.nickname" />
        </n-form-item>
        <n-form-item path="phone" label="手机号码">
          <n-input v-model:value="formData.phone" />
        </n-form-item>
        <n-form-item path="status" label="状态">
          <NSwitch v-model:value="formData.status" :checked-value="0" :unchecked-value="1" />
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
