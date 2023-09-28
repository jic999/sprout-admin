<script setup lang="ts">
import type { TableColumns } from 'naive-ui/es/data-table/src/interface'
import { sysUserApi } from '@/apis/system/user'
import { sysRoleApi } from '@/apis/system/role'

defineOptions({
  name: 'AssignRole',
})

const route = useRoute()
const router = useRouter()

const $table = ref()
const form = ref()
const loading = ref(false)

const defaultCheckedRowKeys = ref<number[]>()
const columns = reactive<TableColumns>([
  { type: 'selection' },
  { title: 'id', key: 'id' },
  { title: '角色名称', key: 'name' },
  { title: '角色描述', key: 'desc' },
  { title: '创建时间', key: 'createTime' },
])

async function getData() {
  // 获取用户信息
  const { err, data } = await sysUserApi.getWithRoles(route.params.userId)
  if (err) {
    window.$message.error(err.message)
    return
  }
  form.value = data
  defaultCheckedRowKeys.value = data.roles.map((item: any) => item.id)
}
async function handleCommit() {
  const roleIds = $table.value.getCheckedKeys() as number[]
  loading.value = true
  const { err } = await sysUserApi.assignRoles({ id: form.value.id, roleIds })
  loading.value = false
  if (err) {
    window.$message.error(err.message)
    return
  }
  window.$message.success('操作成功')
  refreshSS.set(true)
  router.back()
}

onBeforeMount(() => {
  getData()
})
</script>

<template>
  <PageMain>
    <section mb-8px sp-section>
      <n-form :model="form" label-placement="left" :show-feedback="false">
        <n-grid v-if="form" :x-gap="24">
          <n-form-item-gi :span="8" label="用户id" path="id">
            <n-input v-model:value="form.id" disabled />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="用户名" path="username">
            <n-input v-model:value="form.username" disabled />
          </n-form-item-gi>
          <n-form-item-gi :span="8" label="用户昵称" path="nickname">
            <n-input v-model:value="form.nickname" disabled />
          </n-form-item-gi>
        </n-grid>
      </n-form>
    </section>
    <section sp-section>
      <SpTable
        v-if="defaultCheckedRowKeys"
        ref="$table"
        :get-data="sysRoleApi.list"
        :columns="columns"
        :row-key="row => row.id"
        :default-checked-row-keys="defaultCheckedRowKeys"
      />
      <n-empty v-else description="暂无数据" />
      <div mt-xl flex-center gap-x-lg>
        <n-button type="primary" :loading="loading" @click="handleCommit">提交</n-button>
        <n-button @click="router.back">返回</n-button>
      </div>
    </section>
  </PageMain>
</template>
