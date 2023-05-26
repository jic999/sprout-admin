<script setup lang="ts">
import type { DataTableColumns, FormItemRule, InputNumberProps, InputProps, SwitchProps, UploadFileInfo, UploadProps } from 'naive-ui'
import { NButton, NTag } from 'naive-ui'
import _ from 'lodash'
import type { CrudExtendAction, CrudParamsHandler, CrudParamsHandlers } from '@/types'
import { defFormItems } from '@/types'
import { getResourceUrl, getToken, renderIcon } from '@/utils'

defineOptions({
  name: 'SystemUser',
})

/* Form */
const ACTION = 'http://localhost:1666/file/upload'
const avatarFinish = ({ file, event }: { file: UploadFileInfo; event?: ProgressEvent }) => {
  const { code, data } = (event?.target as XMLHttpRequest).response
  if (code !== SUCCESS_CODE)
    window.$message.error('上传失败，请稍候再试')
  file.url = getResourceUrl(data)
}
const formItems = defFormItems({
  id: {
    label: 'id',
    value: null,
    type: 'NumberInput',
    attrs: { disabled: true, placeholder: '自动' } as InputNumberProps,
  },
  username: {
    label: '用户名',
    value: '',
    type: 'Input',
    rule: {
      required: true,
      min: 5,
      trigger: 'blur',
      message: '请输入用户名，长度在5字符以上',
    },
  },
  name: {
    label: '姓名',
    value: '',
    type: 'Input',
    rule: {
      required: true,
      min: 2,
      trigger: 'blur',
      message: '请输入姓名，长度在2字符以上',
    },
  },
  avatar: {
    label: '头像',
    value: [],
    type: 'Upload',
    attrs: {
      listType: 'image-card',
      action: ACTION,
      headers: {
        Authorization: getToken(),
      },
      max: 1,
      accept: 'image/*',
      onFinish: avatarFinish,
    } as UploadProps,
    rule: {
      trigger: 'change',
      validator(rule: FormItemRule, val: UploadFileInfo[]) {
        if (val.length < 1)
          return new Error('请上传头像')
      },
    },
  },
  phone: {
    label: '手机号码',
    value: '',
    type: 'Input',
    rule: {
      len: 11,
      trigger: 'blur',
      message: '手机号长度为11位',
    },
  },
  description: {
    label: '介绍',
    value: '',
    type: 'Input',
    attrs: { type: 'textarea' } as InputProps,
  },
  status: {
    label: '状态',
    value: 0,
    type: 'Switch',
    attrs: { checkedValue: 0, uncheckedValue: 1 } as SwitchProps,
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
    _params.avatar = _params.avatar[0]?.url
    return _params
  },
  updateParamsHandler: (params) => {
    const _params = _.omit(params, ['createTime', 'updateTime'])
    _params.avatar = _params.avatar[0]?.url
    return _params
  },
}
const valuesHandler: CrudParamsHandler<typeof formItems> = (values) => {
  return { ...values, avatar: values.avatar ? [{ url: values.avatar, status: 'finished' }] as UploadFileInfo[] : [] }
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
    title: '介绍',
    key: 'description',
    width: 200,
    render(row) {
      return h('p', { class: 'ellipsis-1' }, row.description as string || '无')
    },
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
]

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

/* 分配角色 */
const roleModalVisible = ref(false)
const roleOptions = ref<{ label: string; value: string }[]>([])
const roleIds = ref<number[]>([])
const roleBtnLoading = ref(false)
const roleModalLoading = ref(false)
let currentRoleRow: any = null

async function showRoleModal(row: any) {
  roleModalVisible.value = true
  roleModalLoading.value = true
  currentRoleRow = row

  const { data } = await roleApi.rolesByUserId(row.id)
  roleIds.value = data.map((item: any) => item.id)
  console.log('data :>> ', data)
  console.log('roleIds.value :>> ', roleIds.value)
  roleModalLoading.value = false
}
function closeRoleModal() {
  roleModalVisible.value = false
}
async function handleRoleConfirm() {
  roleBtnLoading.value = true
  try {
    // TODO 分配角色
    const params = { userId: currentRoleRow.id, roleIds: roleIds.value }
    const { code, msg } = await roleApi.assign(params)
    if (code !== 0)
      throw new Error(msg)
    window.$message.success('分配成功')
    closeRoleModal()
  }
  catch (error) {
    window.$message.error((error as Error).message)
  }
  finally {
    roleBtnLoading.value = false
  }
}
async function getRoleOptions() {
  const { data } = await roleApi.list()
  roleOptions.value = data.map((role: any) => ({ label: role.roleName, value: role.id }))
}

const extendActionsAfter: CrudExtendAction = (row: any) => {
  return [
    h(NButton, { size: 'tiny', type: 'info', secondary: true, onClick: () => showRoleModal(row) }, {
      default: () => '分配角色',
      icon: renderIcon('carbon:flow', { size: 14 }),
    }),
  ]
}

onMounted(() => {
  getRoleOptions()
})
</script>

<template>
  <div>
    <SmartCrud
      v-model:query-params="queryParams"
      title="用户管理"
      entity-name="用户"
      :params-handler="paramsHandler"
      :values-handler="valuesHandler"
      :columns="columns"
      :form-items="formItems"
      :apis="userApi"
      :query-fields-options="queryFieldsOptions"
      :extend-actions-after="extendActionsAfter"
    />
    <n-spin :show="roleModalLoading">
      <n-modal
        v-model:show="roleModalVisible"
        class="w-600"
        preset="card"
        title="分配角色"
        :show-icon="false"
        :auto-focus="false"
        @positive-click="handleRoleConfirm"
      >
        <n-checkbox-group v-model:value="roleIds" class="grid grid-cols-4 py-24 gap-12">
          <n-checkbox v-for="role in roleOptions" :key="role.value" :value="role.value" :label="role.label" />
        </n-checkbox-group>
        <template #footer>
          <div flex justify-end gap-x-12>
            <NButton @click="closeRoleModal">
              取消
            </NButton>
            <NButton type="primary" :loading="roleBtnLoading" @click="handleRoleConfirm">
              提交
            </NButton>
          </div>
        </template>
      </n-modal>
    </n-spin>
  </div>
</template>
