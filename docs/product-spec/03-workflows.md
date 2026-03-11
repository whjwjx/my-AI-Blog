# 开发与运维手册 (Workflows)

## 1. 开发环境 (Development)

### 常用命令
> **注意**: 本项目使用 Yarn 3.6.1，需通过 `node .yarn/releases/yarn-3.6.1.cjs` 调用。

```bash
# 启动开发服务器
node .yarn/releases/yarn-3.6.1.cjs dev

# 构建生产版本
node .yarn/releases/yarn-3.6.1.cjs build

> **注意 (Windows PowerShell)**: 如果遇到 Unbound variable "PWD" 错误，请先执行：
> ```powershell
> $env:PWD = $(Get-Location).Path
> ```
> 然后再运行构建命令。

# 运行代码检查
node .yarn/releases/yarn-3.6.1.cjs lint

# 安装依赖
node .yarn/releases/yarn-3.6.1.cjs install
```

### 端口配置
- 默认端口: `3000`
- 访问地址: `http://localhost:3000`

## 2. 内容创作流程 (Writing)

1. **新建文章**:
   - 英文文章放在 `data/blog/en/`。
   - 中文文章放在 `data/blog/zh-CN/`。
   - 支持 `.md` 与 `.mdx`。

2. **Frontmatter 模板**:
   ```yaml
   ---
   title: '文章标题'
   date: '2026-03-03'
   tags: ['Next.js', 'Guide']
   draft: false
   summary: '文章摘要...'
   ---
   ```
   说明：当前实现会优先从文件路径推导语言（例如 `data/blog/zh-CN/*` -> `language=zh-CN`）。如确有需要也可在 Frontmatter 写 `language`，但推荐用目录来区分。

3. **多语言文章匹配策略（推荐）**:
   - 为同一篇文章创建两个文件，保持相同的相对 slug。
   - 示例：`data/blog/en/my-post.md` 与 `data/blog/zh-CN/my-post.md`。

4. **添加图片**:
   将图片放入 `public/static/images/`，引用路径为 `/static/images/filename.png`。

## 3. 运维部署 (Operations)

### 环境变量
在 `.env` 文件中配置：
- `NEXT_PUBLIC_GISCUS_REPO`: 评论系统仓库
- `NEXT_UMAMI_ID`: 统计 ID

### Docker 部署 (可选)
参考 `faq/deploy-with-docker.md`。
