<script setup lang="ts">
import { mapValues } from 'lodash-es'
import type { DataTableProps } from 'naive-ui'
import { NButton } from 'naive-ui'
import type { SpFormItem, SpTableColumn, SpTableColumns, UseCrudApis } from '@/types'
import type { SpCrudProps } from '@/types/sprout/crud'
import { renderIcon } from '@/utils'

// TODO 只是一个设想 目前只能应用于较为简单的场景 且有诸多限制

const props = withDefaults(defineProps<SpCrudProps>(), {
  isCustomActions: false,
  title: '',
  entityName: '',
  isPagination: false,
})

const emits = defineEmits(['update:queryParams'])

const formItems = computed(
  () => mapValues(props.crudItems, item => ({ label: item.title, ...item.formItem } as SpFormItem<any>)),
)
const tableColumns = computed(
  () => Object.keys(props.crudItems).map(key => ({
    title: props.crudItems[key].title,
    key,
    ...props.crudItems[key].tableColumn,
  }) as SpTableColumn),
)
/* Form */
const $form = ref()
const $table = ref()
const checkedKeys = ref<Array<number | string>>()

const form = reactive(mapValues(formItems.value, item => item.value))

const {
  formTitle,
  formAction,
  formVisible,
  formLoading,
  handleView,
  handleCreate,
  handleUpdate,
  handleDelete,
  handleBatchDelete,
  handleCommit,
  handleCancel,
} = useCrud({
  title: props.entityName,
  form,
  apis: props.apis as UseCrudApis,
  validator: {
    validate: () => $form.value?.validate(),
  },
  refresh: () => $table.value?.refresh(),
  getCheckedKeys: () => checkedKeys.value!,
  ...props.useCrudParams,
})

/* Table */
const defaultColumns: SpTableColumns = [
  {
    title: '操作',
    key: 'actions',
    fixed: 'right',
    render(row: any, i: number) {
      return h('div', { class: 'flex gap-x-1' }, [
        ...(props.extendActions?.before ? props.extendActions.before(row, i) : []),
        h(
          NButton,
          { type: 'primary', size: 'tiny', secondary: true, onClick: () => handleView(row) },
          { icon: renderIcon('carbon:view', { size: 14 }), default: () => '查看' },
        ),
        h(
          NButton,
          { type: 'default', size: 'tiny', secondary: true, onClick: () => handleUpdate(row) },
          { icon: renderIcon('carbon:edit', { size: 14 }), default: () => '编辑' },
        ),
        h(
          NButton,
          { type: 'error', size: 'tiny', secondary: true, onClick: () => handleDelete(row.id) },
          { icon: renderIcon('carbon:trash-can', { size: 14 }), default: () => '删除' },
        ),
        ...(props.extendActions?.after ? props.extendActions.after(row, i) : []),
      ])
    },
  },
]
const _columns = computed(() => (props.isCustomActions
  ? tableColumns
  : [
      { type: 'selection' },
      ...tableColumns.value,
      ...defaultColumns,
    ]) as SpTableColumns)

const tableAttrs = computed<DataTableProps>(() => ({
  rowKey: row => row?.id,
  onUpdateCheckedRowKeys: (keys: any[]) => checkedKeys.value = keys,
  ...props.tableProps,
}))

const queryParams = computed({
  get: () => props.queryParams,
  set: val => emits('update:queryParams', val),
})

function handleQuery() {
  $table.value.refresh()
}
function handleReset() {
  $table.value.handleReset()
}

defineExpose({
  handleQuery,
  handleReset,
  getCheckedKeys: () => checkedKeys.value,
  getFormData: () => form,
  // useCrud
  getFormTitle: () => formTitle.value,
  getFormAction: () => formAction.value,
  getFormVisible: () => formVisible.value,
  getFormLoading: () => formLoading.value,
  handleView,
  handleCreate,
  handleUpdate,
  handleDelete,
  handleCommit,
  handleCancel,
})
</script>

<template>
  <div>
    <!-- Search bar -->
    <n-space justify="space-between" rounded p-sm bg="$sp-main-bg-c">
      <n-space>
        <slot name="BarLeft" />
      </n-space>
      <n-space>
        <slot name="BeforeBtn" />
        <NButton secondary size="small" @click="handleReset">
          <template #icon>
            <TheIcon icon="carbon:reset" :size="16" />
          </template>
        </NButton>
        <NButton type="info" size="small" secondary @click="handleQuery">
          <template #icon>
            <TheIcon icon="carbon:search" :size="16" />
          </template>
        </NButton>
        <NButton v-if="handleBatchDelete" type="error" size="small" secondary @click="handleBatchDelete">
          <template #icon>
            <TheIcon icon="carbon:trash-can" :size="16" />
          </template>
        </NButton>
        <NButton type="primary" size="small" secondary @click="handleCreate">
          <template #icon>
            <TheIcon icon="ant-design:plus-outlined" :size="16" />
          </template>
        </NButton>
        <slot name="AfterBtn" />
      </n-space>
    </n-space>
    <div bg="$sp-main-bg-c" br-8 mt-xs rounded p-sm>
      <SpTable
        ref="$table"
        v-model:query-params="queryParams"
        :columns="_columns"
        :is-pagination="isPagination"
        :n-attrs="tableAttrs"
        :get-data="(isPagination ? apis.page : apis.list)!"
      />
    </div>
    <n-modal
      v-model:show="formVisible"
      class="w-600px!"
      preset="card"
      :title="formTitle"
      :auto-focus="false"
    >
      <SpForm
        ref="$form"
        v-model:model-value="form"
        :items="formItems"
        :disabled="formAction === 'view'"
      />
      <template #footer>
        <div flex justify-end gap-x-12>
          <NButton @click="handleCancel">
            取消
          </NButton>
          <NButton type="primary" :loading="formLoading" @click="handleCommit">
            提交
          </NButton>
        </div>
      </template>
    </n-modal>
  </div>
</template>

<style lang="scss" scoped>

</style>
