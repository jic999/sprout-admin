<script setup lang="ts">
import { type DataTableProps } from 'naive-ui'
import { mapValues, pickBy } from 'lodash-es'
import type { SpTableProps } from '@/types'
import { isBlank } from '@/utils'

const props = withDefaults(defineProps<SpTableProps>(), {
  isPagination: false,
})
// ! 绑定值必须使用 ref 而不是 reactive
const emits = defineEmits(['update:queryParams'])
/* 指定分页查询响应字段 */
const PAGE_FIELD = 'list'
const TOTAL_FIELD = 'total'

/* 记录默认queryParams 用于reset */
const initQueryParams = { ...props.queryParams }

const isLoading = ref(false)
const tableData = ref([])

/* 默认分页设置 可被覆盖  */
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
  ...props.nAttrs?.pagination,
})

async function handleQuery() {
  isLoading.value = true
  const { err, data } = await props.getData(
    pickBy({
      page: pagination.page,
      pageSize: pagination.pageSize,
      ...props.queryParams,
    }, val => !isBlank(val)))
  isLoading.value = false
  if (err) {
    window.$message.error(err.message)
    return
  }
  if (props.isPagination) {
    tableData.value = data[PAGE_FIELD]
    pagination.itemCount = data[TOTAL_FIELD]
  }
  else {
    tableData.value = data
    pagination.itemCount = data.length
  }
}
function handleSearch() {
  pagination.page = 1
  handleQuery()
}
async function handleReset() {
  const resetParams = mapValues(props.queryParams, () => '')
  emits('update:queryParams', { ...resetParams, ...initQueryParams })
  await nextTick()
  pagination.page = 1
  handleQuery()
}

// 用于构建页面时快速进行预览 实际开发请传入自定义Columns
const defaultColumns = computed(() => (props.columns
  ? []
  : (tableData.value.length ? Object.keys(tableData.value[0]).map(key => ({ key, title: key })) : [])),
)
const tableAttrs = computed<DataTableProps>(() => ({
  data: tableData.value,
  columns: (props.columns || defaultColumns.value),
  loading: isLoading.value,
  ...props.nAttrs,
  // ? 若直接传给table-attrs 部分参数似乎没有效果
  // pagination: props.isPagination
  //   ? (props.nAttrs.pagination ? { ...pagination, ...props.nAttrs.pagination } : pagination)
  //   : undefined,
}))

/**
  * 分页
  * - 若开启分页且未传 pagination 则使用默认
  * - 若开启分页且传入 pagination 进行覆盖
  */
const paginationAttrs = computed(
  () => props.isPagination ? pagination : undefined,
)

onMounted(() => {
  handleQuery()
})

defineExpose({
  refresh: () => handleQuery(),
  handleSearch,
  handleReset,
})
</script>

<template>
  <n-data-table
    :pagination="false"
    v-bind="tableAttrs"
  />
  <div v-if="paginationAttrs" mt-12 flex justify-end>
    <n-pagination v-bind="paginationAttrs" />
  </div>
</template>
