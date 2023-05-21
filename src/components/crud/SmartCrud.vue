<script setup lang="ts">
import type { PropType } from 'vue'
import type { DataTableColumns, SelectOption } from 'naive-ui'
import { NButton } from 'naive-ui'
import _ from 'lodash'
import type { InternalRowData } from 'naive-ui/es/data-table/src/interface'
import type { CrudApis, CrudExtendAction, CrudParamsHandler, CrudParamsHandlers, SmartFormItems } from '@/types'
import { renderIcon } from '@/utils'

const props = defineProps({
  /* 页面标题 */
  title: {
    type: String,
    required: true,
  },
  /* 实体名称 */
  entityName: {
    type: String,
    default: undefined,
  },
  /* 表格列项 */
  columns: {
    type: Object as PropType<DataTableColumns>,
    required: true,
  },
  /* 表单项 */
  formItems: {
    type: Object as PropType<SmartFormItems<any>>,
    required: true,
  },
  /* Apis crud接口 */
  apis: {
    type: Object as PropType<CrudApis>,
    required: true,
  },
  /* 参数处理器 发送请求前 对参数进行一些处理 */
  paramsHandler: {
    type: Object as PropType<CrudParamsHandlers>,
    default: undefined,
  },
  /* 展示值处理器 在对应值展示到表单上之前进行一些处理  */
  valuesHandler: {
    type: Function as PropType<CrudParamsHandler>,
    default: undefined,
  },
  /* 是否完全自定义操作 为true时 不会显示默认的action列 */
  isCustomActions: {
    type: Boolean,
    default: false,
  },
  /* 查询参数 */
  queryParams: {
    type: Object,
    default: () => ({}),
  },
  /* 查询字段选项 */
  queryFieldsOptions: {
    type: Array<SelectOption>,
    default: undefined,
  },
  /* 是否开启分页 */
  isPagination: {
    type: Boolean,
    default: true,
  },
  /**
   * 想沿用默认actions 但要扩展更多行为时可用
   * - extendActionsBefore 在默认按钮前
   * - extendActionsAfter 在默认按钮后
   */
  extendActionsBefore: {
    type: Function as PropType<CrudExtendAction>,
    default: () => [],
  },
  extendActionsAfter: {
    type: Function as PropType<CrudExtendAction>,
    default: () => [],
  },
})
const emits = defineEmits(['update:queryParams'])

/* Form */
const smartFormRef = ref()

const formData = reactive(_.mapValues(props.formItems, item => item['value']))

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
  title: props.entityName || props.title,
  formData,
  apis: {
    create: props.apis.create,
    update: props.apis.update,
    delete: props.apis.delete,
  },
  refresh: () => smartTableRef.value.refresh(),
  validator: {
    validate: () => smartFormRef.value.validate(),
  },
  createParamsHandler: props.paramsHandler?.createParamsHandler,
  updateParamsHandler: props.paramsHandler?.updateParamsHandler,
  viewValuesHandler: props.valuesHandler,
})

const modalFooterStyle = {
  display: 'flex',
  justifyContent: 'end',
  gap: '0 16px',
}

/* Table */
const defaultColumns: DataTableColumns = [
  {
    title: '操作',
    key: 'actions',
    fixed: 'right',
    render(row: InternalRowData, i: number) {
      return h('div', { class: 'flex gap-x-8' }, [
        ...props.extendActionsBefore(row, i),
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
          { type: 'error', size: 'tiny', secondary: true, onClick: () => handleDelete(row.id as any) },
          {
            default: () => '删除',
            icon: renderIcon('carbon:trash-can', { size: 14 }),
          },
        ),
        ...props.extendActionsAfter(row, i),
      ])
    },
  },
]

const _columns = computed<DataTableColumns>(() => props.isCustomActions ? props.columns : [...props.columns, ...defaultColumns])

const queryParams = computed({
  get: () => props.queryParams,
  set: (val: any) => emits('update:queryParams', val),
})
const queryInputPlaceholder = computed(
  () => `请输入${props.queryFieldsOptions?.find(item => item.value === queryParams.value.field)?.label || '关键词'}`,
)

function handleQuery() {
  smartTableRef.value.refresh()
}
function handleReset() {
  smartTableRef.value.handleReset()
}
</script>

<template>
  <div>
    <n-space class="px-12" justify="space-between" align="center">
      <h2 text-22 font-500>
        {{ title }}
      </h2>
      <slot name="AfterTitle" />
    </n-space>
    <!-- Search bar -->
    <n-space justify="space-between" px-12 py-16 br-8 bg="$el-bg-c">
      <n-space>
        <slot name="BeforeSearch" />
        <n-space v-if="queryFieldsOptions">
          <n-select v-model:value="queryParams.field" w-100 :options="queryFieldsOptions" />
          <n-input
            v-model:value="queryParams.keyword"
            :placeholder="queryInputPlaceholder"
            clearable
            @keydown.enter="handleQuery"
          />
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
        <slot name="AfterSearch" />
      </n-space>
      <n-space>
        <slot name="BeforeAddBtn" />
        <NButton type="primary" secondary @click="handleCreate">
          新增{{ entityName }}
        </NButton>
        <slot name="AfterAddBtn" />
      </n-space>
    </n-space>
    <div mt-12 px-12 py-16 br-8 bg="$el-bg-c">
      <SmartTable
        ref="smartTableRef"
        v-model:query-params="queryParams"
        :get-data="isPagination ? apis.page : apis.list"
        :table-attrs="{
          columns: _columns,
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
