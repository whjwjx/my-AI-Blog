# 开发与运维手册 (Workflows)

## 1. 开发环境 (Development)

### 常用命令
```bash
# 启动开发服务器
yarn dev

# 构建生产版本
yarn build

# 运行代码检查
yarn lint
```

### 端口配置
- 默认端口: `3000`
- 访问地址: `http://localhost:3000`

## 2. 内容创作流程 (Writing)

1. **新建文章**:
   在 `data/blog/` 目录下创建 `.md` 或 `.mdx` 文件。
   
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

3. **添加图片**:
   将图片放入 `public/static/images/`，引用路径为 `/static/images/filename.png`。

## 3. 运维部署 (Operations)

### 环境变量
在 `.env` 文件中配置：
- `NEXT_PUBLIC_GISCUS_REPO`: 评论系统仓库
- `NEXT_UMAMI_ID`: 统计 ID

### Docker 部署 (可选)
参考 `faq/deploy-with-docker.md`。
