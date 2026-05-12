# 人机交互导论 — 课程大作业指南

> 生成日期：2026/05/08
> 基于 open-design 项目与课程考核要求整理

---

## 一、open-design 项目概述与使用方法

### 1.1 项目简介
**open-design**（[nexu-io/open-design](https://github.com/nexu-io/open-design)）是 Anthropic Claude Design 的开源替代品，本地优先、可 Web 部署的设计生成工具。它通过 **31 种可组合技能** 和 **72 个品牌级设计系统**，让用户快速生成网页原型、移动应用界面、演示文稿等设计产物。

### 1.2 技术栈
| 层级 | 技术 |
|------|------|
| 前端 | Next.js 16 App Router + React 18 + TypeScript |
| 桌面端 | Electron（macOS Apple Silicon + Windows x64）|
| 数据库 | SQLite（本地持久化）|
| 部署 | 支持本地运行和 Vercel 部署 |
| 包管理 | pnpm workspace |

### 1.3 安装步骤（已安装可跳过）

**环境要求：** Node.js `~24` 和 pnpm `10.33.x`

```bash
# 1. 克隆仓库
git clone https://github.com/nexu-io/open-design.git
cd open-design

# 2. 启用 corepack 并安装依赖
corepack enable
corepack pnpm --version   # 应输出 10.33.2
pnpm install
```

### 1.4 启动与使用

**Web/本地模式（推荐用于课程作业）：**
```bash
# 前台启动
pnpm tools-dev run web

# 后台启动
pnpm tools-dev start web

# 查看日志
pnpm tools-dev logs
```
启动后，在浏览器中打开 `tools-dev` 打印的 URL 即可使用。

**桌面模式（可选）：**
```bash
pnpm tools-dev
```

### 1.5 生成 UI 原型 Demo 的步骤

1. **启动应用**
   ```bash
   pnpm tools-dev run web
   ```

2. **选择 Skill（技能模式）**
   根据你的作业需求选择：
   - `web-prototype` — 单页网页原型（默认）
   - `mobile-app` — 移动端 App（带 iPhone 15 Pro 设备框架）
   - `dashboard` — 仪表盘/管理后台
   - `saas-landing` — SaaS 落地页
   - `gamified-app` — 游戏化应用

3. **选择设计系统**
   从 72 个内置系统中选择，例如：
   - `default` — 默认风格
   - `warm-editorial` — 温暖编辑风格
   - `linear-app` — Linear 风格
   - `modern-minimal` — 现代极简

4. **填写需求描述（Brief）**
   用自然语言描述你想要的界面，例如：
   
   > "创建一个移动端健身追踪 App，包含今日数据概览、训练记录列表和个人设置页面"
   

5. **填写发现表单（Discovery Form）**
   系统会弹出表单询问：
   - 平台类型（web / mobile / desktop）
   - 目标受众
   - 品牌调性
   - 设计约束和规模

6. **选择视觉方向**
   若无品牌资产，可从 5 种预设方向选择：
   - Editorial Monocle（编辑风）
   - Modern Minimal（现代极简）
   - Tech Utility（科技实用）
   - Brutalist Experimental（实验风）
   - Soft Warm（柔和温暖）

7. **等待 AI 生成并预览**
   - 代理会实时显示 Todo 进度
   - 生成的 artifact 会在沙盒 iframe 中实时渲染
   - 可继续对话进行迭代优化

8. **导出产物**
   - 点击 "Save to disk" 保存
   - 可导出为 **HTML**（推荐，可离线运行）、PDF、ZIP 等格式

### 1.6 课程作业推荐使用的 Skill

| 作业类型 | 推荐 Skill | 说明 |
|----------|-----------|------|
| 移动端 App | `mobile-app` | 自动生成 iPhone 框架原型 |
| 桌面端 Web | `web-prototype` | 单页交互网页 |
| 数据展示 | `dashboard` | 仪表盘型界面 |
| 营销页面 | `saas-landing` | 含 Hero、特性、CTA 等区块 |

---

## 二、课程考核要求整理

> 来源：人机交互导论 — 第1章：绪论（2026/3/2）

### 2.1 项目基本要求（60%）

- **设计一款用户界面交互程序**（移动或者桌面均可）
- **实现交互逻辑、展示 demo 界面即可**，无需开发后端程序
- **运用所学习到的人机交互基本原理、知识点**

### 2.2 提交要求

| 项目 | 要求 |
|------|------|
| 提交邮箱 | `zkni_courses@outlook.com` |
| 邮件命名 | `团队/项目名称_人机交互项目报告` |
| 提交内容 | PPT、报告（PDF 格式）、源代码压缩包（如有）|
| 报告封面 | 包含团队/项目名称、团队成员、学号、团队成员分工、工作量权重 |
| 页数限制 | **不超过 25 页**（不是越多越好）|

### 2.3 报告必须包含的内容

1. **需求分析**
2. **概念设计**
3. **交互流程设计**
4. **交互界面设计**
5. **用户可用性验证**

### 2.4 截图与知识点说明要求（给分点）

- **提供每一个交互步骤的截图**
- **说明在设计过程中运用了哪些交互设计知识点**（这是给分点，务必详细写）

### 2.5 运行方式要求

- 给出可以 **在线/离线运行** 的方式
- 或者提供 **交互过程运行的视频**

> **建议**：使用 open-design 生成的 HTML 文件可以直接在浏览器中离线打开，完美满足 "离线运行" 的要求。

---

## 三、可用交互设计知识点参考（给分点）

在报告中可以引用以下人机交互原理/知识点：

| 知识点 | 应用场景示例 |
|--------|-------------|
| **示能性（Affordance）** | 按钮看起来可以点击、输入框看起来可以输入 |
| **反馈（Feedback）** | 点击按钮后有视觉变化、操作成功后有提示 |
| **一致性（Consistency）** | 同一类操作使用相同的图标和交互方式 |
| **心智模型（Mental Model）** | 界面设计符合用户对现实世界的认知 |
| **Fitts 定律** | 重要按钮放在容易点击的位置、尺寸足够大 |
| **Hick-Hyman 定律** | 选项过多时进行分组或分步展示 |
| **错误预防（Error Prevention）** | 危险操作前有确认提示、表单有输入验证 |
| **容错性（Forgiveness）** | 支持撤销操作、有明确的返回路径 |
| **可见性（Visibility）** | 当前所在页面/状态清晰可见 |
| **简洁性（Simplicity）** | 界面不 cluttered，信息层级清晰 |
| **用户控制（User Control）** | 用户可以自由导航、不被强制流程束缚 |
| **可访问性（Accessibility）** | 颜色对比度足够、支持键盘操作 |
| **格式塔原理（Gestalt Principles）** | 相近元素分组、对齐形成视觉层级 |
| **认知负荷（Cognitive Load）** | 减少用户记忆负担、提供明确的提示 |

---

## 四、GitHub 参考项目推荐

以下是可作为课程作业参考的 HCI/交互设计项目：

### 4.1 直接相关的课程项目

| 项目 | 描述 | 链接 |
|------|------|------|
| **DigitalMenuPrototype** | Portland State University HCI 研究生课程期末项目 — 数字菜单原型 | [alisonailea/DigitalMenuPrototype](https://github.com/alisonailea/DigitalMenuPrototype) |
| **Darb-HCI-Prototype** | 旅游导览 App 原型，使用 Figma 制作，以用户为中心设计 | [jumAsm/Darb-HCI-Prototype](https://github.com/jumAsm/Darb-HCI-Prototype) |
| **HCI-EReader-Project** | 电子书阅读器原型，HCI 课程项目（TypeScript）| [unnambalaji93/HCI-EReader-Project](https://github.com/unnambalaji93/HCI-EReader-Project) |
| **HCI-Course-Projects (Aalto)** | 阿尔托大学 HCI 课程三个主要作业 | [matteocivitillo/HCI-Course-Projects](https://github.com/matteocivitillo/HCI-Course-Projects) |

### 4.2 HCI / 交互技术相关工具库

| 项目 | 描述 | 链接 |
|------|------|------|
| **AlphaPose** | 实时多人全身姿态估计与追踪系统 | [MVIG-SJTU/AlphaPose](https://github.com/MVIG-SJTU/AlphaPose) |
| **deepgaze** | 计算机视觉库，实现头部姿态和视线方向估计 | [mpatacchiola/deepgaze](https://github.com/mpatacchiola/deepgaze) |
| **gaze-detection** | 用 JavaScript 机器学习检测眼球运动，构建视线控制体验 | [charliegerard/gaze-detection](https://github.com/charliegerard/gaze-detection) |
| **awesome-hands-control** | 手势识别控制软件 | [RylanBot/awesome-hands-control](https://github.com/RylanBot/awesome-hands-control) |
| **DReyeVR** | VR 驾驶 + 眼动追踪模拟器，用于驾驶交互研究 | [HARPLab/DReyeVR](https://github.com/HARPLab/DReyeVR) |

---

## 五、建议的作业执行流程

```
1. 确定选题
   └── 选择一个生活中有交互痛点的场景
       （如：校园二手交易、自习室预约、健康打卡等）

2. 需求分析
   └── 目标用户、使用场景、核心功能、痛点分析

3. 使用 open-design 生成原型
   └── 选择 mobile-app / web-prototype skill
   └── 选择合适的设计系统
   └── 填写 brief 和 discovery form
   └── 迭代优化直到满意

4. 截图记录每个交互步骤
   └── 每个页面状态至少一张截图
   └── 关键交互过程（点击、跳转、反馈）截图

5. 撰写报告
   └── 需求分析 → 概念设计 → 交互流程设计 → 交互界面设计 → 可用性验证
   └── 每个截图旁标注运用了哪些 HCI 知识点（给分点！）
   └── 报告不超过 25 页

6. 准备运行方式
   └── 将生成的 HTML 文件打包，说明如何用浏览器离线打开
   └── 或录制一个操作视频

7. 提交
   └── PPT + PDF 报告 + 源代码压缩包
   └── 邮件命名：团队/项目名称_人机交互项目报告
   └── 发送至：zkni_courses@outlook.com
```

---

## 六、open-design 输出文件说明

open-design 生成的产物通常位于：
```
open-design/.od/projects/<项目ID>/
```

你可以从中获取：
- `index.html` — 可直接用浏览器打开的单页原型
- 相关 CSS/JS 资源文件
- 截图保存在 `.od/artifacts/` 中

这些文件可以直接作为 **源代码压缩包** 提交，也可以在报告中说明 "用浏览器打开 index.html 即可离线运行"。

---

*本指南由 Claude 整理，如有疑问可参考 open-design 官方文档：*
- [open-design GitHub](https://github.com/nexu-io/open-design)
- [QUICKSTART.md](https://github.com/nexu-io/open-design/blob/main/QUICKSTART.md)
