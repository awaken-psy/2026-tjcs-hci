# 智能面试官 (Smart Interviewer)

> 一个双栈（Vue 3 + React）移动端 App 原型，用于模拟 AI 驱动的面试场景。

---

## 技术栈

| 层面 | 技术 |
|------|------|
| 框架 | Vue 3 + React 19（并行） |
| 构建 | Vite 6 |
| 语言 | TypeScript 5.x |
| 样式 | Tailwind CSS 3.4 |
| 路由 | Vue Router 4（Vue 端）/ React Router v7（React 端） |
| 预览 | 自定义 iPhone 15 Pro 设备外壳框架 |

---

## 项目结构

```
├── src/                          # Vue 3 端
│   ├── main.ts                   # 应用入口（含 Vue Router 注册）
│   ├── App.vue                   # 根组件（DeviceFrame + router-view）
│   ├── router/                   # 路由配置
│   ├── views/                    # 11 个页面级视图
│   │   ├── SplashView.vue
│   │   ├── LoginView.vue
│   │   ├── Onboarding1View.vue
│   │   ├── Onboarding2View.vue
│   │   ├── HomeView.vue
│   │   ├── JobsView.vue
│   │   ├── InterviewView.vue
│   │   ├── FeedbackView.vue
│   │   ├── HistoryView.vue
│   │   ├── ProfileView.vue
│   │   └── SetupView.vue
│   ├── components/
│   │   ├── layout/               # 布局组件
│   │   │   ├── DeviceFrame.vue   # iPhone 15 Pro 外壳
│   │   │   ├── ScreenSwitcher.vue
│   │   │   ├── AppLayout.vue
│   │   │   └── ScreenView.vue
│   │   ├── ui/                   # 基础 UI 组件
│   │   │   ├── AppHeader.vue
│   │   │   ├── AppButton.vue
│   │   │   ├── AppCard.vue
│   │   │   ├── AppInput.vue
│   │   │   ├── OptionCard.vue
│   │   │   ├── ListRow.vue
│   │   │   ├── JobCard.vue
│   │   │   ├── MenuItem.vue
│   │   │   ├── Pill.vue
│   │   │   ├── Tag.vue
│   │   │   ├── ProgressBar.vue
│   │   │   ├── ScoreRing.vue
│   │   │   ├── ChatBubble.vue
│   │   │   ├── Avatar.vue
│   │   │   ├── BackButton.vue
│   │   │   └── IconButton.vue
│   │   └── icons/                # 20 个 SVG 图标组件
│   ├── styles/
│   │   └── index.css             # Tailwind 指令 + CSS 变量设计体系
│   └── types/
│       └── index.ts              # 全局类型定义
│
├── react/                        # React 19 端（独立子项目）
│   ├── src/
│   │   ├── main.tsx
│   │   ├── App.tsx
│   │   ├── router.tsx
│   │   ├── views/                # 11 个页面（.tsx）
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   └── ui/
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── COMPONENT-MAP.md              # Vue ↔ React 组件映射速查表
├── index.html                    # Vue 端入口 HTML
├── package.json                  # Vue 端依赖
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js            # 共享 Tailwind 配置
└── postcss.config.js
```

---

## 快速开始

### Vue 3 端

```bash
# 安装依赖
npm install

# 启动开发服务器（默认端口 5173）
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

### React 端

```bash
cd react

# 安装依赖
npm install

# 启动开发服务器（默认端口 5174）
npm run dev

# 构建生产版本
npm run build
```

---

## 页面列表

| 页面 | 路径 | 说明 |
|------|------|------|
| 启动页 | `/splash` | App Logo + 品牌动画 |
| 登录页 | `/login` | 手机号 / 第三方登录 |
| 引导页 1 | `/onboarding/1` | 职位选择 |
| 引导页 2 | `/onboarding/2` | 面试风格偏好 |
| 首页 | `/home` | 仪表盘、今日面试、技能评分 |
| 职位列表 | `/jobs` | 可投递职位浏览 |
| 面试页 | `/interview` | AI 面试对话界面 |
| 反馈页 | `/feedback` | 面试结果与评分 |
| 历史记录 | `/history` | 过往面试记录 |
| 个人中心 | `/profile` | 用户信息、简历、设置入口 |
| 设置页 | `/setup` | 通知、语言、主题等偏好 |

---

## 开发指南

### 添加新页面

1. 在 `src/views/` 下创建新的 `*.vue` 文件
2. 在 `src/router/index.ts` 中注册路由
3. 在 `src/components/layout/ScreenSwitcher.vue` 中添加导航入口（可选）
4. 如需 React 对应页面，在 `react/src/views/` 下创建 `*.tsx`

### 组件复用

- 优先使用 `components/ui/` 中的基础组件
- 布局相关（设备外壳、安全区）统一使用 `components/layout/`
- 跨框架迁移请参考 `COMPONENT-MAP.md`

### 样式约定

- 使用 Tailwind CSS 工具类处理日常布局
- 全局 CSS 变量定义在 `src/styles/index.css` 的 `:root` 中
- 组件级样式使用 `<style scoped>` 或 Tailwind 的 `@apply`
- 设计体系遵循 **Neutral Modern** 规范（见 `CLAUDE.md`）

---

## 设计体系速览

| Token | 值 | 用途 |
|-------|-----|------|
| `--bg` | `#FAFAFA` | 页面背景 |
| `--fg` | `#111111` | 主文本 |
| `--accent` | `#2F6FEB` | 主按钮、链接、强调 |
| `--muted` | `#6B6B6B` | 次要文本 |
| `--border` | `#E5E5E5` | 边框、分割线 |
| `--surface` | `#FFFFFF` | 卡片、浮层 |

字体栈：Inter + system-ui（显示与正文统一）

---

## 贡献

欢迎通过 Pull Request 提交改进。请确保：

- 代码通过 TypeScript 类型检查
- 组件在 Vue 和 React 两端保持一致性（如有）
- 不破坏现有的 iPhone 设备框架预览效果

---

## License

[MIT](LICENSE)
