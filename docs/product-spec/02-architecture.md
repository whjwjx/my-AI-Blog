# 架构设计 (Architecture)

## 1. 目录结构解析

```text
root/
├── app/                 # Next.js App Router (路由定义)
│   ├── blog/            # 博客详情页与列表页
│   ├── tags/            # 标签聚合页
│   ├── api/             # 后端 API (如 Newsletter)
│   └── layout.tsx       # 全局布局 (Header, Footer)
├── components/          # 通用 UI 组件 (原子组件)
├── data/                # 静态数据源 (Markdown 文件, JSON 配置)
│   ├── blog/            # 文章存放处
│   └── siteMetadata.js  # 站点核心配置
├── layouts/             # 页面级布局模板 (复用性高)
├── public/              # 静态资源 (图片, favicon)
└── contentlayer.config.ts # 内容模型定义
```

## 2. 数据流向 (Data Flow)

### 2.1 博客文章渲染流程
1. **源文件 (Source)**: 作者在 `data/blog/*.mdx` 编写文章。
2. **构建 (Build)**: `contentlayer` 监听文件变化，解析 Frontmatter 和 MDX 内容。
3. **生成 (Generate)**: 生成 `.contentlayer/generated` 目录下的 JSON 数据。
4. **导入 (Import)**: Next.js 页面 (`app/blog/[...slug]/page.tsx`) 静态导入生成的 JSON。
5. **渲染 (Render)**: 通过 `<MDXLayoutRenderer>` 组件渲染最终 HTML。

### 2.2 搜索机制
- 构建时生成 `search.json`。
- 客户端加载 JSON，通过 `kbar` 实现前端模糊搜索。

## 3. 部署架构
- **平台**: Vercel (推荐) 或 静态服务器 (Docker/Nginx)。
- **CI/CD**: GitHub Actions (`.github/workflows/pages.yml`) 负责构建和部署到 GitHub Pages (当前配置)。
