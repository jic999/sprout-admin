# Sprout Admin

<p align="center">
  <a href="https://github.com/jic999/sprout-admin">
    <img alt="Sprout Admin" width="200" src="./public/favicon.svg">
  </a>
</p>
<p align="center">
  <a href="./LICENSE"><img alt="MIT License" src="https://badgen.net/github/license/jic999/sprout-admin"/></a>
    <a href="https://github.com/antfu/eslint-config"><img alt="MIT License" src="https://antfu.me/badge-code-style.svg"/></a>
</p>
<p align="center">
  <a href="http://8.134.163.96:2023/">在线演示</a>
</p>
<p align="center">管理员账号 admin，游客账号 tourist，密码统一为：123456</p>

## 介绍

[Sprout Admin](https://github.com/jic999/sprout-admin), 一个开源的轻量级 [RBAC](https://en.wikipedia.org/wiki/Role-based_access_control) 后台管理模版，旨在为个人及中小型项目提供快速易用的后台管理方案。

后端接口 [Sprout Admin Api](https://github.com/jic999/sprout-admin-api) 使用 Nestjs + TypeORM + Mysql 开发。

## 特性

- ⚡️ Vite 4 + Vue 3 + pnpm, - 速度飞快

- 🎨 Unocss - 高性能且极具灵活性的即时原子化 CSS 引擎

- 🍎 NaiveUI - Evan You 推荐的 Vue3 UI 组件库

- 😃 Unocss + Icon组件封装，简单而优雅地引用海量图标

- 🦾 TypeScript, 安全的类型检查，更加 STRONG 的代码

- ⚙️ Eslint - 规范的代码风格，支持一键修复代码

- 📦 unplugin 自动导入插件，组件&API 自动化加载

- 🍒 Nestjs + TypeORM + MySQL 后端服务支持

## 快速开始

```sh
# 克隆仓库
git clone https://github.com/jic999/sprout-admin.git

# 进入项目目录
cd sprout-admin

# 安装依赖(若未安装pnpm，先 `npm install -g pnpm`)
pnpm install

# 启动项目
pnpm dev
```

## 感谢

- [Vue Naive Admin](https://github.com/zclzone/vue-naive-admin)，为本项目提供了许多思路。