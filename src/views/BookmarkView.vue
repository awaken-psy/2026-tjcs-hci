<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import ScreenView from '@/components/layout/ScreenView.vue'
import BackButton from '@/components/ui/BackButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import Tag from '@/components/ui/Tag.vue'

const router = useRouter()

const filters = ['全部', '算法', '系统设计', '行为面', '项目经验', '前端基础']
const activeFilter = ref('全部')

const bookmarks = ref([
  {
    id: '1',
    title: '实现一个支持虚拟滚动的长列表组件',
    job: '前端开发工程师',
    topic: '前端基础',
    date: '5月8日',
    practiced: true,
  },
  {
    id: '2',
    title: '手写 Promise.all 及其错误处理机制',
    job: '前端开发工程师',
    topic: '算法',
    date: '5月8日',
    practiced: false,
  },
  {
    id: '3',
    title: '设计一个高并发下的秒杀系统',
    job: '后端开发工程师',
    topic: '系统设计',
    date: '5月6日',
    practiced: false,
  },
  {
    id: '4',
    title: '描述一次你与产品经理意见不一致的经历',
    job: '产品经理',
    topic: '行为面',
    date: '5月3日',
    practiced: true,
  },
])

const filtered = computed(() => {
  if (activeFilter.value === '全部') return bookmarks.value
  return bookmarks.value.filter((b) => b.topic === activeFilter.value)
})

function removeBookmark(id: string) {
  bookmarks.value = bookmarks.value.filter((b) => b.id !== id)
}

function goBack() {
  router.push('/profile')
}

function goPractice(id: string) {
  router.push('/question-detail/' + id)
}
</script>

<template>
  <ScreenView>
    <div class="pad stack" style="padding-top: 12px; gap: 16px; padding-bottom: 24px;">
      <BackButton @click="goBack" />

      <h1 class="h2">我的收藏</h1>

      <!-- Filters -->
      <div class="filter-bar">
        <button
          v-for="f in filters"
          :key="f"
          class="filter-btn"
          :class="{ active: activeFilter === f }"
          @click="activeFilter = f"
        >
          {{ f }}
        </button>
      </div>

      <!-- Empty State -->
      <div v-if="filtered.length === 0" class="empty-state">
        <div class="empty-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
          </svg>
        </div>
        <p class="empty-title">暂无收藏</p>
        <p class="empty-desc">在详细报告中收藏题目，即可在这里集中复习</p>
      </div>

      <!-- List -->
      <div v-else class="bookmark-list">
        <AppCard
          v-for="b in filtered"
          :key="b.id"
          padding="14px 16px"
          class="bookmark-card"
          @click="goPractice(b.id)"
        >
          <div class="row-between" style="align-items: flex-start;">
            <div class="flex-1">
              <div class="b-title">{{ b.title }}</div>
              <div class="b-meta">
                <Tag>{{ b.job }}</Tag>
                <span class="b-date">{{ b.date }}</span>
                <span v-if="b.practiced" class="b-practiced">已练习</span>
              </div>
            </div>
            <button
              class="remove-btn"
              aria-label="取消收藏"
              @click.stop="removeBookmark(b.id)"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </AppCard>
      </div>
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

.h2 {
  font-family: var(--font-display);
  font-size: var(--fs-h2);
  letter-spacing: -0.015em;
  line-height: 1.2;
  margin: 0;
}

.filter-bar {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding-bottom: 4px;
  -webkit-overflow-scrolling: touch;
}

.filter-bar::-webkit-scrollbar {
  display: none;
}

.filter-btn {
  flex-shrink: 0;
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--muted);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.15s;
  font-family: inherit;
}

.filter-btn.active {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.empty-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--fg-soft);
  color: var(--border);
  display: grid;
  place-items: center;
  margin-bottom: 16px;
}

.empty-icon svg {
  width: 24px;
  height: 24px;
}

.empty-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 6px;
}

.empty-desc {
  font-size: 13px;
  color: var(--muted);
  margin: 0;
  line-height: 1.5;
}

.bookmark-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.bookmark-card {
  cursor: pointer;
  transition: border-color 0.15s;
}

.bookmark-card:hover {
  border-color: var(--accent);
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

.b-title {
  font-size: 14px;
  font-weight: 500;
  line-height: 1.4;
}

.b-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  flex-wrap: wrap;
}

.b-date {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--muted);
}

.b-practiced {
  font-size: 11px;
  color: oklch(55% 0.14 145);
  font-family: var(--font-mono);
}

.remove-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 0;
  background: transparent;
  color: var(--border);
  display: grid;
  place-items: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: color 0.15s;
}

.remove-btn:hover {
  color: oklch(55% 0.16 25);
}

.remove-btn svg {
  width: 16px;
  height: 16px;
}
</style>
