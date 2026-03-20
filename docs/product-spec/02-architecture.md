# 架构设计 (Architecture)

## 1. 目录结构解析

```text
root/
├── app/                   # Next.js App Router (路由定义)
│   ├── (root)/            # 无 locale 前缀的入口（通常用于承接 /，由 middleware 重定向到 /{locale}）
│   ├── [locale]/          # 多语言根路由 (i18n 模式)
│   │   ├── blog/          # 博客详情页与列表页
│   │   ├── tags/          # 标签聚合页
│   │   └── layout.tsx     # 语言感知布局 (Header, Footer)
│   └── api/               # 后端 API (如 Newsletter)
├── middleware.ts          # 语言检测与重定向中间件（Next.js 约定：位于项目根）
├── dictionaries/          # i18n 翻译字典 (en.json, zh-CN.json)
├── components/            # 通用 UI 组件
├── data/                  # 内容与站点数据
│   ├── blog/              # 文章：按目录区分语言（data/blog/en/*、data/blog/zh-CN/*）
│   ├── authors/           # 作者：同样按目录区分语言
│   └── siteMetadata.js    # 站点核心配置
├── layouts/               # 页面级布局模板
├── public/                # 静态资源
└── contentlayer.config.ts # Contentlayer 文档模型与构建期索引生成
```

## 2. 数据流向 (Data Flow)

### 2.1 博客文章渲染流程 (i18n 增强版)
1. **源文件 (Source)**: 作者在 `data/blog/{locale}/**/*.{md,mdx}` 编写文章（例如 `data/blog/zh-CN/hello-world.md`）。
2. **构建 (Build)**: `contentlayer2` 解析 Frontmatter 与内容正文。
3. **生成 (Generate)**: 通过计算字段从文件路径推导 `language`，并生成 `slug/path`（自动移除 `en/`、`zh-CN/` 等目录前缀）。
4. **导入 (Import)**: 页面 `app/[locale]/blog/[...slug]/page.tsx` 按 `post.language === locale` 过滤文章集合。
5. **渲染 (Render)**: `getDictionary(locale)` 加载 UI 字典，`<MDXLayoutRenderer>` 渲染正文。

### 2.2 搜索机制
- 构建时生成 `search.json`，需支持按语言过滤搜索结果。
- 客户端加载 JSON，通过 `kbar` 实现前端模糊搜索。

## 3. i18n 核心机制
- **路由转换**: 根路径 `/` 与无前缀路径通过根目录 `middleware.ts` 重定向到 `/{locale}`。
- **语言来源**: 优先使用 Cookie `NEXT_LOCALE`；否则读取 `Accept-Language`；最后回退到 `defaultLocale`。
- **状态同步**: `LanguageSwitch` 通过替换路径段并写入 Cookie 来切换语言。
- **内容匹配**: 文章/作者按 `language` 字段与当前 `[locale]` 过滤；缺失时可按需要实现回退策略（当前以过滤结果为准）。

## 4. 部署架构
- **平台**: Vercel (当前部署)。
- **CI/CD**: Vercel Git Integration 自动构建部署。
