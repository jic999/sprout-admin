export const todoList = [
  { content: '防抖节流', completed: false },
  { content: '日志管理', completed: false },
  { content: '系统监控', completed: false },
  { content: '响应式布局', completed: false },
  { content: '文档编写', completed: false },
  { content: '打包体积优化', completed: false },
  { content: 'Permission 鉴权', completed: true },
  { content: '404 page', completed: true },
  { content: 'CRUD组件类型完善', completed: true },
  { content: 'Axios 错误处理', completed: true },
  { content: '日志管理', completed: true },
  { content: '菜单管理', completed: true },
  { content: 'Tagbar 开发', completed: true },
  { content: '夜间模式', completed: true },
  { content: 'loading bar', completed: true },
  { content: '工作台完善', completed: true },
  { content: '页面切换动画过渡', completed: true },
]

export const greetingBarInfoList = [
  {
    title: '项目数',
    content: 8,
  },
  {
    title: '待办',
    content: `${todoList.filter(item => item.completed).length}/${todoList.length}`,
  },
  {
    title: '消息',
    content: 36,
  },
]

export const techStackList = [
  {
    name: 'Vue',
    img: 'https://cn.vuejs.org/logo.svg',
    desc: '一款用于构建用户界面的渐进式 JavaScript 框架',
    url: 'https://cn.vuejs.org/',
  },
  {
    name: 'Vite',
    img: 'https://vitejs.cn/logo.svg',
    desc: '下一代前端开发与构建工具',
    url: 'https://vitejs.dev/',
  },
  {
    name: 'TypeScript',
    img: 'https://www.typescriptlang.org/icons/icon-96x96.png?v=8944a05a8b601855de116c8a56d3b3ae',
    desc: 'JavaScript类型的超集，可以编译成纯JavaScript',
    url: 'https://www.typescriptlang.org/',
  },
  {
    name: 'NaiveUI',
    img: 'https://www.naiveui.com/assets/naivelogo-93278402.svg',
    desc: '一个 Vue3 组件库,比较完整,主题可调,使用 TypeScript,快,有点意思',
    url: 'https://www.naiveui.com/',
  },
  {
    name: 'Unocss',
    img: 'https://unocss.dev/logo.svg',
    desc: '一个开源免费高性能且极具灵活性的即时原子化 CSS 引擎',
    url: 'https://unocss.dev/',
  },
  {
    name: 'Vueuse',
    img: 'http://www.vueusejs.com/favicon.svg',
    desc: '基本的 vue 组合式实用工具集合',
    url: 'https://vueuse.org/',
  },
  {
    name: 'Pinia',
    img: 'https://pinia.vuejs.org/logo.svg',
    desc: '符合直觉的 Vue.js 状态管理库',
    url: 'https://pinia.vuejs.org/',
  },
]
