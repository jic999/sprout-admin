import type { UseCrudParams } from '@/types'

const ACTIONS_TEXT = {
  create: '新增',
  update: '更新',
  view: '查看',
}
export declare type ActionKey = keyof typeof ACTIONS_TEXT

export function useCrud({
  title,
  formData,
  apis,
  refresh,
  validator,
}: UseCrudParams) {
  const formVisible = ref(false)
  const formLoading = ref(false)
  const formAction = ref<ActionKey>('view')
  const formTitle = computed(() => ACTIONS_TEXT[formAction.value] + title)

  const defaultFormData = { ...formData }

  const formSwitch = {
    open: () => formVisible.value = true,
    close: () => formVisible.value = false,
    loading: () => formLoading.value = true,
    stop: () => formLoading.value = false,
  }
  function setFormData(data: any) {
    Object.assign(formData, data)
  }
  function handleView(row: any) {
    formAction.value = 'view'
    formSwitch.open()
    setFormData(row)
  }
  function handleUpdate(row: any) {
    formAction.value = 'update'
    formSwitch.open()
    setFormData(row)
  }
  function handleCreate() {
    formAction.value = 'create'
    formSwitch.open()
    Object.assign(formData, defaultFormData)
    setFormData(defaultFormData)
  }
  function handleDelete(id: Number | String) {
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
  async function handleCommit() {
    if (formAction.value === 'view')
      return handleCancel()
    const validateError = await validator.validate()
    if (validateError)
      return
    const handler = {
      create: async () => apis.create(formData),
      update: async () => apis.update(formData),
    }
    formSwitch.loading()
    const { err } = await handler[formAction.value as keyof typeof handler]()
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
    handleCommit,
    handleCancel,
  }
}
