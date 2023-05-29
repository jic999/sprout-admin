<script setup lang="ts">
import type { DataTableColumns, FormItemRule, FormRules } from 'naive-ui'
import { NButton, NSwitch, NTag } from 'naive-ui'
import _ from 'lodash'
import type { CrudParamsHandler } from '@/types'
import { renderIcon } from '@/utils'

defineOptions({
  name: 'OrdinaryTable',
})

/* Modal Form */
const formData = reactive({
  id: null,
  username: '',
  name: '',
  phone: '',
  avatar: '',
  status: 0,
  createTime: '',
  updateTime: '',
})

const createParamsHandler: CrudParamsHandler<typeof formData> = (params) => {
  const formData = _.omit(params, ['id'])
  return formData
}

const formRef = ref()
const rules: FormRules = {
  phone: [
    {
      required: true,
      len: 11,
      validator(rule: FormItemRule, value: string) {
        if (!value)
          return new Error('需要手机号码')
        if (value.length !== 11)
          return new Error('请输入11位手机号码')
      },
    },
  ],
}

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
  refresh: () => handleQuery(),
  validator: {
    validate: () => formRef.value.validate(),
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

const pagination = reactive({
  page: 1,
  pageSize: 5,
  showSizePicker: true,
  pageSizes: [5, 10, 15, 20, 25],
  itemCount: 0,
  onChange: (page: number) => {
    pagination.page = page
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize
    pagination.page = 1
  },
})

const isLoading = ref(false)
const tableData = ref([])

const queryFieldsOptions = [
  {
    label: '用户名',
    value: 'username',
  },
  {
    label: '姓名',
    value: 'name',
  },
]
const queryParams = ref({
  field: 'username',
  keyword: '',
})
const queryInputPlaceholder = computed(
  () => `请输入${queryFieldsOptions?.find(item => item.value === queryParams.value.field)?.label || '关键词'}`,
)

async function handleQuery() {
  try {
    isLoading.value = true
    const { code, data, msg } = await userApi.page({ pageNo: pagination.page, pageSize: pagination.pageSize, ...queryParams.value })
    if (code !== SUCCESS_CODE)
      throw new Error(msg)
    tableData.value = data['records']
    pagination.itemCount = data['total']
  }
  catch (error: any) {
    window.$message.error(error.message)
  }
  finally {
    isLoading.value = false
  }
}
function handleInit() {
  queryParams.value.keyword = ''
  handleQuery()
}

onMounted(() => {
  handleQuery()
})
</script>

<template>
  <div>
    <div>
      <n-space justify="space-between" align="center">
        <h2 text-22 font-500>
          用户管理
        </h2>
      </n-space>
      <!-- Search bar -->
      <n-space justify="space-between" px-12 py-16 br-8 bg="$el-bg-c">
        <n-space>
          <n-select v-model:value="queryParams.field" w-100 :options="queryFieldsOptions" />
          <n-input v-model:value="queryParams.keyword" :placeholder="queryInputPlaceholder" @keydown.enter="handleQuery" />
          <NButton secondary @click="handleInit">
            重置
          </NButton>
          <NButton type="primary" @click="handleQuery">
            搜索
          </NButton>
        </n-space>
        <n-space>
          <NButton type="primary" secondary @click="handleCreate">
            新增用户
          </NButton>
        </n-space>
      </n-space>
      <div mt-12 px-12 py-16 br-8 bg="$el-bg-c">
        <n-data-table
          :columns="columns"
          :data="tableData"
          :loading="isLoading"
          :pagination="pagination"
        />
      </div>
    </div>
    <n-modal
      v-model:show="formVisible"
      preset="card"
      :title="formTitle"
      :auto-focus="false"
      :footer-style="modalFooterStyle"
      w-600
    >
      <n-form
        ref="formRef"
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
          <n-input v-model:value="formData.name" />
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
  </div>
</template>
