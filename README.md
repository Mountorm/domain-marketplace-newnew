# Domain Marketplace（域名交易平台）

一个现代化的域名交易平台，提供安全可靠的域名买卖服务。
注意：此项目是原型项目，作为向客户的演示demo，不具备后端api数据传输功能。而且要尽可能的展示所有场景下的页面情况。

## 功能特性

- 🏪 域名市场
  - 域名列表展示与搜索
  - 高级筛选（价格范围、域名后缀、注册商等）
  - 域名详情页面
  - 域名收藏功能

- 💼 域名管理
  - 域名上架管理
  - 批量导入域名
  - 域名所有权验证
  - 自动下架设置

- 🔒 担保交易
  - 安全的担保交易流程
  - 域名所有权验证
  - 多种支付方式
  - 交易状态跟踪

- 👤 用户中心
  - 个人域名管理
  - 钱包余额管理
  - 订单记录查询
  - 担保交易管理

## 技术栈

- **框架**: Next.js 15
- **UI组件**: 
  - Radix UI
  - Tailwind CSS
  - Lucide Icons
- **状态管理**: React Context
- **表单处理**: React Hook Form
- **类型检查**: TypeScript
- **其他特性**:
  - 响应式设计
  - 深色模式支持
  - 现代化 UI 组件库

## 开始使用

1. 安装依赖：
\`\`\`bash
pnpm install
\`\`\`

2. 启动开发服务器：
\`\`\`bash
pnpm dev
\`\`\`

3. 访问地址：
\`\`\`
http://localhost:3000
\`\`\`

## 项目结构

```
app/                  # Next.js 应用主目录
├── page.tsx          # 首页
├── market/          # 域名市场相关页面
├── user/            # 用户中心相关页面
├── order/           # 订单相关页面
└── docs/            # 帮助文档

components/           # 可复用组件
├── ui/              # UI 基础组件
└── [其他组件]

lib/                 # 工具函数和配置
styles/              # 全局样式
public/              # 静态资源
```

## 主要功能说明

### 域名市场
- 支持多种筛选方式
- 价格区间筛选
- 域名后缀筛选
- 注册商筛选
- 标签分类

### 担保交易流程
1. 创建担保交易
2. 验证域名所有权
3. 买家付款
4. 域名转移
5. 确认完成
6. 资金结算

### 域名上架流程
1. 添加域名信息
2. 设置价格
3. 验证所有权
4. 正式上架

## 安全特性

- 域名所有权验证
- 安全支付流程
- 担保交易保障
- 防欺诈机制

## 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助改进项目。

## 许可证

[MIT License](LICENSE)