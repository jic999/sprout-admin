<script setup lang="ts">
import type { DataTableProps } from 'naive-ui'
import type { PropType } from 'vue'
import _ from 'lodash'

const props = defineProps({
  /* 获取data的 api */
  getData: {
    type: Function,
    required: true,
  },
  /* 是否分页 决定获取data的方式 */
  isPagination: {
    type: Boolean,
    default: true,
  },
  /* 查询参数 */
  queryParams: {
    type: Object,
    default: () => ({}),
  },
  /* 数据展示前 进行一些处理 */
  viewDataHandler: {
    type: Function as PropType<(data: any) => any>,
    default: (data: any) => data,
  },
  /* n-data-table参数 */
  tableAttrs: {
    type: Object as PropType<DataTableProps>,
    required: true,
  },
})
const emits = defineEmits(['update:queryParams'])

// * 指定分页查询响应字段
const PAGE_FIELD = 'records'
const TOTAL_FIELD = 'total'

// * 记录默认queryParams 用于reset
const initQueryParams = { ...props.queryParams }

const isLoading = ref(false)
const tableData = ref([])

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
})

async function handleQuery() {
  try {
    isLoading.value = true
    const { code, data, msg } = await props.getData({
      pageNo: pagination.page,
      pageSize: pagination.pageSize,
      ...props.queryParams,
    })
    if (code !== SUCCESS_CODE)
      throw new Error(msg)
    if (props.isPagination) {
      tableData.value = data[PAGE_FIELD]
      pagination.itemCount = data[TOTAL_FIELD]
    }
    else {
      tableData.value = data
      pagination.itemCount = data.length
    }
    tableData.value = props.viewDataHandler(tableData.value)
  }
  catch (error: any) {
    window.$message.error(error.message)
  }
  finally {
    isLoading.value = false
  }
}
function handleSearch() {
  pagination.page = 1
  handleQuery()
}

async function handleReset() {
  const resetParams = _.mapValues(props.queryParams, () => '')
  emits('update:queryParams', { ...resetParams, ...initQueryParams })
  await nextTick()
  pagination.page = 1
  handleQuery()
}

const defaultTableAttrs = computed<DataTableProps>(() => ({
  data: tableData.value,
  loading: isLoading.value,
  ...props.tableAttrs,
  // ? 若直接传给table-attrs 部分参数似乎没有效果
  // pagination: props.isPagination
  //   ? (props.tableAttrs.pagination ? { ...pagination, ...props.tableAttrs.pagination } : pagination)
  //   : undefined,
}))
/**
  * 分页
  * - 若开启分页且未传 pagination 则使用默认
  * - 若开启分页且传入 pagination 进行覆盖
  */
const paginationAttrs = computed(() => props.isPagination
  ? (props.tableAttrs.pagination ? { ...pagination, ...props.tableAttrs.pagination } : pagination)
  : undefined,
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
  <n-data-table v-bind="defaultTableAttrs" />
  <div v-if="paginationAttrs" mt-12 flex justify-end>
    <n-pagination v-bind="paginationAttrs" />
  </div>
</template>
