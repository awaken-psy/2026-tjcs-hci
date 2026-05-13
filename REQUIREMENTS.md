# 智能面试官 — 前端 UI 交互原型需求分析报告

> 版本：v1.3  
> 日期：2026-05-13  
> 状态：路线 A 核心闭环已完成（100%）；路线 B 已完成（100%）；路线 C 待开始

---

## 一、项目概述

本原型为「AI 智能面试官」移动端应用的高保真交互原型，面向求职者的技术面试模拟练习场景。

### 1.1 现有功能全景

| 模块 | 已覆盖页面 | 状态 |
|---|---|---|
| **冷启动 / 认证** | Splash → Onboarding1/2 → Login → SMS Code | ✅ 已完整 |
| **首页 / 流量分发** | Home（统计 + 推荐岗位 + 开始面试） | ✅ 已完整 |
| **面试前准备** | Jobs → JobDetail → Setup → PreInterview（设备检查） | ✅ 已完整 |
| **面试中** | Interview（AI 问答 + 语音输入 + 计时 + 进度导航 + 暂停） | ✅ 已完整 |
| **面试后复盘** | Feedback（总分）→ DetailedFeedback（逐题回顾 + AI 点评） | ✅ 已完整 |
| **个人数据** | History（面试列表）→ Resume（简历编辑 + 展示）→ Growth（趋势 + 雷达图） | ✅ 已完整 |
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
| **P0** | 4 项 | 4 | 0 | 核心体验闭环，✅ 全部完成 |
| **P1** | 4 项 | 3 | 1 | 高频使用场景，Search 待实现 |
| **P2** | 4 项 | 4 | 0 | 增长与留存，✅ 全部完成 |
| **P3** | 4 项 | 0 | 4 | 系统与边界，全部待实现 |
| **合计** | **16 项** | **11** | **5** | 完成度 68.75%（路线 A+B 完成度 100%） |

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

### 3.4 简历编辑页（Resume Edit）✅ 已完成

> **文件**：`src/views/ResumeEditView.vue`  
> **路由**：`/resume/edit`  
> **数据层**：`src/utils/resumeStore.ts`（localStorage 持久化）  
> **关联组件**：`AppHeader`, `AppInput`, `AppButton`, `AppCard`, `BackButton`

**已实现功能**：
- [x] 模块级编辑：个人信息（name / email / phone / location）
- [x] 教育经历（school / degree / major / dates，支持多段，可增删）
- [x] 实习/工作经历（company / title / dates / description，支持多段，可增删）
- [x] 技能标签（输入 + 添加按钮，点击 × 删除）
- [x] 项目经历（name / role / dates / description，支持多段，可增删）
- [x] 自我评价（单段文本）
- [x] 左侧返回按钮（子页返回模块列表，模块列表返回 ResumeView）
- [x] 数据自动保存至 localStorage，ResumeView 同步展示

**暂未实现（后续迭代）**：
- 头像上传（需后端存储支持）
- 拖拽排序教育/工作经历条目
- 技能标签推荐下拉（需标签库数据）
- 未保存返回时弹窗确认
- 表单校验（必填项为空时标红提示）

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

## 五、P2 — 增长与留存（4 项）✅ 全部完成

### 5.1 练习计划 / 打卡日历（Study Plan）✅ 已完成

> **文件**：`src/views/StudyPlanView.vue`  
> **路由**：`/study-plan`

- [x] 连续打卡天数统计（Streak），火焰图标 + 激励文案
- [x] 本周进度卡片：5 项任务可勾选，显示已完成进度
- [x] 月历视图（2026 年 5 月）：已打卡日期绿色高亮，今日蓝色标记
- [x] AI 建议任务卡片（基于错题、收藏、历史推荐）
- [x] HomeView 首页新增「学习成长」入口卡片区域

---

### 5.2 排行榜 / Peer 对比（Leaderboard）✅ 已完成

> **文件**：`src/views/LeaderboardView.vue`  
> **路由**：`/leaderboard`

- [x] 周榜 / 月榜 / 总榜三 Tab 切换
- [x] 前 3 名 podium 展示（金银铜奖牌样式）
- [x] 25 条可滚动用户排行列表，含头像、分数、打卡天数
- [x] 当前用户排名高亮（蓝色行背景）固定底部
- [x] 百分位排名卡片：「你超越了 X% 的用户」
- [x] HomeView 首页新增「学习成长」入口卡片区域

---

### 5.3 面经社区 / 讨论区（Community）✅ 已完成

> **文件**：`src/views/CommunityView.vue`、`src/views/PostExperienceView.vue`、`src/views/ExperienceDetailView.vue`  
> **路由**：`/community`、`/post-experience`、`/community/:id`  
> **数据层**：`src/utils/communityStore.ts`（响应式状态，会话内保持）

- [x] 面经卡片 Feed 流（6 篇预设面经），含作者、公司/岗位标签、标题、摘要
- [x] 按公司筛选（横向可滚动标签栏）
- [x] 热门 / 最新排序切换
- [x] 点赞 / 取消点赞（实时响应）
- [x] 评论数展示
- [x] 发布面经独立页面（`/post-experience`）：公司名称支持选择预设 + 自行输入、岗位方向、标题、正文
- [x] 面经详情页（`/community/:id`）：完整正文、评论区（楼层式）、支持发表评论
- [x] 数据在三个页面间共享，当前会话内实时生效
- [x] HomeView 首页新增「学习成长」入口卡片区域

---

### 5.4 分享报告卡片（Share Card）✅ 已完成

> **文件**：`src/components/ui/ShareCard.vue`  
> **接入页面**：`FeedbackView.vue`、`DetailedFeedbackView.vue`

- [x] 浮层弹窗（Teleport 全局挂载，遮挡 TabBar）
- [x] 3 种视觉模板可选（经典深色 / 简约浅色 / 渐变蓝紫）
- [x] 海报展示：总分大字 + 4 维度条形图 + 岗位名称 + 日期 + 历史对比
- [x] 底部操作栏：「复制文案」+「保存图片」
- [x] 「复制文案」自动生成分享文案并写入剪贴板 + 显示 Toast 提示
- [x] 「保存图片」通过 Canvas 截图分享卡片区域并触发下载
- [x] FeedbackView 和 DetailedFeedbackView 均已集成

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
| P0 | 简历编辑页 | `src/views/ResumeEditView.vue` | `/resume/edit` | ✅ 已完成 |
| P1 | 收藏页 | `src/views/BookmarkView.vue` | `/bookmarks` | ✅ 已完成 |
| P1 | 题目详情页 | `src/views/QuestionDetailView.vue` | `/question-detail/:id` | ✅ 已完成 |
| P1 | 搜索页 | `src/views/SearchView.vue` | `/search` | ⏳ 待实现 |
| P2 | 学习计划页 | `src/views/StudyPlanView.vue` | `/study-plan` | ✅ 已完成 |
| P2 | 排行榜页 | `src/views/LeaderboardView.vue` | `/leaderboard` | ✅ 已完成 |
| P2 | 社区页 | `src/views/CommunityView.vue` | `/community` | ✅ 已完成 |
| P2 | 发布面经页 | `src/views/PostExperienceView.vue` | `/post-experience` | ✅ 已完成 |
| P2 | 面经详情页 | `src/views/ExperienceDetailView.vue` | `/community/:id` | ✅ 已完成 |
| P2 | 分享卡片 | `src/components/ui/ShareCard.vue` | — | ✅ 已完成 |
| P3 | 帮助中心 | `src/views/HelpCenterView.vue` | `/help-center` | ⏳ 待实现 |
| P3 | 网络错误页 | `src/components/ui/NetworkError.vue` | — | ⏳ 待实现 |

---

## 八、增强现有页面清单

| 页面 | 增强内容 | 状态 |
|---|---|---|
| `InterviewView.vue` | 进度条（QuestionNavigator）+ Pause 遮罩 + 结束确认弹窗 + 题目导航 + InterviewTimer | ✅ 已完成 |
| `FeedbackView.vue` | 增加「查看详细报告」入口 → `/detailed-feedback`；增加「分享成绩」按钮 + ShareCard 弹窗；面试得分后增加 x/5 格式显示 | ✅ 已完成 |
| `ProfileView.vue` | 增加「我的收藏」入口 → `/bookmarks` | ✅ 已完成 |
| `HomeView.vue` | CTA 按钮改为跳转 `/job-detail`，推荐岗位卡片可点击进入详情；新增「学习成长」入口卡片区（学习计划 / 排行榜 / 面经社区） | ✅ 已完成 |
| `JobsView.vue` | 确认选择后跳转 `/job-detail`（原为直接跳 Setup） | ✅ 已完成 |
| `SetupView.vue` | 开始面试后跳转 `/pre-interview`（原为直接跳 Interview） | ✅ 已完成 |
| `DetailedFeedbackView.vue` | 增加「分享成绩」按钮 + ShareCard 弹窗 | ✅ 已完成 |
| `SettingsView.vue` | 增加「主题切换」「帮助中心」入口 | ⏳ 待实现 |
| `ResumeView.vue` | 修复「编辑简历」按钮跳转 → `/resume/edit`，从 localStorage 读取数据，同步展示 6 模块（新增项目经历 + 自我评价 section） | ✅ 已完成 |

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
| `ShareCard.vue` | 分享海报卡片（浮层弹窗 + 3 模板 + 复制/保存） | `src/components/ui/ShareCard.vue` | ✅ 已完成 |
| `Toast.vue` | 全局轻量提示 | `src/components/ui/Toast.vue` | ⏳ 待实现 |
| `SkeletonCard.vue` | 骨架屏卡片 | `src/components/ui/SkeletonCard.vue` | ⏳ 待实现 |
| `SkeletonLine.vue` | 骨架屏文本行 | `src/components/ui/SkeletonLine.vue` | ⏳ 待实现 |
| `NetworkError.vue` | 网络错误展示 | `src/components/ui/NetworkError.vue` | ⏳ 待实现 |
| `EmptyState.vue` | 空状态插图 | `src/components/ui/EmptyState.vue` | ⏳ 待实现 |
| `TagInput.vue` | 技能标签输入 | `src/components/ui/TagInput.vue` | ⏳ 待实现 |
| `CalendarHeatmap.vue` | 打卡热图 | `src/components/ui/CalendarHeatmap.vue` | ⏳ 待实现 |
| `resumeStore.ts` | 简历数据 localStorage 持久化（类型定义 + 默认数据 + CRUD 封装） | `src/utils/resumeStore.ts` | ✅ 已完成 |
| `communityStore.ts` | 面经社区数据响应式状态管理（预设数据 + 点赞/评论/发布） | `src/utils/communityStore.ts` | ✅ 已完成 |

---

## 十、实施建议

### 路线 A：强化面试核心闭环 ✅ 已完成
> Job Detail → Pre-Interview Check → Interview Progress / Pause → Detailed Feedback → Bookmark

**路线 A 所有需求已全部交付**。核心链路：
- `Home` → `/job-detail`（JobDetailView）→ `/pre-interview`（PreInterviewView）→ `/interview`（InterviewView，含进度导航 + 暂停 + 确认弹窗）→ `/feedback`（FeedbackView）→ `/detailed-feedback`（DetailedFeedbackView，含逐题回顾 + 收藏）→ `/bookmarks`（BookmarkView）← `/profile`（ProfileView）
- `Profile` → `/resume/edit`（ResumeEditView，6 模块编辑 + localStorage 持久化）→ `/resume`（ResumeView，同步展示）

### 路线 B：增长与留存 ✅ 已完成
> Study Plan → Leaderboard → Community（含 PostExperience + ExperienceDetail）→ Share Card

所有 P2 需求已交付，Home 首页新增「学习成长」入口卡片区。
新增 5 个页面文件：StudyPlanView、LeaderboardView、CommunityView、PostExperienceView、ExperienceDetailView。
新增 1 个组件：ShareCard（浮层弹窗）。
新增 1 个 store：communityStore（面经数据会话内共享）。
FeedbackView 和 DetailedFeedbackView 均已集成 ShareCard。

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
