<script setup lang="ts">
import type { DataTableProps, PaginationProps } from 'naive-ui'
import { isArray } from 'lodash-es'
import type { InternalRowData, RowKey } from 'naive-ui/es/data-table/src/interface'
import { filterNegativeQuery } from '@/utils'
import { spTableProps } from '@/types'

const props = defineProps(spTableProps)

// ! 绑定值必须使用 ref 而不是 reactive
const emits = defineEmits(['update:queryParams'])

/* 指定分页查询响应字段 */
const PAGE_FIELD = 'list'
const TOTAL_FIELD = 'total'

// 默认queryParams 用于重置
const initQueryParams = { ...props.queryParams }
const loading = ref(false)
const tableData = ref([])
// ? 若分页信息直接传给table-attrs 部分参数似乎没有效果 故自定义分页
// 默认分页配置 可被覆盖
const pagination = reactive({
  page: 1,
  pageSize: 5,
  showSizePicker: true,
  pageSizes: [5, 10, 15, 20, 25],
  itemCount: 0,
  onUpdatePage: (page: number) => {
    pagination.page = page
    handleQuery()
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize
    pagination.page = 1
    handleQuery()
  },
  ...props.pagination,
})

const paginationAttrs = computed(
  () => (props.isPagination ? pagination : undefined) as PaginationProps,
)

async function handleQuery() {
  loading.value = true
  // TODO 选择传入 filterNegativeQuery options
  const queryParams = props.queryParams ? filterNegativeQuery(props.queryParams) : undefined
  const query = props.isPagination
    ? { page: pagination.page, pageSize: pagination.pageSize, ...queryParams }
    : queryParams
  const { err, data } = await props.getData!(query)
  loading.value = false
  if (err) {
    $message.error(err.message)
    return
  }
  if (props.isPagination) {
    tableData.value = data[PAGE_FIELD]
    pagination.itemCount = data[TOTAL_FIELD]
  }
  else {
    tableData.value = props.voHandler(data) as any
    pagination.itemCount = data.length
  }
}
function handleSearch() {
  pagination.page = 1
  handleQuery()
}
async function handleReset() {
  emits('update:queryParams', { ...initQueryParams })
  await nextTick()
  pagination.page = 1
  handleQuery()
}

// # 收集 checkedKeys 手动回调
const checkedKeys = ref<any[]>([])
function handleUpdateCheckedRowKeys(
  keys: RowKey[],
  rows: InternalRowData[],
  meta: {
    row: InternalRowData | undefined
    action: 'check' | 'uncheck' | 'checkAll' | 'uncheckAll'
  },
) {
  checkedKeys.value = keys
  if (props.onUpdateCheckedRowKeys) {
    if (isArray(props.onUpdateCheckedRowKeys))
      props.onUpdateCheckedRowKeys.forEach(fn => fn(keys, rows, meta))
    else
      props.onUpdateCheckedRowKeys(keys, rows, meta)
  }
}

// tip: 用于构建页面时快速进行预览 实际开发请传入自定义Columns
const tableColumns = computed(() => (
  props.columns
  || (tableData.value.length ? Object.keys(tableData.value[0]).map(key => ({ key, title: key })) : [])),
)

const isLoading = computed(() => loading.value || props.loading)

const _tableAttrs = computed<DataTableProps>(() => ({
  ...props,
  data: tableData.value,
  columns: tableColumns.value,
  loading: isLoading.value,
  onUpdateCheckedRowKeys: handleUpdateCheckedRowKeys,
}))

onMounted(() => {
  handleQuery()
})

defineExpose({
  data: tableData,
  refresh: () => handleQuery(),
  handleSearch,
  handleReset,
  getCheckedKeys: () => checkedKeys.value,
  getData: () => tableData.value,
})
</script>

<template>
  <div>
    <div v-if="!props.lazyShow || tableData.length">
      <n-data-table v-bind="_tableAttrs" :loading="isLoading" />
      <div v-if="paginationAttrs" mt-lg flex justify-end>
        <n-pagination v-bind="paginationAttrs" />
      </div>
    </div>
    <div v-else flex-center p-sm>
      <n-spin size="medium" />
    </div>
  </div>
</template>
