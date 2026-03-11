# My AI Blog

本项目基于 [timlrx/tailwind-nextjs-starter-blog](https://github.com/timlrx/tailwind-nextjs-starter-blog) 二次开发，用于快速搭建一个支持多语言（`en` / `zh-CN`）、MDX 写作、搜索与评论的个人博客/技术站点。

## 项目简介

- 技术栈：Next.js（App Router）+ React + TypeScript + Tailwind CSS
- 内容体系：Contentlayer2 驱动的 MDX（Frontmatter + 代码高亮 + 数学公式 + 引用/参考文献等）
- 站点能力：SEO（sitemap/robots）、RSS、暗色模式、站内搜索（kbar）、评论（Giscus，可选）
- 部署方式：默认兼容 GitHub Pages 的静态导出（`EXPORT=1`），也可按需改为服务端部署

## 主要特性

- App Router 路由结构，按 `app/[locale]/...` 组织多语言页面
- 博客文章按语言放在 `data/blog/<locale>/`，路由中自动去除语言目录（URL 更干净）
- 支持 `.md` / `.mdx`，并内置常用写作增强（GFM、公式、提示块、代码块标题等）
- 生成标签统计与本地搜索索引（构建时产出 `app/tag-data.json` 与 `public/search.json`）
- 可配置的站点信息、导航与社交链接（集中在 `data/` 目录）

## 目录说明（常用）

- `app/`：页面与路由（含 `api/newsletter`、`sitemap.ts`、`robots.ts`）
- `data/blog/`：博客内容（按 `en/`、`zh-CN/` 分目录）
- `data/authors/`：作者信息（用于 About/作者页等）
- `data/siteMetadata.js`：站点标题、描述、域名、分析/评论/搜索等配置入口
- `components/`、`layouts/`：UI 组件与文章布局
- `public/`：静态资源（图片、favicon、`CNAME` 等）

## 写作与配置速览

### 新增文章

在 `data/blog/zh-CN/` 或 `data/blog/en/` 新建 `*.md(x)` 文件，并在 Frontmatter 中填写基础信息，例如：

```md
---
title: Hello World
date: 2026-03-11
tags: [Next.js, MDX]
summary: 一篇示例文章
draft: false
---
```

### 基础配置

- 修改站点信息：`data/siteMetadata.js`
- 修改导航：`data/headerNavLinks.ts`
- 环境变量：复制 `.env.example` 为 `.env.local`，按需配置 Umami/Giscus 等（可选）

## AI 助手（站内交互）

站点内置一个 Claude Code 风格的浮动终端组件，用于提供“AI 助手”式的站内交互体验（右下角入口）。

- 组件位置：`components/ClaudeCodeTerminal.tsx`（在 `app/[locale]/layout.tsx` 中全站挂载）
- 当前能力：偏演示/交互，暂未接入外部大模型 API；支持 `help`、`status/now`、`schedule`、`whoami`、`clear` 等指令
- 自定义方式：作息与状态文案在 `data/claude-reference/schedule.ts`；联系方式读取 `data/siteMetadata.js` 的 `email`
- 关闭方式：删除 `app/[locale]/layout.tsx` 中的 `<ClaudeCodeTerminal />` 引用与渲染即可

### 外部大模型 API 接入（规划）

- 推荐接入方式：通过 Next.js Route Handler（例如 `app/api/.../route.ts`）在服务端转发请求；前端仅调用站内 API，避免泄露密钥
- 环境变量建议：本地开发使用 `.env.local`，线上部署在平台侧配置环境变量（如 `OPENAI_API_KEY` / `ANTHROPIC_API_KEY`，按你选择的供应商决定）；不要把密钥写进代码或提交到仓库
- 部署计划：后续将使用 Vercel 部署以获得服务端能力（可运行 `app/api/*`），从而正常接入外部大模型 API
- 静态导出说明：如果设置 `EXPORT=1` 进行静态导出（如 GitHub Pages 工作流），`app/api/*` 不会运行；Vercel 部署时不要启用 `EXPORT=1`

## 快速启动

### 安装依赖

```bash
yarn
```

如果您使用的是 Windows，可能需要运行：

```bash
$env:PWD = $(Get-Location).Path
```

### 本地开发

运行开发服务器：

```bash
yarn dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000) 查看结果。

### 生产构建

```bash
yarn build
```

## 许可

[MIT](https://github.com/timlrx/tailwind-nextjs-starter-blog/blob/main/LICENSE) © [Timothy Lin](https://www.timlrx.com)
