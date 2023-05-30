<script setup lang="ts">
import { type DataTableColumns, type InputNumberProps, NButton, NTag } from 'naive-ui'
import _ from 'lodash'
import type { CrudExtendAction, CrudParamsHandlers } from '@/types'
import { defFormItems } from '@/types'
import { filterPermMenus, getMenuList, renderIcon } from '@/utils'

defineOptions({
  name: 'SystemRole',
})

const formItems = defFormItems({
  id: {
    label: 'id',
    value: null,
    type: 'NumberInput',
    attrs: { disabled: true, placeholder: '自动' } as InputNumberProps,
  },
  roleName: {
    label: '角色名称',
    value: '',
    type: 'Input',
    rule: {
      required: true,
      min: 2,
      trigger: 'blur',
      message: '角色名称长度在2字符以上',
    },
  },
  roleCode: {
    label: '角色标识',
    value: '',
    type: 'Input',
    rule: {
      required: true,
      min: 4,
      trigger: 'blur',
      message: '角色标识长度在2字符以上',
    },
  },
  description: {
    label: '描述',
    value: '',
    type: 'Input',
    attrs: { type: 'textarea' },
  },
  createTime: {
    label: '创建时间',
    value: '',
    type: 'Input',
    attrs: { disabled: true, placeholder: '自动' },
  },
  updateTime: {
    label: '更新时间',
    value: '',
    type: 'Input',
    attrs: { disabled: true, placeholder: '自动' },
  },
})
const paramsHandler: CrudParamsHandlers<typeof formItems> = {
  createParamsHandler: (params) => {
    const _params = _.omit(params, ['id', 'createTime', 'updateTime'])
    return _params
  },
  updateParamsHandler: (params) => {
    const _params = _.omit(params, ['createTime', 'updateTime'])
    return _params
  },
}

const columns: DataTableColumns = [
  {
    title: 'id',
    key: 'id',
  }, {
    title: '角色名称',
    key: 'roleName',
    render(row: any) {
      return h(NTag, { type: 'primary' }, () => row.roleName)
    },
  }, {
    title: '角色标识',
    key: 'roleCode',
  }, {
    title: '描述',
    key: 'description',
  }, {
    title: '创建时间',
    key: 'createTime',
  }, {
    title: '更新时间',
    key: 'updateTime',
  },
]
const queryFieldsOptions = [
  {
    label: '角色名称',
    value: 'roleName',
  }, {
    label: '角色标识',
    value: 'roleCode',
  },
]
const queryParams = ref({
  field: 'roleName',
  keyword: '',
})

/* 分配权限 */
const menuModalVisible = ref(false)
const menuIds = ref<number[]>([])
const menuBtnLoading = ref(false)
const menuModalLoading = ref(false)
let currentMenuRow: any = null

const menuOptions = ref()

async function showRoleModal(row: any) {
  menuModalVisible.value = true
  menuModalLoading.value = true
  currentMenuRow = row

  const { data } = await roleApi.menus(row.id)
  menuIds.value = data.map((item: any) => item.id)
  menuModalLoading.value = false
}
function closeRoleModal() {
  menuModalVisible.value = false
  menuIds.value = []
}
async function handleRoleConfirm() {
  menuBtnLoading.value = true
  try {
    const params = { roleId: currentMenuRow.id, menuIds: menuIds.value }
    const { code, msg } = await roleApi.assignMenus(params)
    if (code !== 0)
      throw new Error(msg)
    window.$message.success('分配成功')
    closeRoleModal()
  }
  catch (error) {
    window.$message.error((error as Error).message)
  }
  finally {
    menuBtnLoading.value = false
  }
}
async function getMenuOptions() {
  const { data } = await menuApi.list()
  const permMenus = getMenuList(filterPermMenus(data))
  menuOptions.value = permMenus
}

const extendActionsAfter: CrudExtendAction = (row: any) => {
  return [
    h(NButton, { size: 'tiny', type: 'info', secondary: true, onClick: () => showRoleModal(row) }, {
      default: () => '分配权限',
      icon: renderIcon('carbon:flow', { size: 14 }),
    }),
  ]
}

onMounted(() => {
  getMenuOptions()
})
</script>

<template>
  <div>
    <SmartCrud
      v-model:query-params="queryParams"
      title="角色管理"
      entity-name="角色"
      :columns="columns"
      :form-items="formItems"
      :apis="roleApi"
      :params-handler="paramsHandler"
      :query-fields-options="queryFieldsOptions"
      :extend-actions-after="extendActionsAfter"
    />
    <n-modal
      v-model:show="menuModalVisible"
      class="w-600"
      preset="card"
      title="分配权限"
      :show-icon="false"
      :auto-focus="false"
      @positive-click="handleRoleConfirm"
    >
      <n-spin :show="menuModalLoading">
        <n-tree
          v-model:checked-keys="menuIds"
          :data="menuOptions"
          label-field="title"
          key-field="id"
          check-strategy="child"
          default-expand-all multiple cascade checkable clearable
        />
      </n-spin>

      <template #footer>
        <div flex justify-end gap-x-12>
          <NButton @click="closeRoleModal">
            取消
          </NButton>
          <NButton type="primary" :loading="menuBtnLoading" :disabled="menuModalLoading" @click="handleRoleConfirm">
            提交
          </NButton>
        </div>
      </template>
    </n-modal>
  </div>
</template>
