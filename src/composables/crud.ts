import { cloneDeep, omit } from 'lodash-es'
import type { UseCrudParams } from '@/types'
import { filterNegativeQuery } from '@/utils'

const ACTIONS_TEXT = {
  create: '新增',
  update: '更新',
  view: '查看',
}
export declare type ActionKey = keyof typeof ACTIONS_TEXT

export function useCrud<T extends Record<string, any> = any>({
  title,
  form,
  apis,
  refresh,
  validator,
  filters = { empty: true },
  hooks = {},
  getCheckedKeys,
}: UseCrudParams<T>) {
  const formVisible = ref(false)
  const formLoading = ref(false)
  const formAction = ref<ActionKey>('view')
  const formTitle = computed(() => ACTIONS_TEXT[formAction.value] + title)

  const defaultFormData = { ...form }

  const formSwitch = {
    open: () => formVisible.value = true,
    close: () => formVisible.value = false,
    loading: () => formLoading.value = true,
    stop: () => formLoading.value = false,
  }
  function setFormData(data: any) {
    Object.assign(form, data)
  }
  function handleView(row: any) {
    hooks.before && hooks.before(form)

    formAction.value = 'view'
    formSwitch.open()
    setFormData(row)
  }
  function handleUpdate(row: any) {
    hooks.before && hooks.before(form)

    formAction.value = 'update'
    formSwitch.open()
    setFormData(row)
  }
  function handleCreate() {
    hooks.before && hooks.before(form)

    formAction.value = 'create'
    formSwitch.open()
    Object.assign(form, defaultFormData)
    setFormData(defaultFormData)
  }
  function handleDelete(id: Number | String) {
    hooks.before && hooks.before(form)

    window.$dialog.warning({
      title: `删除${title}`,
      content: '确认删除？',
      positiveText: '确认',
      negativeText: '取消',
      autoFocus: false,
      onPositiveClick: async () => {
        const msgLoading = window.$message.loading('删除中', { duration: 0 })
        const { err } = await apis.delete(id)
        msgLoading.destroy()
        if (err) {
          window.$message.error(err.message || '删除失败，请稍后再试')
          return
        }
        window.$message.success('删除成功')
        refresh()
      },
    })
  }
  const handleBatchDelete = apis.batchDelete
    ? async (data?: any) => {
      // 若未传入 getCheckedKeys 和 data 或者 getCheckedKeys 和 data 都为空，则提示
      if ((!getCheckedKeys || !getCheckedKeys().length) && (!data || !data.length)) {
        window.$message.warning(`请选择需要删除的${title || '数据'}`)
        return
      }
      window.$dialog.warning({
        title: `批量删除${title}`,
        content: title ? `确认要删除选中的${title}？` : '确认要删除所有已选中项？',
        positiveText: '确认',
        negativeText: '取消',
        autoFocus: false,
        onPositiveClick: async () => {
          const msgLoading = window.$message.loading('删除中', { duration: 0 })
          const { err } = await apis.batchDelete!(getCheckedKeys!())
          msgLoading.destroy()
          if (err) {
            window.$message.error(err.message || '删除失败，请稍后再试')
            return
          }
          window.$message.success('删除成功')
          refresh()
        },
      })
    }
    : undefined

  async function handleCommit() {
    if (formAction.value === 'view')
      return handleCancel()
    const validateError = await validator.validate()
    if (validateError)
      return
      // # 过滤字段
    let _form = cloneDeep(form) as any
    if (filters) {
      // - filter negative fields
      _form = filterNegativeQuery(_form, filters)
      // - filter not required fields
      const filterFields = filters[formAction.value as keyof typeof filters] as string[]
      if (filterFields)
        _form = omit(_form, filterFields)
    }
    const handler = {
      create: async () => apis.create(_form),
      update: async () => apis.update(_form),
    }
    formSwitch.loading()
    const { err } = await handler[formAction.value]()
    formSwitch.stop()
    if (err) {
      window.$message.error(err.message || '提交失败')
      return
    }
    refresh()
    window.$message.success('提交成功')
    handleCancel()
  }
  function handleCancel() {
    formSwitch.close()
  }
  return {
    formVisible,
    formLoading,
    formTitle,
    formAction,
    handleView,
    handleUpdate,
    handleCreate,
    handleDelete,
    handleBatchDelete,
    handleCommit,
    handleCancel,
  }
}
