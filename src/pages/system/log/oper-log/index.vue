<script setup lang="ts">
import { type DataTableColumns, NTag } from 'naive-ui'

defineOptions({
  name: 'OperLog',
})

const columns: DataTableColumns = [
  {
    title: 'id',
    key: 'id',
  },
  {
    title: '标题',
    key: 'title',
  },
  {
    title: '业务类型',
    key: 'businessType',
    render(row) {
      return h(NTag, { type: 'warning', class: 'op-90' }, () => row.businessType)
    },
  },
  {
    title: '方法名称',
    key: 'method',
    width: 200,
    ellipsis: { tooltip: true, lineClamp: 1 },
  },
  {
    title: '请求类型',
    key: 'requestMethod',
  },
  {
    title: '操作类别',
    key: 'operType',
  },
  {
    title: '操作人员',
    key: 'operName',
    render(row) {
      return h(NTag, { type: 'info', class: 'op-90' }, () => row.operName)
    },
  },
  {
    title: '操作ip',
    key: 'operIp',
    width: 160,
  },
  {
    title: '操作参数',
    key: 'operParam',
    width: 200,
    render(row) {
      return h('div',
        {
          onClick: () => showViewModal(row.operParam),
          class: 'cursor-pointer',
          innerText: row.operParam,
        },
      )
    },
    ellipsis: { lineClamp: 1, tooltip: false },
  },
  {
    title: '响应结果',
    key: 'jsonResult',
    width: 200,
    render(row) {
      return h('div',
        {
          onClick: () => showViewModal(row.jsonResult),
          class: 'cursor-pointer',
          innerText: row.jsonResult,
        },
      )
    },
    ellipsis: { lineClamp: 1, tooltip: false },
  },
  {
    title: '操作结果',
    key: 'status',
    render(row) {
      return h(NTag,
        { type: row.status ? 'error' : 'success' },
        () => row.status ? '失败' : '成功')
    },
  },
  {
    title: '错误消息',
    key: 'errorMsg',
  },
  {
    title: '操作时间',
    key: 'operTime',
    width: 240,
    ellipsis: { lineClamp: 1 },
  },
]

const viewModalVisible = ref(false)
const viewContent = ref('')

function showViewModal(content: any) {
  viewModalVisible.value = true
  viewContent.value = content
}
function copyViewContent() {
  window.navigator.clipboard.writeText(viewContent.value)
    .then(() => {
      window.$message.success('复制成功')
    })
}

const queryFieldsOptions = [
  {
    label: '用户名',
    value: 'username',
  },
  {
    label: '操作结果',
    value: 'status',
    placeholder: '0表示成功，1表示失败',
  },
]
const queryParams = ref({
  field: 'username',
  keyword: '',
})
</script>

<template>
  <div>
    <SmartCrud
      v-model:query-params="queryParams"
      :apis="operLogApi"
      :columns="columns"
      :query-fields-options="queryFieldsOptions"
      :smart-table="{
        tableAttrs: {
          scrollX: 1800,
          pagination: {
            pageSize: 10,
          },
        },
      }"
    />
    <n-modal
      v-model:show="viewModalVisible"
      class="w-600"
      preset="card"
      title="预览"
      :show-icon="false"
      :auto-focus="false"
    >
      {{ viewContent }}
      <template #footer>
        <div flex justify-end gap-x-12>
          <NButton type="primary" secondary @click="copyViewContent">
            复制
          </NButton>
        </div>
      </template>
    </n-modal>
  </div>
</template>
