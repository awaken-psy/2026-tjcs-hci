<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ScreenView from '@/components/layout/ScreenView.vue'
import BackButton from '@/components/ui/BackButton.vue'
import ListRow from '@/components/ui/ListRow.vue'
import CodeIcon from '@/components/icons/CodeIcon.vue'
import PenIcon from '@/components/icons/PenIcon.vue'
import InfoIcon from '@/components/icons/InfoIcon.vue'
import SettingsIcon from '@/components/icons/SettingsIcon.vue'
import BarChartIcon from '@/components/icons/BarChartIcon.vue'
import MonitorIcon from '@/components/icons/MonitorIcon.vue'
import FileIcon from '@/components/icons/FileIcon.vue'

const router = useRouter()

const STORAGE_KEY = 'ai-interviewer-search-history'
const MAX_HISTORY = 10

// --- State ---
const searchQuery = ref('')
const inputRef = ref<HTMLInputElement | null>(null)
const searchHistory = ref<string[]>([])
const showAllHistory = ref(false)

// --- Data sources ---

interface JobData {
  id: string
  name: string
  count: string
  company: string
  icon: any
}

const jobs: JobData[] = [
  { id: '技术开发', name: '技术开发', count: '326 题', company: '字节跳动 / 阿里巴巴 / 腾讯', icon: CodeIcon },
  { id: '产品经理', name: '产品经理', count: '189 题', company: '美团 / 拼多多 / 小红书', icon: PenIcon },
  { id: '运营', name: '运营', count: '145 题', company: '字节跳动 / 快手 / 小红书', icon: InfoIcon },
  { id: '市场营销', name: '市场营销', count: '112 题', company: '阿里巴巴 / 京东 / 美团', icon: SettingsIcon },
  { id: '设计', name: '设计', count: '98 题', company: '字节跳动 / 腾讯 / 网易', icon: MonitorIcon },
  { id: '数据分析', name: '数据分析', count: '134 题', company: '美团 / 滴滴 / 蚂蚁集团', icon: BarChartIcon },
]

interface QuestionData {
  id: string
  title: string
  job: string
  difficulty: string
}

const questions: QuestionData[] = [
  { id: 'q1', title: 'React 中的 Fiber 架构解决了什么问题？', job: '技术开发', difficulty: '高级' },
  { id: 'q2', title: '如何设计一个高可用的消息队列系统？', job: '技术开发', difficulty: '高级' },
  { id: 'q3', title: '解释一下浏览器的 Event Loop 机制', job: '技术开发', difficulty: '中级' },
  { id: 'q4', title: 'Vue 3 的 Composition API 与 Options API 对比', job: '技术开发', difficulty: '中级' },
  { id: 'q5', title: '如何做竞品分析？请描述你的方法论', job: '产品经理', difficulty: '中级' },
  { id: 'q6', title: '设计一个打车 App 的定价策略', job: '产品经理', difficulty: '高级' },
  { id: 'q7', title: '如何评估一场运营活动的 ROI？', job: '运营', difficulty: '中级' },
  { id: 'q8', title: 'SQL 中 JOIN 的各种类型及性能差异', job: '数据分析', difficulty: '中级' },
  { id: 'q9', title: '设计一个用户增长实验的 A/B 测试方案', job: '市场营销', difficulty: '高级' },
  { id: 'q10', title: '移动端适配方案：rem、vw、px 对比', job: '设计', difficulty: '初级' },
  { id: 'q11', title: 'TypeScript 中 type 和 interface 的区别', job: '技术开发', difficulty: '初级' },
  { id: 'q12', title: '如何写出好的 PRD 文档？', job: '产品经理', difficulty: '初级' },
]

interface HistoryData {
  id: string
  title: string
  subtitle: string
  score: number
  icon: any
}

const histories: HistoryData[] = [
  { id: 'h1', title: '前端开发工程师 · 中级', subtitle: '5月8日 · 8 分钟 · 结构化面试', score: 80, icon: CodeIcon },
  { id: 'h2', title: '产品经理 · 初级', subtitle: '5月6日 · 15 分钟 · 案例分析', score: 76, icon: PenIcon },
  { id: 'h3', title: '前端开发工程师 · 高级', subtitle: '5月3日 · 30 分钟 · 技术问答', score: 72, icon: CodeIcon },
  { id: 'h4', title: '数据分析师 · 中级', subtitle: '4月28日 · 20 分钟 · 结构化面试', score: 88, icon: BarChartIcon },
]

const hotSearches = [
  'React Fiber 架构',
  '系统设计面试题',
  '前端工程师 字节跳动',
  '产品经理 PRD 模板',
  'Event Loop 原理',
  'SQL 优化技巧',
  'Vue 3 面试题',
  '数据分析师 SQL',
]

// --- Computed ---

const q = computed(() => searchQuery.value.trim().toLowerCase())

const filteredJobs = computed(() => {
  if (!q.value) return []
  return jobs.filter(
    (j) =>
      j.name.toLowerCase().includes(q.value) ||
      j.company.toLowerCase().includes(q.value)
  )
})

const filteredQuestions = computed(() => {
  if (!q.value) return []
  return questions.filter(
    (item) =>
      item.title.toLowerCase().includes(q.value) ||
      item.job.toLowerCase().includes(q.value)
  )
})

const filteredHistories = computed(() => {
  if (!q.value) return []
  return histories.filter(
    (h) =>
      h.title.toLowerCase().includes(q.value) ||
      h.subtitle.toLowerCase().includes(q.value)
  )
})

const hasResults = computed(
  () =>
    filteredJobs.value.length > 0 ||
    filteredQuestions.value.length > 0 ||
    filteredHistories.value.length > 0
)

const visibleHistory = computed(() => {
  if (showAllHistory.value) return searchHistory.value
  return searchHistory.value.slice(0, 5)
})

// --- Methods ---

function loadHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    searchHistory.value = raw ? JSON.parse(raw) : []
  } catch {
    searchHistory.value = []
  }
}

function saveHistory() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(searchHistory.value))
}

function doSearch(term: string) {
  if (!term.trim()) return
  const trimmed = term.trim()
  searchHistory.value = [
    trimmed,
    ...searchHistory.value.filter((h) => h !== trimmed),
  ].slice(0, MAX_HISTORY)
  saveHistory()
  searchQuery.value = trimmed
  showAllHistory.value = false
}

function clearHistory() {
  searchHistory.value = []
  saveHistory()
}

function clearInput() {
  searchQuery.value = ''
  inputRef.value?.focus()
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter') {
    doSearch(searchQuery.value)
  }
}

function removeHistoryItem(idx: number) {
  searchHistory.value.splice(idx, 1)
  saveHistory()
}

function goBack() {
  router.back()
}

function goToJobDetail() {
  router.push('/job-detail')
}

function goToQuestionDetail(id: string) {
  router.push(`/question-detail/${id}`)
}

function goToFeedback() {
  router.push('/feedback')
}

// --- Lifecycle ---

onMounted(() => {
  loadHistory()
})
</script>

<template>
  <ScreenView>
    <div class="page stack" style="padding-top: 16px;">
      <!-- Header: Back + Title -->
      <div class="row-between pad">
        <BackButton @click="goBack" />
        <h1 class="title">搜索</h1>
        <div class="placeholder-w" />
      </div>

      <!-- Search input -->
      <div class="search-wrap pad" style="margin-top: 12px;">
        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          ref="inputRef"
          v-model="searchQuery"
          type="text"
          class="search-input"
          placeholder="搜索岗位、题目、面试记录…"
          @keydown="onKeydown"
        />
        <button
          v-if="searchQuery"
          class="clear-btn"
          @click="clearInput"
          aria-label="清除搜索"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </button>
      </div>

      <!-- ============================================ -->
      <!-- EMPTY QUERY STATE: History + Hot searches    -->
      <!-- ============================================ -->
      <template v-if="!q">
        <!-- Search History -->
        <div v-if="searchHistory.length > 0" class="section pad" style="margin-top: 20px;" data-od-id="search-history">
          <div class="section-head">
            <span class="section-label">搜索历史</span>
            <button class="clear-history-btn" @click="clearHistory">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
              </svg>
            </button>
          </div>
          <div class="history-tags">
            <button
              v-for="(item, idx) in visibleHistory"
              :key="item"
              class="history-tag"
              @click="doSearch(item)"
            >
              <span>{{ item }}</span>
              <span
                class="tag-close"
                @click.stop="removeHistoryItem(idx)"
                aria-label="移除搜索历史"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </span>
            </button>
          </div>
          <button
            v-if="searchHistory.length > 5"
            class="expand-btn"
            @click="showAllHistory = !showAllHistory"
          >
            {{ showAllHistory ? '收起' : `查看全部 ${searchHistory.length} 条` }}
          </button>
        </div>

        <!-- Hot Searches -->
        <div class="section pad" style="margin-top: 20px;" data-od-id="hot-searches">
          <span class="section-label">热门搜索</span>
          <div class="hot-list">
            <button
              v-for="(term, idx) in hotSearches"
              :key="term"
              class="hot-item"
              @click="doSearch(term)"
            >
              <span class="hot-rank" :class="{ 'rank-top': idx < 3 }">{{ idx + 1 }}</span>
              <span class="hot-term">{{ term }}</span>
            </button>
          </div>
        </div>
      </template>

      <!-- ============================================ -->
      <!-- SEARCH RESULTS (when query is non-empty)     -->
      <!-- ============================================ -->
      <template v-else>
        <div class="results-wrap pad" data-od-id="search-results">
          <!-- No results -->
          <div v-if="!hasResults" class="no-result">
            <svg class="no-result-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
            <p class="no-result-text">未找到「{{ searchQuery }}」的相关结果</p>
            <p class="no-result-hint">试试调整关键词，或使用热门搜索中的词条</p>
          </div>

          <!-- Job results -->
          <div v-if="filteredJobs.length > 0" class="result-section" data-od-id="result-jobs">
            <span class="section-label">岗位 · {{ filteredJobs.length }} 个</span>
            <div class="job-results">
              <div
                v-for="job in filteredJobs"
                :key="job.id"
                class="job-result-card"
                @click="goToJobDetail"
              >
                <div class="job-result-icon">
                  <component :is="job.icon" />
                </div>
                <div class="job-result-body">
                  <div class="job-result-name">{{ job.name }}</div>
                  <div class="job-result-meta">{{ job.count }} · {{ job.company }}</div>
                </div>
                <svg class="job-result-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Question results -->
          <div v-if="filteredQuestions.length > 0" class="result-section" data-od-id="result-questions">
            <span class="section-label">题目 · {{ filteredQuestions.length }} 题</span>
            <div class="question-results">
              <div
                v-for="item in filteredQuestions"
                :key="item.id"
                class="question-result-card"
                @click="goToQuestionDetail(item.id)"
              >
                <div class="question-result-icon">
                  <FileIcon />
                </div>
                <div class="question-result-body">
                  <div class="question-result-title">{{ item.title }}</div>
                  <div class="question-result-meta">
                    <span class="q-tag">{{ item.job }}</span>
                    <span class="q-diff">{{ item.difficulty }}</span>
                  </div>
                </div>
                <svg class="job-result-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </div>
          </div>

          <!-- History results -->
          <div v-if="filteredHistories.length > 0" class="result-section" data-od-id="result-history">
            <span class="section-label">面试记录 · {{ filteredHistories.length }} 条</span>
            <ListRow
              v-for="item in filteredHistories"
              :key="item.id"
              :title="item.title"
              :subtitle="item.subtitle"
              :score="item.score"
              @click="goToFeedback"
            >
              <template #icon>
                <component :is="item.icon" />
              </template>
            </ListRow>
          </div>
        </div>
      </template>
    </div>
  </ScreenView>
</template>

<style scoped>
.pad { padding-inline: 20px; }
.stack { display: flex; flex-direction: column; }
.row-between { display: flex; align-items: center; justify-content: space-between; gap: 8px; }

.placeholder-w { width: 40px; }

.title {
  font-family: var(--font-display);
  font-size: 22px;
  letter-spacing: -0.02em;
  margin: 0;
}

/* ---- Search input ---- */
.search-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 32px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  stroke: var(--muted);
  z-index: 1;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 12px 40px 12px 42px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--fg);
  font-size: 15px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.15s;
}

.search-input::placeholder {
  color: var(--border);
}

.search-input:focus {
  border-color: var(--accent);
}

.clear-btn {
  position: absolute;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: var(--muted);
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: color 0.15s;
}

.clear-btn svg {
  width: 16px;
  height: 16px;
}

.clear-btn:hover {
  color: var(--fg);
}

/* ---- Sections ---- */
.section {
  display: flex;
  flex-direction: column;
}

.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.section-label {
  font-family: var(--font-mono);
  font-size: var(--fs-meta);
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.clear-history-btn {
  width: 28px;
  height: 28px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: var(--muted);
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: color 0.15s;
}

.clear-history-btn svg {
  width: 15px;
  height: 15px;
}

.clear-history-btn:hover {
  color: var(--fg);
}

/* ---- Search History ---- */
.history-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.history-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px 6px 14px;
  border-radius: var(--radius-pill);
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--fg);
  font-size: 13px;
  font-family: inherit;
  cursor: pointer;
  transition: border-color 0.15s;
}

.history-tag:active {
  border-color: var(--accent);
}

.tag-close {
  display: grid;
  place-items: center;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  color: var(--muted);
  transition: color 0.15s;
}

.tag-close svg {
  width: 12px;
  height: 12px;
}

.tag-close:hover {
  color: var(--fg);
}

.expand-btn {
  margin-top: 10px;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--accent);
  font-size: 12px;
  font-family: inherit;
  cursor: pointer;
  align-self: flex-start;
}

/* ---- Hot Searches ---- */
.hot-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 10px;
}

.hot-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 12px;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: var(--fg);
  font-size: 14px;
  font-family: inherit;
  text-align: left;
  cursor: pointer;
  transition: background 0.12s;
}

.hot-item:active {
  background: var(--fg-soft);
}

.hot-rank {
  width: 20px;
  text-align: center;
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
  color: var(--muted);
}

.hot-rank.rank-top {
  color: var(--accent);
  font-weight: 600;
}

.hot-term {
  line-height: 1.4;
}

/* ---- No results ---- */
.no-result {
  text-align: center;
  padding: 64px 20px 0;
}

.no-result-icon {
  width: 48px;
  height: 48px;
  stroke: var(--border);
  margin-bottom: 16px;
}

.no-result-text {
  font-size: 15px;
  font-weight: 500;
  margin: 0 0 6px;
  color: var(--fg);
}

.no-result-hint {
  font-size: 13px;
  color: var(--muted);
  margin: 0;
  line-height: 1.5;
}

/* ---- Results ---- */
.results-wrap {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 32px;
}

.result-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Job result card (compact) */
.job-results {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.job-result-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 14px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  cursor: pointer;
  transition: border-color 0.15s;
}

.job-result-card:active {
  border-color: var(--accent);
}

.job-result-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--accent-soft);
  color: var(--accent);
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.job-result-icon :deep(svg) {
  width: 20px;
  height: 20px;
}

.job-result-body {
  flex: 1;
  min-width: 0;
}

.job-result-name {
  font-size: 14px;
  font-weight: 500;
  line-height: 1.3;
}

.job-result-meta {
  font-size: 12px;
  color: var(--muted);
  font-family: var(--font-mono);
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.job-result-chev {
  width: 18px;
  height: 18px;
  stroke: var(--border);
  flex-shrink: 0;
}

/* Question result card */
.question-results {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.question-result-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 14px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  cursor: pointer;
  transition: border-color 0.15s;
}

.question-result-card:active {
  border-color: var(--accent);
}

.question-result-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--fg-soft);
  color: var(--muted);
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.question-result-icon :deep(svg) {
  width: 20px;
  height: 20px;
}

.question-result-body {
  flex: 1;
  min-width: 0;
}

.question-result-title {
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.question-result-meta {
  display: flex;
  gap: 6px;
  margin-top: 4px;
}

.q-tag {
  padding: 2px 8px;
  border-radius: 999px;
  background: var(--accent-soft);
  color: var(--accent);
  font-size: 11px;
  font-family: var(--font-mono);
}

.q-diff {
  padding: 2px 8px;
  border-radius: 999px;
  background: var(--fg-soft);
  color: var(--muted);
  font-size: 11px;
  font-family: var(--font-mono);
}
</style>
