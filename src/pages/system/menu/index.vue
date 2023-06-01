<script setup lang="ts">
import type { CascaderOption, SelectOption } from 'naive-ui'
import { NEllipsis, NSwitch, NTag } from 'naive-ui'
import { icons as epIcons } from '@iconify-json/ep'
import { icons as cbIcons } from '@iconify-json/carbon'
import type { CrudExcludeFormFields, MenuItem } from '@/types'
import { defCrudItems } from '@/types'
import TheIcon from '@/components/icon/TheIcon.vue'
import { routeComponents } from '@/router'
import { getMenuList } from '@/utils'
import { useMenuStore } from '@/stores/menu'

defineOptions({
  name: 'SystemMenu',
})

const componentOptions = routeComponents.map(item => ({ label: item.name, value: item.name }))

const iconOptions = Object.keys(epIcons.icons).map(icon => ({ icon: `ep:${icon}` }))
  .concat(Object.keys(cbIcons.icons).map(icon => ({ icon: `carbon:${icon}` })))

function renderIconSelectLabel(option: any) {
  return h('div', { class: 'flex items-center gap-x-12' }, [
    h(TheIcon, { icon: option.icon, size: 20 }),
    h('div', { innerText: option.icon }),
  ])
}

const crudItems = reactive(defCrudItems({
  id: {
    title: 'id',
    formItem: {
      type: 'NumberInput',
      value: null,
      attrs: { disabled: true, placeholder: '自动' },
    },
  },
  title: {
    title: '标题',
    formItem: {
      type: 'Input',
      value: '',
    },
  },
  parentId: {
    title: '上级菜单',
    formItem: {
      type: 'Cascader',
      value: null,
      options: [],
      attrs: {
        valueField: 'id',
        labelField: 'title',
        clearable: true,
        placeholder: '选择上级菜单，一级菜单无需选择',
      },
    },
  },
  name: {
    title: '名称',
    formItem: {
      type: 'Input',
      value: '',
      attrs: { placeholder: '请输入名称，首字母需大写' },
    },
  },
  path: {
    title: '路径',
    formItem: {
      type: 'Input',
      value: '',
      attrs: { placeholder: '一级菜单带 /，其他不带' },
    },
    tableColumn: {
      width: 120,
      render: row => h(NEllipsis, { class: 'w-120', lineClamp: 1 }, () => row.path),
    },
  },
  icon: {
    title: '图标',
    formItem: {
      type: 'Select',
      value: null,
      options: iconOptions,
      attrs: {
        labelField: 'icon',
        valueField: 'icon',
        renderLabel: renderIconSelectLabel,
        filterable: true,
      },
    },
    tableColumn: {
      render(row: any) {
        return h(TheIcon, { icon: row.icon, size: 20 })
      },
    },
  },
  component: {
    title: '组件',
    formItem: {
      type: 'Select',
      value: null,
      options: componentOptions as SelectOption[],
      attrs: { clearable: true },
    },
    tableColumn: {
      render(row) {
        if (row.component)
          return h(NTag, { type: 'info' }, () => row.component)
      },
    },
  },
  perm: {
    title: '权限标识',
    formItem: {
      type: 'Input',
      value: null,
      attrs: { placeholder: '权限标识，若为空则无需权限即可访问' },
    },
  },
  redirect: {
    title: '重定向',
    formItem: {
      type: 'Input',
      value: '',
      attrs: { placeholder: '完整路径' },
    },
    tableColumn: {
      width: 120,
      render: row => h(NEllipsis, { class: 'w-120', lineClamp: 1 }, () => row.redirect),
    },
  },
  orderNum: {
    title: '排序',
    formItem: {
      type: 'NumberInput',
      value: null,
    },
  },
  keepAlive: {
    title: '页面缓存',
    formItem: {
      value: 0,
      type: 'Switch',
      attrs: { checkedValue: 1, uncheckedValue: 0 },
    },
    tableColumn: {
      render(row: any) {
        return h(NSwitch, { value: row.keepAlive, checkedValue: 1, defaultValue: 0 })
      },
    },
  },
  status: {
    title: '状态',
    formItem: {
      value: 0,
      type: 'Switch',
      attrs: { checkedValue: 0, uncheckedValue: 1 },
    },
    tableColumn: {
      render(row) {
        if (row.status === 0)
          return h(NTag, { type: 'success' }, () => '启用')
        return h(NTag, { type: 'warning' }, () => '禁用')
      },
    },
  },
  isSingle: {
    title: '强制单项',
    formItem: {
      value: 0,
      type: 'Switch',
      attrs: { checkedValue: 1, uncheckedValue: 0 },
    },
    tableColumn: {
      render(row: any) {
        return h(NSwitch, { value: row.isSingle, checkedValue: 1, defaultValue: 0 })
      },
    },
  },
  activeMenu: {
    title: '激活菜单',
    formItem: {
      value: null,
      type: 'Input',
      attrs: { placeholder: '可选' },
    },
  },
  noTag: {
    title: '隐藏标签',
    formItem: {
      value: 0,
      type: 'Switch',
      attrs: { checkedValue: 1, uncheckedValue: 0 },
    },
    tableColumn: {
      render(row: any) {
        return h(NSwitch, { value: row.noTag, checkedValue: 1, defaultValue: 0 })
      },
    },
  },
  createTime: {
    title: '创建时间',
    formItem: {
      value: '',
      type: 'Input',
      attrs: { disabled: true, placeholder: '自动' },
    },
  },
  updateTime: {
    title: '更新时间',
    formItem: {
      value: '',
      type: 'Input',
      attrs: { disabled: true, placeholder: '自动' },
    },
  },
}))

let menuOptions: MenuItem[] | null = null
function viewDataHandler(data: MenuItem[]) {
  const result = getMenuList(data)
  menuOptions = result
  return result
}
async function beforeFormShow({ row, action }: any) {
  if (action === 'update' && row) {
    const { err, data } = await menuApi.optionsById(row.id)
    if (err) {
      window.$message.error(err.message)
      return
    }
    const options = getMenuList(data)
    crudItems.parentId.formItem.options = options as unknown as CascaderOption[]
  }
  else {
    crudItems.parentId.formItem.options = menuOptions as unknown as CascaderOption[]
  }
}

const excludeFields: CrudExcludeFormFields = {
  create: ['id', 'createTime', 'updateTime'],
  update: ['createTime', 'updateTime'],
}

const menuStore = useMenuStore()

function beforeCommit() {
  console.log('useCrud hook ======> beforeCommit')
}
function afterCommit() {
  menuStore.refreshMenuOptions()
  console.log('useCrud hook ======> afterCommit')
}
function commitSuccess() {
  console.log('useCrud hook ======> commitSuccess')
  // window.location.reload()
}
function commitFail() {
  console.log('useCrud hook ======> commitFail')
}
</script>

<template>
  <SmartCrud
    title="菜单管理"
    entity-name="菜单"
    :crud-items="crudItems"
    :apis="menuApi"
    :is-pagination="false"
    :exclude-columns="['parentId']"
    :exclude-fields="excludeFields"
    :smart-table="{
      viewDataHandler,
      tableAttrs: {
        rowKey: (row: any) => row.id,
        scrollX: 2250,
      },
    }"
    @before-form-show="beforeFormShow"
    @before-commit="beforeCommit"
    @after-commit="afterCommit"
    @commit-success="commitSuccess"
    @commit-fail="commitFail"
  />
</template>
