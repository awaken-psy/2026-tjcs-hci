# 智能面试官 (Smart Interviewer)

> 一个双栈（Vue 3 + React）移动端 App 原型，用于模拟 AI 驱动的技术面试场景。
> 全部 4 条路线（A/B/C/D）已完成交付，16 项需求 100% 覆盖。

---

## 技术栈

| 层面 | 技术 |
|------|------|
| 框架 | Vue 3 + React 19（并行） |
| 构建 | Vite 6 |
| 语言 | TypeScript 5.x |
| 样式 | Tailwind CSS 3.4 + CSS 自定义属性 |
| 路由 | Vue Router 4（统一注册于 `src/main.ts`） |
| 预览 | 自定义 iPhone 15 Pro 设备外壳框架 |
| 数据 | localStorage（简历、深色模式）+ 响应式 store（社区） |

---

## 项目结构

```
├── src/                              # Vue 3 端
│   ├── main.ts                       # 应用入口（含 29 条 Vue Router 注册）
│   ├── App.vue                       # 根组件（DeviceFrame + router-view + 页面过渡动画）
│   ├── views/                        # 30 个页面级视图
│   │   ├── SplashView.vue            # 启动页
│   │   ├── Onboarding1View.vue       # 引导页 1（职位选择）
│   │   ├── Onboarding2View.vue       # 引导页 2（面试风格偏好）
│   │   ├── LoginView.vue             # 登录页
│   │   ├── SmsCodeView.vue           # 短信验证码
│   │   ├── HomeView.vue              # 首页（仪表盘 + 推荐 + 入口）
│   │   ├── JobsView.vue              # 岗位列表
│   │   ├── JobDetailView.vue         # 岗位详情（路线 A）
│   │   ├── SetupView.vue             # 面试设置
│   │   ├── PreInterviewView.vue      # 面试前设备检查（路线 A）
│   │   ├── InterviewView.vue         # AI 面试对话（含暂停/进度导航）
│   │   ├── FeedbackView.vue          # 面试结果总分
│   │   ├── DetailedFeedbackView.vue  # 逐题回顾 + AI 点评（路线 A）
│   │   ├── HistoryView.vue           # 历史面试记录
│   │   ├── BookmarkView.vue          # 错题收藏（路线 A）
│   │   ├── QuestionDetailView.vue    # 题目详情（路线 A）
│   │   ├── ResumeView.vue            # 简历展示
│   │   ├── ResumeEditView.vue        # 简历编辑 6 模块（路线 A）
│   │   ├── ProfileView.vue           # 个人中心 + 入口汇总
│   │   ├── GrowthView.vue            # 成长趋势 + 雷达图
│   │   ├── StudyPlanView.vue         # 学习计划 + 打卡日历（路线 B）
│   │   ├── LeaderboardView.vue       # 排行榜（路线 B）
│   │   ├── CommunityView.vue         # 面经社区 Feed（路线 B）
│   │   ├── PostExperienceView.vue    # 发布面经（路线 B）
│   │   ├── ExperienceDetailView.vue  # 面经详情 + 评论（路线 B）
│   │   ├── NotificationsView.vue     # 通知列表
│   │   ├── SearchView.vue            # 全局搜索（路线 D）
│   │   ├── HelpCenterView.vue        # 帮助中心 / FAQ（路线 C）
│   │   ├── SettingsView.vue          # 设置（深色模式 + 帮助入口）
│   │   └── AboutView.vue             # 关于页
│   ├── components/
│   │   ├── layout/                   # 布局组件（4 个）
│   │   │   ├── DeviceFrame.vue       # iPhone 15 Pro 外壳（含深色模式初始化）
│   │   │   ├── ScreenSwitcher.vue    # TabBar 导航切换
│   │   │   ├── AppLayout.vue         # 通用页面布局
│   │   │   └── ScreenView.vue        # 安全区视口容器
│   │   ├── ui/                       # 基础 UI 组件（30 个）
│   │   │   ├── AppHeader.vue         # 页面 Header
│   │   │   ├── AppButton.vue         # 按钮（primary/secondary）
│   │   │   ├── AppCard.vue           # 通用卡片
│   │   │   ├── AppInput.vue          # 输入框
│   │   │   ├── OptionCard.vue        # 可选择卡片
│   │   │   ├── ListRow.vue           # 列表行（图标 + 标题/副标题 + 右箭头）
│   │   │   ├── JobCard.vue           # 岗位卡片
│   │   │   ├── MenuItem.vue          # 菜单列表项
│   │   │   ├── IconButton.vue        # 图标按钮（圆形）
│   │   │   ├── BackButton.vue        # 返回按钮
│   │   │   ├── Pill.vue              # 药片标签
│   │   │   ├── Tag.vue               # 小型标签
│   │   │   ├── ProgressBar.vue       # 进度条
│   │   │   ├── ScoreRing.vue         # 评分环（环形进度）
│   │   │   ├── ChatBubble.vue        # 对话气泡
│   │   │   ├── Avatar.vue            # 头像
│   │   │   ├── StatusBar.vue         # 状态栏（信号/电量）
│   │   │   ├── TabBar.vue            # 底部 TabBar
│   │   │   ├── CompanyLogo.vue       # 公司 Logo
│   │   │   ├── DifficultyBadge.vue   # 难度徽章
│   │   │   ├── TopicTag.vue          # 考察维度标签
│   │   │   ├── BookmarkButton.vue    # 收藏按钮
│   │   │   ├── ConfidenceMeter.vue   # 置信度仪表
│   │   │   ├── InterviewTimer.vue    # 面试计时器（MM:SS）
│   │   │   ├── WaveformVisualizer.vue# 声波动画
│   │   │   ├── QuestionNavigator.vue # 题目步骤点导航
│   │   │   ├── ShareCard.vue         # 分享海报卡片（路线 B）
│   │   │   ├── EmptyState.vue        # 空状态插图（路线 C）
│   │   │   ├── Toast.vue             # 轻量提示（路线 C）
│   │   │   ├── SkeletonCard.vue      # 骨架屏卡片（路线 C）
│   │   │   ├── SkeletonLine.vue      # 骨架屏文本行（路线 C）
│   │   │   └── NetworkError.vue      # 网络异常页（路线 C）
│   │   └── icons/                    # SVG 图标组件（23 个）
│   │       ├── HomeIcon.vue
│   │       ├── UserIcon.vue
│   │       ├── BellIcon.vue
│   │       ├── SearchIcon.vue
│   │       ├── FilterIcon.vue
│   │       ├── SettingsIcon.vue
│   │       ├── ArrowLeftIcon.vue
│   │       ├── ArrowRightIcon.vue
│   │       ├── PlayIcon.vue
│   │       ├── MicIcon.vue
│   │       ├── ClockIcon.vue
│   │       ├── BarChartIcon.vue
│   │       ├── CodeIcon.vue
│   │       ├── FileIcon.vue
│   │       ├── PenIcon.vue
│   │       ├── InfoIcon.vue
│   │       ├── TrendIcon.vue
│   │       ├── MonitorIcon.vue
│   │       ├── SignalIcon.vue
│   │       ├── WifiIcon.vue
│   │       ├── BatteryIcon.vue
│   │       ├── AppleIcon.vue
│   │       └── WechatIcon.vue
│   ├── styles/
│   │   └── index.css                 # Tailwind 指令 + CSS 变量设计体系 + 深色模式
│   ├── utils/                        # 数据层（2 个）
│   │   ├── resumeStore.ts            # 简历数据（localStorage 持久化 + CRUD）
│   │   └── communityStore.ts         # 面经社区数据（响应式状态，会话内共享）
│   └── types/
│       └── index.ts                  # 全局类型定义
│
├── react/                            # React 19 端（独立子项目）
│   ├── src/
│   │   ├── main.tsx
│   │   ├── App.tsx
│   │   ├── router.tsx
│   │   ├── views/                    # 页面（.tsx）
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   └── ui/
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── REQUIREMENTS.md                   # 需求分析报告（16 项规格）
├── COMPONENT-MAP.md                  # Vue ↔ React 组件映射速查表
├── index.html                        # Vue 端入口 HTML
├── package.json                      # Vue 端依赖
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js                # 共享 Tailwind 配置
└── postcss.config.js
```

---

## 需求完成度

| 路线 | 主题 | 需求数 | 完成 | 状态 |
|------|------|--------|------|------|
| **A** | 核心面试闭环 | 4（P0） | 4 | ✅ 100% |
| **D** | 搜索补齐 | 1（P1） | 1 | ✅ 100% |
| **B** | 增长与留存 | 4（P2） | 4 | ✅ 100% |
| **C** | 系统体验补齐 | 4（P3） | 4 | ✅ 100% |
| 其余 P1 | 面试暂停/导航/收藏 | 3（P1） | 3 | ✅ 100% |
| **合计** | | **16** | **16** | **100%** |

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
```

### React 端

```bash
cd react

# 安装依赖
npm install

# 启动开发服务器（默认端口 5174）
npm run dev
```

---

## 页面列表

| 页面 | 路径 | 说明 |
|------|------|------|
| 启动页 | `/` | App Logo + 品牌动画 |
| 引导页 1 | `/onboarding-1` | 职位方向选择 |
| 引导页 2 | `/onboarding-2` | 面试风格偏好 |
| 登录页 | `/login` | 手机号 / 第三方登录 |
| 短信验证 | `/sms-code` | 验证码输入 |
| 首页 | `/home` | 仪表盘 + 推荐岗位 + 学习成长入口 |
| 通知 | `/notifications` | 消息通知列表 |
| 岗位列表 | `/jobs` | 可投递职位浏览 + 搜索入口 |
| 岗位详情 | `/job-detail` | 公司/薪资/维度标签/真题预览 |
| 面试设置 | `/setup` | 难度/题量/题型选择 |
| 面试准备 | `/pre-interview` | 麦克风测试 + 网络检测 + 环境建议 |
| 面试中 | `/interview` | AI 问答 + 声波 + 计时 + 进度导航 + 暂停 |
| 面试结果 | `/feedback` | 总分 + 四维度 + 分享入口 |
| 详细复盘 | `/detailed-feedback` | 逐题回顾 + AI 点评 + 参考答案 + 收藏 |
| 历史记录 | `/history` | 过往面试列表 |
| 收藏 | `/bookmarks` | 错题本，按维度筛选 |
| 题目详情 | `/question-detail/:id` | 题目 + 要点 + 回答 + 点评 |
| 简历 | `/resume` | 简历展示（从 localStorage 读取） |
| 简历编辑 | `/resume/edit` | 6 模块编辑（localStorage 持久化） |
| 个人中心 | `/profile` | 用户信息 + 收藏/简历/成长入口 |
| 成长趋势 | `/growth` | 趋势图 + 雷达图 |
| 学习计划 | `/study-plan` | 打卡日历 + 任务清单 + AI 建议 |
| 排行榜 | `/leaderboard` | 周/月/总榜 + podium + 百分位 |
| 面经社区 | `/community` | Feed 流 + 按公司筛选 + 点赞 |
| 发布面经 | `/post-experience` | 公司/岗位/标题/正文发布 |
| 面经详情 | `/community/:id` | 正文 + 楼层评论 |
| 搜索 | `/search` | 全局搜索（岗位/题目/历史 + 历史记录 + 热门推荐） |
| 帮助中心 | `/help-center` | FAQ 手风琴 + 搜索 + 联系客服 |
| 设置 | `/settings` | 深色模式 + 帮助入口 + 通知/语言偏好 |
| 关于 | `/about` | 版本信息 |

---

## 开发指南

### 添加新页面

1. 在 `src/views/` 下创建新的 `*.vue` 文件
2. 在 `src/main.ts` 中导入并注册路由
3. 如需底部导航入口，在 `src/App.vue` 的 `screens` 数组中添加
4. 如需 React 对应页面，在 `react/src/views/` 下创建 `*.tsx`

### 组件复用

- 优先使用 `components/ui/` 中的基础组件（30 个可用）
- 图标均使用 `currentColor`，自动适配深色模式
- 布局相关（设备外壳、安全区）统一使用 `components/layout/`
- 跨框架迁移请参考 `COMPONENT-MAP.md`

### 样式约定

- 使用 Tailwind CSS 工具类处理日常布局
- 全局 CSS 变量定义在 `src/styles/index.css` 的 `:root` 中
- 深色模式通过 `.screen[data-theme="dark"]` 层叠覆盖，仅作用于手机屏幕区域
- 组件级样式使用 `<style scoped>`，穿透 slot 时使用 `:deep()`
- 设计体系遵循 **Neutral Modern** 规范

### 数据层约定

- 简历数据通过 `src/utils/resumeStore.ts` 管理，以 localStorage 持久化
- 面经社区数据通过 `src/utils/communityStore.ts` 管理，当前会话内响应式共享
- 搜索历史、深色模式偏好直接读写 localStorage

---

## 设计体系速览

| Token | 值 | 用途 |
|-------|-----|------|
| `--bg` | `#FAFAFA` | 页面背景 |
| `--surface` | `#FFFFFF` | 卡片、浮层 |
| `--fg` | `#111111` | 主文本 |
| `--muted` | `#6B6B6B` | 次要文本、图标 |
| `--border` | `#E5E5E5` | 边框、分割线 |
| `--accent` | `#2F6FEB` | 主按钮、链接、强调 |
| `--fg-soft` | `#E0E0E0` | 标签背景、开关轨道、评分环底色 |

浅色模式（默认）7 token。深色模式对应覆盖值见 `REQUIREMENTS.md §6.1`。

字体栈：Inter + system-ui（显示与正文统一），数字用 `tabular-nums`。

---

## License

[MIT](LICENSE)
