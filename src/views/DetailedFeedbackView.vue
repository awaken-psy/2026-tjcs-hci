<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ScreenView from '@/components/layout/ScreenView.vue'
import BackButton from '@/components/ui/BackButton.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import ScoreRing from '@/components/ui/ScoreRing.vue'
import ProgressBar from '@/components/ui/ProgressBar.vue'
import BookmarkButton from '@/components/ui/BookmarkButton.vue'
import ConfidenceMeter from '@/components/ui/ConfidenceMeter.vue'
import ShareCard from '@/components/ui/ShareCard.vue'
import type { ShareData } from '@/components/ui/ShareCard.vue'

const router = useRouter()

const expandedIndex = ref<number | null>(0)
const showAnswerIndex = ref<number | null>(null)
const showShare = ref(false)

const overall = {
  score: 80,
  dimensions: [
    { label: '表达能力', score: 85 },
    { label: '逻辑思维', score: 78 },
    { label: '专业知识', score: 82 },
    { label: '应变能力', score: 75 },
  ],
  historyAvg: 76,
}

const shareData: ShareData = {
  score: 80,
  jobTitle: '前端开发工程师 · 中级',
  date: '2026年5月8日',
  duration: '8 分钟',
  dimensions: overall.dimensions,
  historyAvg: overall.historyAvg,
}

const questions = [
  {
    title: '实现一个支持虚拟滚动的长列表组件',
    userScore: 82,
    userAnswer: '我使用了 requestAnimationFrame 配合 translateY 来控制视口内元素的渲染，同时维护一个缓冲池来复用 DOM 节点，减少创建和销毁开销。',
    aiFollowUp: '如果列表项高度不固定，你会如何计算滚动位置？',
    aiComment: {
      positives: ['提到了 requestAnimationFrame 和缓冲池，思路清晰', '考虑了 DOM 复用，有性能意识'],
      negatives: ['未提及 ResizeObserver 动态测量高度', '缺少对快速滚动时空白区域的兜底处理'],
    },
    referenceAnswer: '1. 使用 ResizeObserver 缓存每项高度；2. 滚动时根据累计高度计算 startIndex；3. 设置 overscan 缓冲行数避免白屏；4. 兼容动态高度时使用二分查找定位。',
  },
  {
    title: '手写 Promise.all 及其错误处理机制',
    userScore: 70,
    userAnswer: '遍历传入的 Promise 数组，用计数器记录完成数量，全部 resolve 后返回结果数组。',
    aiFollowUp: '如果要求在任一 reject 时仍然等待所有 Promise 完成，该如何修改？',
    aiComment: {
      positives: ['核心逻辑正确', '理解并发计数器模式'],
      negatives: ['未处理非 Promise 入参的兼容', '错误处理只考虑了第一个 reject，未说明 allSettled 的差异'],
    },
    referenceAnswer: '标准 Promise.all 在任一 reject 时立即失败。若需等待全部完成，应使用 Promise.allSettled，或对每个 Promise 包一层 .catch 转为 { status, value/reason } 对象。',
  },
  {
    title: '从输入 URL 到页面渲染的完整流程',
    userScore: 88,
    userAnswer: 'DNS 解析 → TCP 三次握手 → TLS 握手 → 发送 HTTP 请求 → 服务器响应 → 浏览器解析 HTML → CSSOM + DOM → 布局 → 绘制 → 合成。',
    aiFollowUp: '',
    aiComment: {
      positives: ['链路完整，关键节点无遗漏', '提到了合成层，说明了解渲染流水线'],
      negatives: ['可补充缓存策略和重排重绘的优化点'],
    },
    referenceAnswer: '1. DNS / 缓存查询；2. TCP + TLS；3. HTTP 请求与响应；4. 解析 HTML 构建 DOM；5. 解析 CSS 构建 CSSOM；6. 生成 Render Tree；7. Layout；8. Paint；9. Composite。过程中还需考虑预解析、资源优先级、事件循环等细节。',
  },
]

function toggleExpand(i: number) {
  expandedIndex.value = expandedIndex.value === i ? null : i
}

function toggleAnswer(i: number) {
  showAnswerIndex.value = showAnswerIndex.value === i ? null : i
}

function goBack() {
  router.push('/feedback')
}

function goHome() {
  router.push('/home')
}

function retry() {
  router.push('/setup')
}
</script>

<template>
  <ScreenView>
    <div class="pad stack" style="padding-top: 12px; gap: 20px; padding-bottom: 24px;">
      <div class="row-between">
        <BackButton @click="goBack" />
        <button class="share-btn" aria-label="分享" @click="showShare = true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
        </button>
      </div>

      <!-- Overall Score -->
      <AppCard padding="20px" class="overall-card">
        <div class="row" style="gap: 20px;">
          <ScoreRing :score="overall.score" :size="100" />
          <div class="flex-1">
            <div class="overall-title">总分 {{ overall.score }}</div>
            <div class="overall-compare">
              较历史平均
              <span :style="{ color: overall.score >= overall.historyAvg ? 'oklch(55% 0.14 145)' : 'oklch(55% 0.16 25)' }">
                {{ overall.score >= overall.historyAvg ? '+' : '' }}{{ overall.score - overall.historyAvg }}
              </span>
            </div>
            <div class="dim-mini">
              <div v-for="d in overall.dimensions" :key="d.label" class="dim-row">
                <span>{{ d.label }}</span>
                <ProgressBar :value="d.score" />
              </div>
            </div>
          </div>
        </div>
      </AppCard>

      <!-- Questions -->
      <section>
        <p class="section-label">逐题回顾 · {{ questions.length }} 题</p>
        <div class="question-list">
          <AppCard
            v-for="(q, i) in questions"
            :key="i"
            padding="16px"
            class="q-card"
          >
            <div class="row-between" style="cursor: pointer;" @click="toggleExpand(i)">
              <div class="row" style="gap: 10px; align-items: flex-start;">
                <ConfidenceMeter :score="q.userScore" :size="36" />
                <div>
                  <div class="q-title">{{ q.title }}</div>
                  <div class="q-meta">得分 {{ q.userScore }} · 点击{{ expandedIndex === i ? '收起' : '展开' }}</div>
                </div>
              </div>
              <BookmarkButton />
            </div>

            <div v-if="expandedIndex === i" class="q-detail">
              <div class="detail-block">
                <p class="detail-label">你的回答</p>
                <p class="detail-text">{{ q.userAnswer }}</p>
              </div>

              <div v-if="q.aiFollowUp" class="detail-block">
                <p class="detail-label">AI 追问</p>
                <p class="detail-text followup">{{ q.aiFollowUp }}</p>
              </div>

              <div class="detail-block">
                <p class="detail-label">AI 点评</p>
                <ul class="comment-list">
                  <li v-for="(p, pi) in q.aiComment.positives" :key="'+' + pi" class="comment-pos">
                    <span>+ {{ p }}</span>
                  </li>
                  <li v-for="(n, ni) in q.aiComment.negatives" :key="'-' + ni" class="comment-neg">
                    <span>– {{ n }}</span>
                  </li>
                </ul>
              </div>

              <div class="detail-block">
                <div class="row-between" style="cursor: pointer;" @click="toggleAnswer(i)">
                  <p class="detail-label">参考答案</p>
                  <span class="toggle-ref">{{ showAnswerIndex === i ? '收起' : '展开' }}</span>
                </div>
                <p v-if="showAnswerIndex === i" class="detail-text ref-text">{{ q.referenceAnswer }}</p>
              </div>
            </div>
          </AppCard>
        </div>
      </section>

      <div class="stack" style="gap: 10px;">
        <AppButton @click="retry">再练一次</AppButton>
        <AppButton variant="secondary" @click="goHome">返回首页</AppButton>
      </div>
    </div>

    <ShareCard v-if="showShare" :data="shareData" @close="showShare = false" />
  </ScreenView>
</template>

<style scoped>
.pad {
  padding-inline: 20px;
}

.stack {
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
  align-items: center;
}

.row-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.flex-1 {
  flex: 1;
}

.share-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 0;
  background: transparent;
  color: var(--muted);
  display: grid;
  place-items: center;
  cursor: pointer;
}

.share-btn svg {
  width: 20px;
  height: 20px;
}

.overall-card {
  background: var(--accent-soft);
  border-color: transparent;
}

.overall-title {
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.overall-compare {
  font-size: 12px;
  color: var(--muted);
  margin-top: 2px;
  font-family: var(--font-mono);
}

.dim-mini {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dim-row {
  display: grid;
  grid-template-columns: 60px 1fr;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: var(--muted);
}

.section-label {
  font-family: var(--font-mono);
  font-size: var(--fs-meta);
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin: 0 0 10px;
}

.question-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.q-card {
  transition: border-color 0.15s;
}

.q-title {
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
}

.q-meta {
  font-size: 11px;
  color: var(--muted);
  font-family: var(--font-mono);
  margin-top: 2px;
}

.q-detail {
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.detail-block {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.detail-label {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0;
}

.detail-text {
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
  color: var(--fg);
}

.detail-text.followup {
  color: var(--accent);
  font-style: italic;
}

.detail-text.ref-text {
  color: var(--muted);
  background: var(--bg);
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid var(--border);
}

.comment-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.comment-list li {
  font-size: 13px;
  line-height: 1.5;
  padding-left: 14px;
  position: relative;
}

.comment-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 7px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.comment-pos {
  color: oklch(45% 0.14 145);
}

.comment-pos::before {
  background: oklch(55% 0.14 145);
}

.comment-neg {
  color: oklch(50% 0.14 25);
}

.comment-neg::before {
  background: oklch(55% 0.16 25);
}

.toggle-ref {
  font-size: 12px;
  color: var(--accent);
  font-weight: 500;
}
</style>
