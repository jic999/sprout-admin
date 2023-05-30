<script setup lang="ts">
import type { CascaderOption, SelectOption } from 'naive-ui'
import { NSwitch, NTag } from 'naive-ui'
import type { CrudExcludeFormFields, MenuItem, MenuTreeNode } from '@/types'
import { defCrudItems } from '@/types'
import TheIcon from '@/components/icon/TheIcon.vue'
import { routeComponents } from '@/router/routes'

defineOptions({
  name: 'SystemMenu',
})

const componentOptions = routeComponents.map(item => ({ label: item.name, value: item.name }))

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
  },
  icon: {
    title: '图标',
    formItem: {
      type: 'Input',
      value: '',
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
  },
  perm: {
    title: '权限标识',
    formItem: {
      type: 'Input',
      value: '',
    },
  },
  redirect: {
    title: '重定向',
    formItem: {
      type: 'Input',
      value: '',
      attrs: { placeholder: '完整路径' },
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

function buildMenuTree(parentMenu: MenuTreeNode, data: MenuItem[]) {
  data.forEach((item) => {
    if (item.parentId === parentMenu.id) {
      buildMenuTree(item, data)
      if (!parentMenu.children)
        parentMenu.children = []
      parentMenu.children.push(item)
    }
  })
}
function getMenuList(data: MenuItem[]) {
  const result: MenuTreeNode[] = []
  data.sort((a, b) => a.orderNum - b.orderNum)
    .filter(item => item.parentId === 0)
    .forEach((parentMenu) => {
      buildMenuTree(parentMenu, data)
      result.push(parentMenu)
    })
  return result
}

let menuOptions: MenuItem[] | null = null
function viewDataHandler(data: MenuItem[]) {
  const result = getMenuList(data)
  menuOptions = result
  return result
}
async function beforeFormShow({ row, action }: any) {
  if (row && action === 'update') {
    const { data } = await menuApi.optionsById(row.id)
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

function beforeCommit() {
  console.log('beforeCommit')
}
function afterCommit() {
  console.log('afterCommit')
}
function commitSuccess() {
  window.location.reload()
  console.log('commitSuccess')
}
function commitFail() {
  console.log('commitFail')
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
        scrollX: 2000,
      },
    }"
    @before-form-show="beforeFormShow"
    @before-commit="beforeCommit"
    @after-commit="afterCommit"
    @commit-success="commitSuccess"
    @commit-fail="commitFail"
  />
</template>
