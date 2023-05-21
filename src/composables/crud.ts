import type { UseCrudParams } from '@/types'

const ACTIONS_TEXT = {
  create: '新增',
  update: '更新',
  view: '查看',
}

export declare type ActionKey = keyof typeof ACTIONS_TEXT

export const useCrud = ({
  title,
  formData,
  apis,
  refresh,
  validator,
  createParamsHandler = (params: any) => params,
  updateParamsHandler = (params: any) => params,
  viewValuesHandler = (values: any) => values,
}: UseCrudParams) => {
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
  function handleView(row: any) {
    formSwitch.open()
    formAction.value = 'view'
    Object.assign(formData, viewValuesHandler(row))
  }
  function handleUpdate(row: any) {
    formSwitch.open()
    formAction.value = 'update'
    Object.assign(formData, viewValuesHandler(row))
  }
  function handleCreate() {
    formSwitch.open()
    formAction.value = 'create'
    Object.assign(formData, defaultFormData)
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
        try {
          const { code, msg } = await apis.delete(id)
          if (code !== SUCCESS_CODE)
            throw new Error(msg)
          window.$message.success('删除成功')
          refresh()
        }
        catch (error: any) {
          window.$message.error(error.message || '删除失败，请稍后再试')
        }
        finally {
          msgLoading.destroy()
        }
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
      create: () => apis.create(createParamsHandler(formData)),
      update: () => apis.update(updateParamsHandler(formData)),
    }
    try {
      formSwitch.loading()
      const { code, msg } = await handler[formAction.value as keyof typeof handler]()
      if (code !== SUCCESS_CODE)
        throw new Error(msg)
      refresh()
      window.$message.success('提交成功')
      handleCancel()
    }
    catch (error: any) {
      window.$message.error(error.message || '提交失败')
    }
    finally {
      formSwitch.stop()
    }
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
