<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ScreenView from '@/components/layout/ScreenView.vue'
import BackButton from '@/components/ui/BackButton.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import DifficultyBadge from '@/components/ui/DifficultyBadge.vue'
import CompanyLogo from '@/components/ui/CompanyLogo.vue'
import TopicTag from '@/components/ui/TopicTag.vue'
import PlayIcon from '@/components/icons/PlayIcon.vue'

const router = useRouter()
const route = useRoute()

const expandedIndex = ref<number | null>(null)

const job = {
  title: '前端开发工程师',
  company: '字节跳动',
  salary: '25K - 40K',
  level: '中级' as const,
  location: '北京 / 上海 / 杭州',
  type: '社招',
  topics: ['算法', '前端基础', '系统设计', '项目经验', '网络'],
  stats: {
    passRate: 68,
    participants: 1243,
    avgDuration: '28 分钟',
    questions: 326,
    rating: 4.7,
  },
  previews: [
    {
      title: '实现一个支持虚拟滚动的长列表组件',
      desc: '要求支持固定高度和动态高度两种模式，考虑性能优化和边界情况处理。',
    },
    {
      title: '手写 Promise.all 及其错误处理机制',
      desc: '实现 Promise.all，处理任一 reject 场景，并支持全部完成后返回结果数组。',
    },
    {
      title: '从输入 URL 到页面渲染的完整流程',
      desc: '描述浏览器从 DNS 解析、TCP 连接、HTTP 请求到渲染引擎工作的完整链路。',
    },
  ],
}

function togglePreview(i: number) {
  expandedIndex.value = expandedIndex.value === i ? null : i
}

function goBack() {
  const from = route.query.from
  if (from === 'home') router.push('/home')
  else if (from === 'jobs') router.push('/jobs')
  else router.push('/home')
}

function startInterview() {
  router.push('/pre-interview')
}
</script>

<template>
  <ScreenView>
    <div class="pad stack" style="padding-top: 12px; gap: 16px; padding-bottom: 100px;">
      <BackButton @click="goBack" />

      <!-- Header -->
      <div class="header-section">
        <div class="row" style="gap: 12px;">
          <CompanyLogo :name="job.company" :size="48" />
          <div>
            <div class="job-title">{{ job.title }}</div>
            <div class="job-company">{{ job.company }} · {{ job.location }}</div>
          </div>
        </div>
        <div class="row" style="gap: 8px; margin-top: 12px; flex-wrap: wrap;">
          <DifficultyBadge :level="job.level" />
          <span class="meta-pill">{{ job.type }}</span>
          <span class="meta-pill accent">{{ job.salary }}</span>
        </div>
      </div>

      <!-- Stats -->
      <AppCard padding="16px">
        <div class="stat-grid">
          <div class="stat-item">
            <div class="stat-num">{{ job.stats.passRate }}%</div>
            <div class="stat-label">平均通过率</div>
          </div>
          <div class="stat-item">
            <div class="stat-num">{{ job.stats.participants }}</div>
            <div class="stat-label">参与人数</div>
          </div>
          <div class="stat-item">
            <div class="stat-num">{{ job.stats.avgDuration }}</div>
            <div class="stat-label">平均时长</div>
          </div>
          <div class="stat-item">
            <div class="stat-num">{{ job.stats.rating }}</div>
            <div class="stat-label">用户评分</div>
          </div>
        </div>
      </AppCard>

      <!-- Topics -->
      <section>
        <p class="section-label">考察维度 · {{ job.topics.length }} 项</p>
        <div class="topic-wrap">
          <TopicTag v-for="t in job.topics" :key="t" :label="t" />
        </div>
      </section>

      <!-- Question Previews -->
      <section>
        <div class="row-between">
          <p class="section-label">真题预览 · {{ job.previews.length }} 题</p>
          <span class="meta">共 {{ job.stats.questions }} 题</span>
        </div>
        <div class="preview-list">
          <AppCard
            v-for="(q, i) in job.previews"
            :key="i"
            padding="14px 16px"
            class="preview-card"
            @click="togglePreview(i)"
          >
            <div class="row-between">
              <span class="preview-title">{{ q.title }}</span>
              <span class="preview-toggle">{{ expandedIndex === i ? '收起' : '展开' }}</span>
            </div>
            <p v-if="expandedIndex === i" class="preview-desc">{{ q.desc }}</p>
          </AppCard>
        </div>
      </section>
    </div>

    <!-- Floating CTA -->
    <div class="floating-cta">
      <AppButton @click="startInterview">
        <PlayIcon class="btn-icon" />
        开始面试
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

.header-section {
  margin-top: 4px;
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

.job-title {
  font-size: 22px;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.job-company {
  font-size: 13px;
  color: var(--muted);
  margin-top: 2px;
}

.meta-pill {
  display: inline-flex;
  padding: 3px 10px;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 999px;
  font-size: 12px;
  color: var(--muted);
  font-family: var(--font-mono);
}

.meta-pill.accent {
  color: var(--accent);
  border-color: color-mix(in oklch, var(--accent) 30%, transparent);
  background: var(--accent-soft);
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  text-align: center;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-num {
  font-family: var(--font-mono);
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.stat-label {
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

.topic-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.preview-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.preview-card {
  cursor: pointer;
  transition: border-color 0.15s;
}

.preview-card:hover {
  border-color: var(--accent);
}

.preview-title {
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
}

.preview-toggle {
  font-size: 12px;
  color: var(--accent);
  font-weight: 500;
  flex-shrink: 0;
}

.preview-desc {
  margin: 8px 0 0;
  font-size: 13px;
  color: var(--muted);
  line-height: 1.55;
}

.meta {
  font-family: var(--font-mono);
  font-size: var(--fs-meta);
  color: var(--muted);
  margin: 0;
}

.floating-cta {
  position: sticky;
  bottom: 0;
  margin-top: auto;
  padding: 12px 20px 24px;
  background: linear-gradient(to top, var(--bg) 70%, transparent);
  z-index: 10;
}

.btn-icon {
  width: 18px;
  height: 18px;
  stroke: currentColor;
  fill: none;
  stroke-width: 2;
  margin-right: 8px;
}
</style>
