<script setup lang="ts">
import { icons } from '@iconify/json/json/ant-design.json'
import type { DataTableColumns } from 'naive-ui'
import { sysPermApi } from '@/apis/system/perm'
import { routeComponents } from '@/router'
import TheIcon from '@/components/icon/TheIcon.vue'
import SpTableRowActions from '@/components/sprout/SpTableRowActions.vue'
import { resetTreeDisabled, setTreeDisabled } from '@/utils'

defineOptions({
  name: 'SystemPerm',
})

/* Form options */
const routeComponentsOptions = routeComponents.map(item => ({
  name: item.name || item.__name,
}))
const iconOptions = Object.keys(icons).filter(icon => icon.includes('-outlined')).map(icon => ({
  label: icon,
  value: `ant-design:${icon}`,
}))

function renderIconSelectLabel(option: any) {
  return h('div', { class: 'flex items-center gap-x-xs' }, [
    h(TheIcon, { icon: option.value, size: 20 }),
    h('span', {}, option.label),
  ])
}

const permData = ref()

// ------------------------------
const $table = ref()
const $form = ref()

const permTypes = [
  { label: '目录', value: 'C' },
  { label: '菜单', value: 'M' },
  { label: '按钮', value: 'B' },
]
const form = reactive({
  id: null,
  permName: '',
  permCode: '',
  type: 'C',
  parentId: null,
  description: '',
  status: 0,
  // router info
  path: '',
  component: null,
  icon: null,
  orderNum: 0,
  hidden: 0,
  cache: 1,
  noTag: 0,
  createTime: '',
})

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
  filters: { excludes: ['permCode'] },
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

const columns: DataTableColumns = [
  { title: 'id', key: 'id' },
  { title: '权限名称', key: 'permName' },
  {
    title: '图标',
    key: 'icon',
    render: row => h(TheIcon, { icon: row.icon as string, size: 20 }),
  },
  { title: '权限标识', key: 'permCode' },
  { title: '权限类型', key: 'type', render: row => permTypes.find(item => item.value === row.type)?.label },
  { title: '路由组件名称', key: 'component' },
  { title: '路由路径', key: 'path' },
  { title: '排序', key: 'orderNum' },
  { title: '描述', key: 'description' },
  { title: '是否缓存', key: 'cache' },
  { title: '是否隐藏', key: 'hidden' },
  { title: '状态', key: 'status' },
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
        onEdit: handleUpdate,
        onDelete: () => handleDelete(row.id as number),
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
        <IconButton icon="ant-design:plus-outlined" type="primary" :icon-size="16" size="small" secondary @click="handleCreate" />
      </div>
    </section>
    <!-- Table -->
    <section sp-section>
      <SpTable ref="$table" :get-data="sysPermApi.list" :columns="columns" :scroll-x="1800" default-expand-all lazy-show />
    </section>
    <!-- Form -->
    <n-modal
      v-model:show="formVisible"
      :style="{ width: '720px' }"
      :auto-focus="false"
      :title="formTitle"
      preset="card"
    >
      <n-form ref="$form" :model="form" label-placement="left" label-width="auto" label-align="right">
        <div pb-lg text="center lg gray-500">基本信息</div>
        <n-grid x-gap="24">
          <!-- 基本信息 -->
          <n-form-item-gi :span="12" label="id" path="id">
            <n-input-number v-model:value="form.id" placeholder="自动" disabled />
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="权限名称" path="permName">
            <n-input v-model:value="form.permName" placeholder="请输入权限名称" />
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="权限标识" path="permCode">
            <n-input v-model:value="form.permCode" placeholder="请输入权限标识" />
          </n-form-item-gi>
          <n-form-item-gi required :span="12" label="权限类型" path="permType">
            <n-select v-model:value="form.type" :options="permTypes" placeholder="请选择权限类型" />
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="父级权限" path="parentId">
            <n-cascader v-model:value="form.parentId" :options="permData" label-field="permName" value-field="id" placeholder="请选择父级权限" />
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="状态" path="status">
            <n-switch v-model:value="form.status" :checked-value="0" :unchecked-value="1" />
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="创建时间" path="createTime">
            <n-input v-model:value="form.createTime" placeholder="自动" disabled />
          </n-form-item-gi>
          <n-form-item-gi :span="12" label="描述" path="description">
            <n-input v-model:value="form.description" type="textarea" placeholder="请输入描述" />
          </n-form-item-gi>
        </n-grid>
        <div v-if="form.type !== 'B'">
          <!-- 路由信息 -->
          <div pb-lg text="center lg gray-500">路由信息</div>
          <n-grid x-gap="24">
            <n-form-item-gi :span="12" label="路由组件" path="component">
              <n-select v-model:value="form.component" :options="routeComponentsOptions" placeholder="请选择路由组件" label-field="name" value-field="name" filterable />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="路由路径" path="path">
              <n-input v-model:value="form.path" placeholder="请输入路由路径" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="图标" path="icon">
              <n-select v-model:value="form.icon" :options="iconOptions" filterable placeholder="请选择图标" :render-label="renderIconSelectLabel" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="排序" path="orderNum">
              <n-input-number v-model:value="form.orderNum" placeholder="请输入排序" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="是否隐藏" path="hidden">
              <n-switch v-model:value="form.hidden" :checked-value="1" :unchecked-value="0" />
            </n-form-item-gi>
            <n-form-item-gi :span="12" label="页面缓存" path="cache">
              <n-switch v-model:value="form.cache" :checked-value="1" :unchecked-value="0" />
            </n-form-item-gi>
            <n-form-item-gi :span="24" label="禁用标签" path="noTag">
              <n-switch v-model:value="form.noTag" :checked-value="1" :unchecked-value="0" />
            </n-form-item-gi>
          </n-grid>
        </div>
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
