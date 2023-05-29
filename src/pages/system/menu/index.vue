<script setup lang="ts">
import type { CascaderOption } from 'naive-ui'
import { NSwitch, NTag } from 'naive-ui'
import { defCrudItems } from '@/types'
import TheIcon from '@/components/icon/TheIcon.vue'

interface MenuItem {
  id: number
  createTime: string
  updateTime: string
  parentId: number
  name: string
  path: string
  component: string
  title: string
  perms: string
  redirect: string
  icon: string
  orderNum: number
  keepAlive: number
  status: number
}

interface TreeNode extends MenuItem {
  children?: TreeNode[]
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
      },
    },
  },
  name: {
    title: '名称',
    formItem: {
      type: 'Input',
      value: '',
    },
  },
  path: {
    title: '路径',
    formItem: {
      type: 'Input',
      value: '',
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
      type: 'Input',
      value: '',
    },
  },
  perms: {
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

function buildMenuTree(parentMenu: TreeNode, data: MenuItem[]) {
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
  const result: TreeNode[] = []
  data.sort((a, b) => a.orderNum - b.orderNum)
  data.filter(item => item.parentId === 0)
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
    crudItems.parentId.formItem.options = [{ title: '无', id: 0 }, ...options] as CascaderOption[]
  }
  else {
    crudItems.parentId.formItem.options = [{ title: '无', id: 0 }, ...menuOptions!] as CascaderOption[]
  }
}
onMounted(() => {

})
</script>

<template>
  <SmartCrud
    title="菜单管理"
    entity-name="菜单"
    :crud-items="crudItems"
    :apis="menuApi"
    :is-pagination="false"
    :exclude-columns="['parentId']"
    :before-form-show="beforeFormShow"
    :smart-table="{
      viewDataHandler,
      tableAttrs: {
        rowKey: (row: any) => row.id,
      },
    }"
  />
</template>
