---
name: "consult-product-spec"
description: "查阅或根据项目说明书 (docs/product-spec/) 理解项目背景或解决问题。当需要了解需求、架构、工作流，或遇到报错、开发瓶颈、修复 Bug 时调用此 skill。"
---

# 查阅项目说明书 (Consult Product Specification)

本 Skill 用于通过查阅位于 `docs/product-spec/` 的项目说明书，来理解项目全貌（背景、需求、架构、流程）或作为解决问题的第一参考。

## 何时使用 (When to Use)

### 1. 理解与开发 (Understanding & Development)
- 当用户询问有关项目功能、架构或工作流的问题时。
- 当用户请求新功能或修改现有功能时。
- 当你需要理解现有代码库结构和编码规范时。

### 2. 解决问题 (Problem Solving)
- **遇到报错时**: 当编译器报错、运行出错或测试失败时。
- **开发瓶颈**: 当不确定某个功能的实现细节或依赖关系时。
- **修复 Bug**: 当用户反馈 Bug，需要核对预期行为与实际实现时。
- **技术决策**: 当需要决定如何修复问题，且需要符合项目既有架构时。

## 解决问题的流程 (Process)
1. **定位相关文档**: 
   - 检查 `docs/product-spec/index.md` 寻找相关模块。
   - 查阅 `00-context-for-ai.md` 获取技术栈约束和全局规则。
   - 查阅 `02-architecture.md` 理解受影响组件的职责。
   - 查阅 `03-workflows.md` 核对开发、测试或部署流程。
2. **核对规范**: 确认当前的实现是否违背了文档中定义的架构或需求。
3. **寻找已知约束**: 文档中可能已经记录了某些已知的技术限制或设计决策。
4. **制定/更新方案**: 基于文档规范设计代码。如果你的更改影响了现有文档，**你必须**更新相应的文档文件。

## 文档目录 (Docs Directory)
- `docs/product-spec/index.md`: 主要入口点和目录。
- `docs/product-spec/00-context-for-ai.md`: AI 专用上下文和核心规则。
- `docs/product-spec/01-requirements.md`: 业务需求和功能说明。
- `docs/product-spec/02-architecture.md`: 系统架构设计。
- `docs/product-spec/03-workflows.md`: 开发、部署及维护流程。
