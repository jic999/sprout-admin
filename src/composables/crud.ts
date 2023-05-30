import _ from 'lodash'
import type { UseCrudParams } from '@/types'

const ACTIONS_TEXT = {
  create: '新增',
  update: '更新',
  view: '查看',
}
// TODO 排除字段
export declare type ActionKey = keyof typeof ACTIONS_TEXT

export const useCrud = ({
  title,
  formData,
  apis,
  refresh,
  validator,
  excludeFields = {},
  createParamsHandler = (params: any) => params,
  updateParamsHandler = (params: any) => params,
  viewValuesHandler = (values: any) => values,
  beforeFormShow,
  afterFormShow,
  beforeCommit,
  commitSuccess,
  commitFail,
  afterCommit,
}: UseCrudParams) => {
  const formVisible = ref(false)
  const formLoading = ref(false)
  const formAction = ref<ActionKey>('view')
  const formTitle = computed(() => ACTIONS_TEXT[formAction.value] + title)

  const defaultFormData = { ...formData }
  const formSwitch = {
    open: (row?: any) => {
      beforeFormShow && beforeFormShow({ row, action: formAction.value })
      formVisible.value = true
      afterFormShow && nextTick(() => afterFormShow({ row, action: formAction.value }))
    },
    close: () => formVisible.value = false,
    loading: () => formLoading.value = true,
    stop: () => formLoading.value = false,
  }
  function handleView(row: any) {
    formAction.value = 'view'
    formSwitch.open(row)
    Object.assign(formData, viewValuesHandler(row))
  }
  function handleUpdate(row: any) {
    formAction.value = 'update'
    formSwitch.open(row)
    Object.assign(formData, viewValuesHandler(row))
  }
  function handleCreate() {
    formAction.value = 'create'
    formSwitch.open()
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
        beforeCommit && beforeCommit()
        try {
          const { code, msg } = await apis.delete(id)
          if (code !== SUCCESS_CODE)
            throw new Error(msg)
          window.$message.success('删除成功')
          refresh()
          commitSuccess && commitSuccess()
        }
        catch (error: any) {
          window.$message.error(error.message || '删除失败，请稍后再试')
          commitFail && commitFail()
        }
        finally {
          afterCommit && afterCommit()
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
      create: async () => apis.create(await createParamsHandler(omitFields(formData, excludeFields.create))),
      update: async () => apis.update(await updateParamsHandler(omitFields(formData, excludeFields.update))),
    }
    beforeCommit && beforeCommit()
    try {
      formSwitch.loading()
      const { code, msg } = await handler[formAction.value as keyof typeof handler]()
      if (code !== SUCCESS_CODE)
        throw new Error(msg)
      refresh()
      window.$message.success('提交成功')
      handleCancel()
      commitSuccess && commitSuccess()
    }
    catch (error: any) {
      window.$message.error(error.message || '提交失败')
      commitFail && commitFail()
    }
    finally {
      formSwitch.stop()
      afterCommit && afterCommit()
    }
  }
  function handleCancel() {
    formSwitch.close()
  }
  function omitFields(data: object, fields: string[] | undefined) {
    if (!fields || fields.length === 0)
      return data
    return _.omit(data, fields)
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
