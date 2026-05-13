# 智能面试官 — 前端 UI 交互原型需求分析报告

> 版本：v1.2  
> 日期：2026-05-13  
> 状态：路线 A 核心闭环已完成 6/8 项（75%），路线 B/C 待开始

---

## 一、项目概述

本原型为「AI 智能面试官」移动端应用的高保真交互原型，面向求职者的技术面试模拟练习场景。

### 1.1 现有功能全景

| 模块 | 已覆盖页面 | 状态 |
|---|---|---|
| **冷启动 / 认证** | Splash → Onboarding1/2 → Login → SMS Code | ✅ 已完整 |
| **首页 / 流量分发** | Home（统计 + 推荐岗位 + 开始面试） | ✅ 已完整 |
| **面试前准备** | Jobs（选岗位）→ Setup（难度 + 时长） | ⚠️ 缺少岗位详情、设备检查 |
| **面试中** | Interview（AI 问答 + 语音输入 + 计时） | ⚠️ 缺少进度、暂停机制 |
| **面试后复盘** | Feedback（总分 + 4 维度 + AI 建议） | ⚠️ 缺少逐题详细报告 |
| **个人数据** | History（面试列表）→ Resume（简历展示）→ Growth（趋势 + 雷达图） | ⚠️ Resume 无编辑页 |
| **系统 / 用户** | Profile → Settings → Notifications → About | ✅ 已完整 |

### 1.2 技术栈与约束

- **框架**：Vue 3（src/）+ React（react/src/）双栈并行
- **样式**：Tailwind CSS
- **设计系统**：Neutral Modern（见 `CLAUDE.md`）
- **设备适配**：iPhone 15 Pro 尺寸（390×844），共享帧模式
- **图标库**：自定义 SVG 图标（`src/components/icons/`）

---

## 二、需求总览

| 优先级 | 数量 | 已完成 | 待实现 | 说明 |
|---|---|---|---|---|
| **P0** | 4 项 | 3 | 1 | 核心体验闭环，JobDetail / PreInterview / DetailedFeedback 已交付，ResumeEdit 待实现 |
| **P1** | 4 项 | 3 | 1 | 高频使用场景，Pause + Progress + Bookmarks 已交付，Search 待实现 |
| **P2** | 4 项 | 0 | 4 | 增长与留存，全部待实现 |
| **P3** | 4 项 | 0 | 4 | 系统与边界，全部待实现 |
| **合计** | **16 项** | **6** | **10** | 完成度 37.5%（路线 A 完成度 75%） |

---

## 三、P0 — 核心体验闭环（4 项）

### 3.1 岗位详情页（Job Detail）✅ 已完成

> **文件**：`src/views/JobDetailView.vue`  
> **路由**：`/job-detail`  
> **关联组件**：`CompanyLogo`, `DifficultyBadge`, `TopicTag`, `BackButton`, `AppCard`, `AppButton`, `PlayIcon`

- [x] 岗位名称、公司、地点、薪资范围展示
- [x] 考察维度标签（TopicTag 组件）
- [x] 四宫格统计面板（通过率、参与人数、平均时长、评分）
- [x] 真题预览 3 题，支持点击展开/收起题目描述
- [x] 底部悬浮「开始面试」按钮，跳转至 PreInterviewView

---

### 3.2 面试准备 / 设备检查页（Pre-Interview Check）✅ 已完成

> **文件**：`src/views/PreInterviewView.vue`  
> **路由**：`/pre-interview`  
> **关联组件**：`WaveformVisualizer`, `BackButton`, `AppCard`, `AppButton`

- [x] 进度摘要卡片（岗位 + 难度 + 预计时长 + 题量）
- [x] 麦克风测试（idle → recording → passed 状态流转，录制时显示波形）
- [x] 网络状态展示（good/fair/poor 三级，差时提示使用 WiFi）
- [x] 摄像头检测（可选，点击检测）
- [x] 环境建议列表（4 条静态提示）
- [x] 底部双按钮「开始面试」/「返回调整设置」
- [x] 设备检查未通过时「开始面试」按钮半透明降权

---

### 3.3 逐题回顾 / 详细报告页（Detailed Feedback）✅ 已完成

> **文件**：`src/views/DetailedFeedbackView.vue`  
> **路由**：`/detailed-feedback`  
> **关联组件**：`ScoreRing`, `ProgressBar`, `ConfidenceMeter`, `BookmarkButton`, `BackButton`, `AppCard`, `AppButton`

- [x] 总分概览卡片（ScoreRing 环形进度 + 4 维度 ProgressBar 条）
- [x] 本次 vs 历史平均对比数值
- [x] 逐题回顾列表（3 题，点击展开/折叠详情）
- [x] 每题的 ConfidenceMeter（等分圆形仪表）
- [x] 每题的「你的回答」+「AI 追问」+「AI 点评」（得分点绿/失分点红）
- [x] 参考答案（默认折叠，点击展开）
- [x] BookmarkButton 收藏按钮（状态切换）
- [x] 底部「再练一次」/「返回首页」按钮

---

### 3.4 简历编辑页（Resume Edit）⏳ 待实现

**现状问题**：Resume 页面底部有「编辑简历」按钮，但点击无跳转，页面是纯展示态。

**需求描述**：
- 补齐表单编辑页，支持增删改
- 头像上传（点击头像弹出选择/拍摄）
- 基本信息：姓名、电话、邮箱、求职意向
- 教育背景：学校、专业、学历、时间段（支持多段）
- 实习/工作经历：公司、岗位、时间段、描述（支持多段）
- 技能标签：输入后回车添加，点击 x 删除
- 项目经历（可选）：项目名称、角色、描述

**页面结构**：
```
ResumeEditView.vue
├── 顶部返回 + 保存按钮
├── 头像区域（点击上传）
├── 基本信息表单
├── 教育背景（可新增/删除条目）
├── 工作经历（可新增/删除条目）
├── 技能标签（tag input）
├── 项目经历（可新增/删除条目）
└── 底部「保存简历」按钮（表单有变更时高亮）
```

**交互细节**：
- 头像上传后本地预览，保存时模拟上传
- 教育/工作经历条目支持拖拽排序（或上下箭头）
- 技能标签输入时显示推荐标签下拉
- 未保存返回时弹窗确认「是否保存修改？」
- 表单校验：必填项为空时标红提示

---

## 四、P1 — 高频使用场景（4 项）

### 4.1 面试暂停 / 放弃确认弹窗（Interview Pause & Quit）✅ 已完成

> **文件**：`src/views/InterviewView.vue`（增强，内联实现）  
> **关联组件**：`InterviewTimer`

- [x] Pause 遮罩层（毛玻璃背景 + 居中暂停卡片）
- [x] 暂停时计时器同步暂停显示
- [x] 显示「面试已暂停」+ 当前进度（第 X/Y 题）
- [x] 「继续面试」（主按钮）→ 恢复面试
- [x] 「结束面试」（次按钮，红色）→ 触发二次确认弹窗
- [x] 二次确认 Modal：「确认结束面试？」+ 提示文案 + 确认/取消按钮
- [x] 确认结束后跳转至 FeedbackView

---

### 4.2 面试进度与题目导航（Interview Progress）✅ 已完成

> **文件**：`src/views/InterviewView.vue`（增强）  
> **关联组件**：`QuestionNavigator`

- [x] 顶部 QuestionNavigator 步骤点组件（● ○ ○ ○ ○）
- [x] 显示「第 3/10 题」文字状态
- [x] 已答题标绿（实心），当前题蓝色外圈，未答题置灰
- [x] 底部「上一题」/「下一题」导航按钮
- [x] 边界禁用（第 1 题禁用上一题，最后 1 题禁用下一题）

---

### 4.3 错题本 / 收藏题目（Bookmarks）✅ 已完成

> **文件**：`src/views/BookmarkView.vue`  
> **路由**：`/bookmarks`  
> **关联组件**：`Tag`, `BackButton`, `AppCard`

- [x] 顶部标题「我的收藏」
- [x] 横向可滚动筛选标签（全部 / 算法 / 系统设计 / 行为面 / 项目经验 / 前端基础）
- [x] 收藏列表卡片：题目名 + 岗位标签 + 日期 + 已/未练习状态
- [x] 每项可取消收藏（× 按钮，带悬停红色状态）
- [x] 空状态展示（无收藏时居中提示）
- [x] 点击进入题目详情页（`/question-detail/:id`）
- [x] ProfileView 已添加「我的收藏」MenuItem 入口
- [x] DetailedFeedbackView 中每道题有 BookmarkButton 收藏按钮
- [x] QuestionDetailView 题目详情页（题目描述 + 考察要点 + 用户回答/AI 点评 + 参考答案）

---

### 4.4 搜索页（Global Search）⏳ 待实现

**现状问题**：岗位多、历史记录多后无检索能力。

**需求描述**：
- 全局搜索入口，可从首页或 Jobs 页面进入
- 支持搜索：岗位名称、题目关键词、历史面试记录
- 搜索结果分类展示（岗位 / 题目 / 历史）
- 搜索历史记录（本地存储最近 10 条）
- 热门搜索推荐

**页面结构**：
```
SearchView.vue（新增）
├── 顶部搜索栏（带返回、清除按钮）
├── 搜索历史（标签式，可清除）
├── 热门搜索
└── 搜索结果（输入后展示）
    ├── 岗位结果（JobCard 紧凑版）
    ├── 题目结果（列表项）
    └── 历史结果（面试记录）
```

---

## 五、P2 — 增长与留存（4 项）

### 5.1 练习计划 / 打卡日历（Study Plan）⏳ 待实现

**需求描述**：
- Home 或 Profile 中增加「学习计划」入口
- 周计划设定：每周目标练习次数（1-7 次）
- 日历视图：展示当月打卡情况，绿色=已完成，灰色=未完成
- 连续打卡天数统计（Streak）
- 达成周目标后给予成就提示

**页面结构**：
```
StudyPlanView.vue（新增）
├── 顶部标题「学习计划」
├── 本周进度（环形：3/5 次）
├── 连续打卡天数 🔥
├── 月历视图（打卡标记）
└── 本周计划列表（可勾选）
```

---

### 5.2 排行榜 / Peer 对比（Leaderboard）⏳ 待实现

**需求描述**：
- 匿名展示同岗位、同难度用户的平均分
- 用户看到自己的百分位排名（如「超过了 78% 的候选人」）
- 周榜/月榜/总榜切换
- 前三名展示头像与分数

**页面结构**：
```
LeaderboardView.vue（新增）
├── 顶部标题「排行榜」
├── 岗位/难度筛选器
├── 榜单类型切换（周/月/总）
├── 前三名 podium 展示
└── 用户自己排名（固定底部）
```

---

### 5.3 面经社区 / 讨论区（Community）⏳ 待实现

**需求描述**：
- 从「单用户练题工具」扩展到「面经沉淀社区」
- 用户可发布面经（文字 + 标签）
- 支持点赞、简单评论
- 按岗位/公司筛选面经
- 热门面经展示在首页推荐区

**页面结构**：
```
CommunityView.vue（新增）
├── 顶部标题「面经社区」
├── 发布按钮（悬浮）
├── 筛选标签（岗位/公司）
└── 面经列表（卡片流）
    └── PostCard
        ├── 作者头像 + 名称
        ├── 岗位标签
        ├── 面经内容（前 3 行）
        ├── 点赞数 / 评论数
        └── 发布时间
```

---

### 5.4 分享报告卡片（Share Card）⏳ 待实现

**需求描述**：
- Feedback / Detailed Feedback 支持生成分享图
- 海报式卡片：总分、维度得分、岗位名称、日期
- 底部带应用 Logo 和 slogan
- 支持保存到相册（移动端）或下载（Web）
- 分享文案自动复制到剪贴板

**页面结构**：
```
ShareCard.vue（组件）
├── 海报画布（固定比例 4:5）
│   ├── 顶部应用品牌区
│   ├── 总分大字展示
│   ├── 4 维度雷达图/条形图
│   ├── 岗位 + 日期
│   └── 底部 Slogan + Logo
└── 操作按钮「保存图片」「复制文案」
```

---

## 六、P3 — 系统与边界（4 项）

### 6.1 深色模式切换（Dark Mode）⏳ 待实现

**需求描述**：
- Settings 中增加「主题」选项（跟随系统 / 浅色 / 深色）
- 产品已有完整的 CSS 变量体系，需补充深色 token
- 切换时无闪烁，平滑过渡
- 各页面组件适配深色背景

**需补充的 Token 示例**：
```css
[data-theme="dark"] {
  --bg: #111111;
  --surface: #1a1a1a;
  --fg: #fafafa;
  --muted: #a0a0a0;
  --border: #333333;
  --accent: #5b9aff;
}
```

---

### 6.2 空状态 / 缺省页（Empty States）⏳ 待实现

**现状问题**：History、Notifications、Bookmarks 等列表页都是写死数据，无空状态处理。

**需求描述**：
- 各列表页补充「暂无数据」插图 + 引导文案
- 空状态插图风格统一（简约线条风格）
- 提供明确的下一步操作按钮

**需覆盖页面**：
- HistoryView — 暂无面试记录
- NotificationsView — 暂无通知
- BookmarksView — 暂无收藏
- JobsView（搜索结果为空）— 暂无匹配岗位
- CommunityView — 暂无须鲸

---

### 6.3 加载 / 骨架屏 / 网络异常（Loading & Error）⏳ 待实现

**需求描述**：
- 全局 Loading 指示器（圆形 spinner，居中，半透明遮罩）
- 列表页骨架屏（Shimmer 效果，卡片结构占位）
- 网络断开提示页（插画 + 「重新加载」按钮）
- 请求失败时 Toast 提示（非阻断）

**组件清单**：
```
├── AppLoading.vue（全屏 loading）
├── SkeletonCard.vue（列表骨架）
├── SkeletonLine.vue（文本骨架）
├── NetworkError.vue（错误页）
└── Toast.vue（轻量提示）
```

---

### 6.4 帮助与客服 / FAQ（Help Center）⏳ 待实现

**需求描述**：
- Settings 或 Profile 中增加「帮助中心」入口
- FAQ 分类展示（账号、面试、付费、技术问题）
- 支持展开/折叠答案
- 底部「联系客服」按钮（mailto 或跳转微信）
- 搜索 FAQ 关键词

**页面结构**：
```
HelpCenterView.vue（新增）
├── 顶部搜索栏
├── FAQ 分类标签
├── FAQ 列表（手风琴展开）
└── 底部「联系客服」卡片
```

---

## 七、新增页面汇总

| 优先级 | 页面名称 | 文件路径 | 路由 | 状态 |
|---|---|---|---|---|
| P0 | 岗位详情页 | `src/views/JobDetailView.vue` | `/job-detail` | ✅ 已完成 |
| P0 | 面试准备页 | `src/views/PreInterviewView.vue` | `/pre-interview` | ✅ 已完成 |
| P0 | 详细报告页 | `src/views/DetailedFeedbackView.vue` | `/detailed-feedback` | ✅ 已完成 |
| P0 | 简历编辑页 | `src/views/ResumeEditView.vue` | `/resume-edit` | ⏳ 待实现 |
| P1 | 收藏页 | `src/views/BookmarkView.vue` | `/bookmarks` | ✅ 已完成 |
| P1 | 题目详情页 | `src/views/QuestionDetailView.vue` | `/question-detail/:id` | ✅ 已完成 |
| P1 | 搜索页 | `src/views/SearchView.vue` | `/search` | ⏳ 待实现 |
| P2 | 学习计划页 | `src/views/StudyPlanView.vue` | `/study-plan` | ⏳ 待实现 |
| P2 | 排行榜页 | `src/views/LeaderboardView.vue` | `/leaderboard` | ⏳ 待实现 |
| P2 | 社区页 | `src/views/CommunityView.vue` | `/community` | ⏳ 待实现 |
| P2 | 分享卡片 | `src/components/ui/ShareCard.vue` | — | ⏳ 待实现 |
| P3 | 帮助中心 | `src/views/HelpCenterView.vue` | `/help-center` | ⏳ 待实现 |
| P3 | 网络错误页 | `src/components/ui/NetworkError.vue` | — | ⏳ 待实现 |

---

## 八、增强现有页面清单

| 页面 | 增强内容 | 状态 |
|---|---|---|
| `InterviewView.vue` | 进度条（QuestionNavigator）+ Pause 遮罩 + 结束确认弹窗 + 题目导航 + InterviewTimer | ✅ 已完成 |
| `FeedbackView.vue` | 增加「查看详细报告」入口 → `/detailed-feedback` | ✅ 已完成 |
| `ProfileView.vue` | 增加「我的收藏」入口 → `/bookmarks` | ✅ 已完成 |
| `HomeView.vue` | CTA 按钮改为跳转 `/job-detail`，推荐岗位卡片可点击进入详情 | ✅ 已完成 |
| `JobsView.vue` | 确认选择后跳转 `/job-detail`（原为直接跳 Setup） | ✅ 已完成 |
| `SetupView.vue` | 开始面试后跳转 `/pre-interview`（原为直接跳 Interview） | ✅ 已完成 |
| `SettingsView.vue` | 增加「主题切换」「帮助中心」入口 | ⏳ 待实现 |
| `ResumeView.vue` | 修复「编辑简历」按钮跳转 → `/resume-edit` | ⏳ 待实现 |

---

## 九、新增组件清单

| 组件 | 用途 | 文件路径 | 状态 |
|---|---|---|---|
| `BookmarkButton.vue` | 收藏按钮（书签图标，选中/未选中状态） | `src/components/ui/BookmarkButton.vue` | ✅ 已完成 |
| `CompanyLogo.vue` | 公司 Logo 圆形展示 | `src/components/ui/CompanyLogo.vue` | ✅ 已完成 |
| `ConfidenceMeter.vue` | 等分圆形置信度仪表（0-100） | `src/components/ui/ConfidenceMeter.vue` | ✅ 已完成 |
| `DifficultyBadge.vue` | 难度徽章（初级/中级/高级，颜色分层） | `src/components/ui/DifficultyBadge.vue` | ✅ 已完成 |
| `InterviewTimer.vue` | 面试计时器（MM:SS 格式，支持暂停） | `src/components/ui/InterviewTimer.vue` | ✅ 已完成 |
| `QuestionNavigator.vue` | 题目步骤点导航（已答/当前/未答，支持点击跳转） | `src/components/ui/QuestionNavigator.vue` | ✅ 已完成 |
| `TopicTag.vue` | 考察维度标签 | `src/components/ui/TopicTag.vue` | ✅ 已完成 |
| `WaveformVisualizer.vue` | 声波动画（用于麦克风测试反馈） | `src/components/ui/WaveformVisualizer.vue` | ✅ 已完成 |
| `PauseOverlay.vue` | 面试暂停遮罩（已内联至 InterviewView） | — | ⏳ 可选抽取 |
| `ShareCard.vue` | 分享海报卡片 | `src/components/ui/ShareCard.vue` | ⏳ 待实现 |
| `Toast.vue` | 全局轻量提示 | `src/components/ui/Toast.vue` | ⏳ 待实现 |
| `SkeletonCard.vue` | 骨架屏卡片 | `src/components/ui/SkeletonCard.vue` | ⏳ 待实现 |
| `SkeletonLine.vue` | 骨架屏文本行 | `src/components/ui/SkeletonLine.vue` | ⏳ 待实现 |
| `NetworkError.vue` | 网络错误展示 | `src/components/ui/NetworkError.vue` | ⏳ 待实现 |
| `EmptyState.vue` | 空状态插图 | `src/components/ui/EmptyState.vue` | ⏳ 待实现 |
| `TagInput.vue` | 技能标签输入 | `src/components/ui/TagInput.vue` | ⏳ 待实现 |
| `CalendarHeatmap.vue` | 打卡热图 | `src/components/ui/CalendarHeatmap.vue` | ⏳ 待实现 |

---

## 十、实施建议

### 路线 A：强化面试核心闭环 ✅ 已完成
> Job Detail → Pre-Interview Check → Interview Progress / Pause → Detailed Feedback → Bookmark

**核心链路已全部打通**：
- `Home` → `/job-detail`（JobDetailView）→ `/pre-interview`（PreInterviewView）→ `/interview`（InterviewView，含进度导航 + 暂停 + 确认弹窗）→ `/feedback`（FeedbackView）→ `/detailed-feedback`（DetailedFeedbackView，含逐题回顾 + 收藏）→ `/bookmarks`（BookmarkView）← `/profile`（ProfileView）

**待收官**：ResumeEditView（P0 3.4）是路线 A 的最后一个缺口。

### 路线 B：完善个人资料与留存 ⏳ 待开始
> Resume Edit → Study Plan / Calendar → Leaderboard → Share Card

适合想把原型做得更像完整上线产品的情况。

### 路线 C：系统体验补齐 ⏳ 待开始
> Empty States → Loading / Error → Dark Mode → Search

适合做 Demo 或测试展示前的最终 polish。

---

## 十一、附录

### 11.1 设计系统参考
- 背景色：`#FAFAFA`
- 前景色：`#111111`
- 强调色：`#2F6FEB`（钴蓝）
- 字号阶梯：12 · 14 · 16 · 20 · 24 · 32 · 48 · 64 px
- 卡片圆角：12px，按钮圆角：8px
- 布局最大宽度：1200px（移动端适配 390px 视口）

### 11.2 现有图标清单（可复用）
HomeIcon, UserIcon, BellIcon, SettingsIcon, ArrowLeftIcon, ArrowRightIcon, BarChartIcon, ClockIcon, CodeIcon, FileIcon, FilterIcon, InfoIcon, MicIcon, MonitorIcon, PenIcon, PlayIcon, TrendIcon, BatteryIcon, SignalIcon, WifiIcon, AppleIcon, WechatIcon

### 11.3 路由命名建议
所有新增页面使用 PascalCase 命名，与现有风格保持一致。建议统一注册到主路由配置中，并添加 `meta` 字段标记是否需要登录态。
