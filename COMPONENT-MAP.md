# Vue ↔ React 组件映射指南

本文档帮助你在 Vue 和 React 两套实现之间快速切换和对照。

## 目录结构对照

| Vue (`src/`) | React (`react/src/`) |
|---|---|
| `main.ts` | `main.tsx` |
| `App.vue` | `App.tsx` |
| `router/index.ts` (内置在 main.ts) | `router.tsx` |
| `styles/index.css` | `index.css` |
| `composables/` | `hooks/` |
| `components/layout/` | `components/layout/` |
| `components/ui/` | `components/ui/` |
| `components/icons/` | `components/icons/` (内联到各组件中) |
| `views/` | `views/` |
| `types/index.ts` | `types/index.ts` |

## 视图页面对照（11 屏）

| 页面 | Vue 文件 | React 文件 |
|---|---|---|
| 启动页 | `views/SplashView.vue` | `views/SplashView.tsx` |
| 引导 1 | `views/Onboarding1View.vue` | `views/Onboarding1View.tsx` |
| 引导 2 | `views/Onboarding2View.vue` | `views/Onboarding2View.tsx` |
| 登录 | `views/LoginView.vue` | `views/LoginView.tsx` |
| 首页 | `views/HomeView.vue` | `views/HomeView.tsx` |
| 选岗位 | `views/JobsView.vue` | `views/JobsView.tsx` |
| 面试设置 | `views/SetupView.vue` | `views/SetupView.tsx` |
| 面试中 | `views/InterviewView.vue` | `views/InterviewView.tsx` |
| 反馈报告 | `views/FeedbackView.vue` | `views/FeedbackView.tsx` |
| 历史记录 | `views/HistoryView.vue` | `views/HistoryView.tsx` |
| 个人中心 | `views/ProfileView.vue` | `views/ProfileView.tsx` |

## 布局组件对照

| Vue | React | 说明 |
|---|---|---|
| `DeviceFrame.vue` | `DeviceFrame.tsx` | iPhone 15 Pro 外壳（390×844） |
| `ScreenSwitcher.vue` | `ScreenSwitcher.tsx` | 开发预览顶部切换器 |
| `AppLayout.vue` | `AppLayout.tsx` | 含 StatusBar + TabBar 的标准页面布局 |
| `ScreenView.vue` | `ScreenView.tsx` | 纯可滚动容器（用于无 TabBar 的页面） |
| `StatusBar.vue` | `StatusBar.tsx` | iOS 状态栏（时间 + 信号 + WiFi + 电量） |
| `TabBar.vue` | `TabBar.tsx` | 底部导航（首页 / 记录 / 我的） |

## UI 原子组件对照

| Vue | React | 用途 |
|---|---|---|
| `AppHeader.vue` | `AppHeader.tsx` | 页面标题区（greeting + h1 + 右侧操作） |
| `AppButton.vue` | `AppButton.tsx` | 按钮（primary / secondary / ghost） |
| `AppCard.vue` | `AppCard.tsx` | 卡片容器（default / accent / flat） |
| `AppInput.vue` | `AppInput.tsx` | 输入框 |
| `OptionCard.vue` | `OptionCard.tsx` | 单选选项卡片 |
| `ListRow.vue` | `ListRow.tsx` | 列表行（头像 + 标题 + 副标题 + 分数） |
| `JobCard.vue` | `JobCard.tsx` | 岗位选择卡片（网格 2 列） |
| `MenuItem.vue` | `MenuItem.tsx` | 菜单项（图标 + 标签 + 箭头） |
| `Pill.vue` | `Pill.tsx` | 胶囊标签（accent 色） |
| `Tag.vue` | `Tag.tsx` | 边框标签（muted 色） |
| `ProgressBar.vue` | `ProgressBar.tsx` | 进度条 |
| `ScoreRing.vue` | `ScoreRing.tsx` | 分数环形图 |
| `ChatBubble.vue` | `ChatBubble.tsx` | 聊天气泡（ai / user） |
| `Avatar.vue` | `Avatar.tsx` | 头像占位（渐变背景） |
| `BackButton.vue` | `BackButton.tsx` | 返回按钮 |
| `IconButton.vue` | `IconButton.tsx` | 圆形图标按钮 |

## 核心差异速查

| 特性 | Vue 3 | React 19 |
|---|---|---|
| 路由 | `vue-router` (`useRoute`, `useRouter`) | `react-router-dom` (`useLocation`, `useNavigate`) |
| 状态 | `ref` / `reactive` | `useState` / `useReducer` |
| 样式 | `<style scoped>` + CSS 变量 | `styled-jsx` (`<style jsx>`) + CSS 变量 |
| 组件 props | `defineProps` | TypeScript interface + destructuring |
| 事件 | `defineEmits` | callback props |
| 图标 | 独立 `.vue` 文件 | 内联 JSX SVG 或独立 `.tsx` 文件 |
| 布局包裹 | `<AppLayout>` / `<ScreenView>` | `<AppLayout>` / `<ScreenView>` |

## 样式体系

两套实现共享同一套 **CSS 自定义属性**（在 `styles/index.css` / `index.css` 中定义）：

- `--bg`, `--surface`, `--fg`, `--muted`, `--border`, `--accent`
- `--font-display`, `--font-body`, `--font-mono`
- `--radius-card`, `--radius-pill`

Tailwind 配置也同步了这些 token，便于统一使用。

## 启动方式

```bash
# Vue
npm install
cd .
npm run dev        # http://localhost:5173

# React
npm install
cd react
npm run dev        # http://localhost:5174
```
