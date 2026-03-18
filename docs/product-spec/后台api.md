# API 文档

本文档描述了项目后端接口的调用规范和详细说明。

## 基础信息
- **API 基础地址**: `http://localhost:8000` (开发环境)
- **文档链接**: [Swagger UI](http://localhost:8000/docs) | [Redoc](http://localhost:8000/redoc)

## 安全认证 (API Key)
为了确保安全性，以下接口（除 `/` 和 `/health` 外）均需在 HTTP 请求头中添加 `X-API-Key`：
- **Header 名称**: `X-API-Key`
- **默认测试 Key**:  (仅供本地测试)

## 接口详情

### 1. 聊天接口 (Chat)
- **路径**: `/chat`
- **方法**: `POST`
- **描述**: 发送普通消息并获取回复。
- **权限**: 需 `X-API-Key`
- **请求体**:
  ```json
  {
    "message": "你好"
  }
  ```
- **返回**:
  ```json
  {
    "reply": "echo: 你好",
    "length": 2
  }
  ```

### 2. 流式聊天接口 (Chat Stream)
- **路径**: `/chat/stream`
- **方法**: `POST`
- **描述**: 发送消息并以流的形式接收回复。
- **权限**: 需 `X-API-Key`
- **请求体**:
  ```json
  {
    "message": "你好"
  }
  ```
- **返回**: 文本流 (`text/plain; charset=utf-8`)

### 3. 获取项目信息 (Read Item)
- **路径**: `/items/{item_id}`
- **方法**: `GET`
- **描述**: 根据 ID 获取项目信息。
- **权限**: 需 `X-API-Key`
- **参数**:
  - `item_id`: (路径参数) 整数
  - `q`: (查询参数) 可选字符串
- **返回**:
  ```json
  {
    "item_id": 123,
    "q": "search_term"
  }
  ```

### 4. 健康检查 (Health Check)
- **路径**: `/health`
- **方法**: `GET`
- **描述**: 检查服务运行状态。
- **权限**: **公开**
- **返回**:
  ```json
  {
    "status": "ok"
  }
  ```

### 5. 根路径 (Root)
- **路径**: `/`
- **方法**: `GET`
- **描述**: 服务根路径，用于快速验证。
- **权限**: **公开**
- **返回**:
  ```json
  {
    "Hello": "World"
  }
  ```
