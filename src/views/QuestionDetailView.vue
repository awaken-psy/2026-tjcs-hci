<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ScreenView from '@/components/layout/ScreenView.vue'
import BackButton from '@/components/ui/BackButton.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import TopicTag from '@/components/ui/TopicTag.vue'
import ConfidenceMeter from '@/components/ui/ConfidenceMeter.vue'

const router = useRouter()
const route = useRoute()

const showReference = ref(false)

const questionDB: Record<string, {
  id: string
  title: string
  job: string
  topic: string
  difficulty: 'easy' | 'medium' | 'hard'
  date: string
  practiced: boolean
  description: string
  keyPoints: string[]
  userAnswer?: string
  userScore?: number
  aiComment?: { positives: string[]; negatives: string[] }
  referenceAnswer: string
}> = {
  '1': {
    id: '1',
    title: '实现一个支持虚拟滚动的长列表组件',
    job: '前端开发工程师',
    topic: '前端基础',
    difficulty: 'medium',
    date: '5月8日',
    practiced: true,
    description: '在移动端 H5 场景中，需要渲染一个包含数万条数据的列表。请设计并实现一个支持虚拟滚动的长列表组件，要求兼容动态高度项，并能在快速滚动时不出现白屏。',
    keyPoints: ['虚拟滚动原理', 'DOM 节点复用', '动态高度计算', '滚动性能优化'],
    userAnswer: '我使用了 requestAnimationFrame 配合 translateY 来控制视口内元素的渲染，同时维护一个缓冲池来复用 DOM 节点，减少创建和销毁开销。',
    userScore: 82,
    aiComment: {
      positives: ['提到了 requestAnimationFrame 和缓冲池，思路清晰', '考虑了 DOM 复用，有性能意识'],
      negatives: ['未提及 ResizeObserver 动态测量高度', '缺少对快速滚动时空白区域的兜底处理'],
    },
    referenceAnswer: '1. 使用 ResizeObserver 缓存每项高度；2. 滚动时根据累计高度计算 startIndex；3. 设置 overscan 缓冲行数避免白屏；4. 兼容动态高度时使用二分查找定位。',
  },
  '2': {
    id: '2',
    title: '手写 Promise.all 及其错误处理机制',
    job: '前端开发工程师',
    topic: '算法',
    difficulty: 'medium',
    date: '5月8日',
    practiced: false,
    description: '请在不使用原生 Promise.all 的前提下，手写一个 all 函数的实现。要求支持类 Promise 对象，当任一 Promise reject 时整个结果立即 reject，并正确处理空数组等边界情况。',
    keyPoints: ['Promise 规范理解', '并发控制', '错误传播', '边界条件'],
    referenceAnswer: '核心思路：遍历传入的可迭代对象，用计数器记录已完成的 Promise 数量。每个 Promise resolve 后将结果存入对应索引的数组，计数器 +1，当计数器等于总数时 resolve 结果数组。任一 Promise reject 时立即 reject。需要处理非 Promise 值（用 Promise.resolve 包裹）、空数组等边界情况。',
  },
  '3': {
    id: '3',
    title: '设计一个高并发下的秒杀系统',
    job: '后端开发工程师',
    topic: '系统设计',
    difficulty: 'hard',
    date: '5月6日',
    practiced: false,
    description: '电商秒杀场景中，QPS 可达数十万，需在保证库存不超卖的前提下尽量提高吞吐量。请从架构层面设计一个高可用的秒杀系统，涵盖前端、网关、服务层和存储层。',
    keyPoints: ['库存扣减一致性', '流量削峰', '缓存与限流', '异步化与最终一致性'],
    referenceAnswer: '1. 前端：按钮防重 + 验证码 + 静态化；2. 网关：令牌桶/漏桶限流 + 黑名单；3. 服务层：Redis 预扣库存 + Lua 原子操作；4. 存储层：消息队列异步扣减 DB 库存；5. 降级方案：排队 / 秒杀令牌制。核心原则是尽可能在 Redis 层完成库存扣减，DB 只做最终一致性保证。',
  },
  '4': {
    id: '4',
    title: '描述一次你与产品经理意见不一致的经历',
    job: '产品经理',
    topic: '行为面',
    difficulty: 'easy',
    date: '5月3日',
    practiced: true,
    description: '在团队协作中，技术人员与产品经理之间经常会因为技术可行性和业务需求产生分歧。请描述一次你遇到的真实情况，你是如何处理分歧并推动项目前进的。',
    keyPoints: ['冲突处理能力', '沟通技巧', '数据驱动决策', '结果导向'],
    userAnswer: '在一次迭代中，产品经理要求一周内上线一个复杂表单功能。我评估后认为时间不足以做好性能和可访问性，于是提出先用两页分步表单替代一页长表单的折中方案，并展示了分步表单的用户测试数据。最终产品经理同意了这个方案。',
    userScore: 85,
    aiComment: {
      positives: ['展示了数据驱动的沟通方式', '提出了具体的折中方案而非单纯拒绝'],
      negatives: ['可以补充后续迭代的计划，让 PM 看到完整路线图'],
    },
    referenceAnswer: '行为面题没有标准答案，但好的回答通常遵循 STAR 结构：Situation（背景）→ Task（任务）→ Action（行动）→ Result（结果）。重点展示你如何平衡技术与业务的矛盾，以及最终为团队创造了什么价值。',
  },
}

const q = computed(() => questionDB[route.params.id as string] || questionDB['1'])

const diffLabel: Record<string, string> = { easy: '简单', medium: '中等', hard: '困难' }
const diffColor: Record<string, string> = {
  easy: 'oklch(55% 0.14 145)',
  medium: 'oklch(55% 0.12 50)',
  hard: 'oklch(55% 0.18 25)',
}

function goBack() {
  router.back()
}

function startPractice() {
  router.push('/setup')
}
</script>

<template>
  <ScreenView>
    <div class="pad stack" style="padding-top: 12px; gap: 16px; padding-bottom: 24px;">
      <div class="row-between">
        <BackButton @click="goBack" />
      </div>

      <!-- Header -->
      <div>
        <div class="row" style="gap: 8px; margin-bottom: 10px;">
          <TopicTag :label="q.topic" />
          <span class="diff-tag" :style="{ color: diffColor[q.difficulty] }">
            {{ diffLabel[q.difficulty] }}
          </span>
        </div>
        <h1 class="h2">{{ q.title }}</h1>
        <p class="meta">{{ q.job }} · 收藏于 {{ q.date }}</p>
      </div>

      <!-- Question Description -->
      <AppCard padding="16px">
        <p class="section-label">题目描述</p>
        <p class="desc-text">{{ q.description }}</p>
        <div class="key-points" style="margin-top: 12px;">
          <span class="kp-label">考察要点</span>
          <div class="row" style="gap: 6px; flex-wrap: wrap; margin-top: 6px;">
            <span v-for="kp in q.keyPoints" :key="kp" class="kp-tag">{{ kp }}</span>
          </div>
        </div>
      </AppCard>

      <!-- Your Answer (if practiced) -->
      <AppCard v-if="q.practiced && q.userAnswer" padding="16px">
        <div class="row-between" style="margin-bottom: 6px;">
          <p class="section-label" style="margin-bottom: 0;">你的回答</p>
          <ConfidenceMeter v-if="q.userScore" :score="q.userScore" :size="32" />
        </div>
        <p class="desc-text">{{ q.userAnswer }}</p>

        <!-- AI Review -->
        <div v-if="q.aiComment" class="ai-review">
          <p class="review-label">AI 点评</p>
          <ul class="comment-list">
            <li v-for="(p, pi) in q.aiComment.positives" :key="'+' + pi" class="comment-pos">
              <span>+ {{ p }}</span>
            </li>
            <li v-for="(n, ni) in q.aiComment.negatives" :key="'-' + ni" class="comment-neg">
              <span>– {{ n }}</span>
            </li>
          </ul>
        </div>
      </AppCard>

      <!-- Not practiced hint -->
      <AppCard v-if="!q.practiced" padding="16px" variant="flat">
        <div class="unpracticed-hint">
          <div class="hint-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          <p class="hint-title">尚未练习</p>
          <p class="hint-desc">这道题收藏后还未练习过，下方为参考答案。</p>
        </div>
      </AppCard>

      <!-- Reference Answer -->
      <AppCard padding="16px">
        <div class="row-between" style="cursor: pointer;" @click="showReference = !showReference">
          <p class="section-label" style="margin-bottom: 0;">参考答案</p>
          <span class="toggle-ref">{{ showReference ? '收起' : '展开' }}</span>
        </div>
        <p v-if="showReference" class="desc-text ref-text">{{ q.referenceAnswer }}</p>
        <p v-else class="ref-placeholder">点击展开查看参考答案</p>
      </AppCard>

      <!-- Bottom CTA -->
      <AppButton @click="startPractice">
        {{ q.practiced ? '再练一次' : '开始练习' }}
      </AppButton>
    </div>
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

.h2 {
  font-family: var(--font-display);
  font-size: var(--fs-h2);
  letter-spacing: -0.015em;
  line-height: 1.3;
  margin: 0;
}

.meta {
  font-family: var(--font-mono);
  font-size: var(--fs-meta);
  color: var(--muted);
  margin: 6px 0 0;
}

.diff-tag {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
}

.section-label {
  font-family: var(--font-mono);
  font-size: var(--fs-meta);
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin: 0 0 8px;
}

.desc-text {
  margin: 0;
  font-size: 14px;
  line-height: 1.65;
  color: var(--fg);
}

.key-points {
  border-top: 1px solid var(--border);
  padding-top: 10px;
}

.kp-label {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.kp-tag {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  background: var(--bg);
  border: 1px solid var(--border);
  color: var(--fg);
}

.ai-review {
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid var(--border);
}

.review-label {
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0 0 8px;
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

.ref-text {
  margin-top: 10px;
  background: var(--bg);
  padding: 12px;
  border-radius: 10px;
  border: 1px solid var(--border);
  color: var(--muted);
}

.ref-placeholder {
  margin: 6px 0 0;
  font-size: 13px;
  color: var(--border);
}

.unpracticed-hint {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 12px 0;
}

.hint-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--fg-soft);
  color: var(--border);
  display: grid;
  place-items: center;
  margin-bottom: 10px;
}

.hint-icon svg {
  width: 20px;
  height: 20px;
}

.hint-title {
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 4px;
}

.hint-desc {
  font-size: 12px;
  color: var(--muted);
  margin: 0;
}
</style>
