<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import ScreenView from '@/components/layout/ScreenView.vue'
import BackButton from '@/components/ui/BackButton.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import { store } from '@/utils/communityStore'

const router = useRouter()

const filters = ['全部', '字节跳动', '阿里巴巴', '腾讯', '美团', '拼多多', '小红书']
const activeFilter = ref('全部')
const sortBy = ref<'hot' | 'new'>('hot')

const filteredPosts = computed(() => {
  let result = activeFilter.value === '全部'
    ? [...store.posts]
    : store.posts.filter(p => p.company === activeFilter.value)
  if (sortBy.value === 'hot') {
    result.sort((a, b) => b.likes - a.likes)
  }
  return result
})

function goToDetail(id: number) {
  router.push(`/community/${id}`)
}

function goBack() { router.push('/home') }
</script>

<template>
  <ScreenView>
    <div class="pad stack" style="padding-top: 12px; gap: 14px; padding-bottom: 24px;">
      <div class="row-between">
        <BackButton @click="goBack" />
        <button class="publish-btn" @click="router.push('/post-experience')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>发布面经</span>
        </button>
      </div>

      <h1 class="title">面经社区</h1>

      <!-- Sort -->
      <div class="sort-row">
        <span class="sort-label">排序</span>
        <button
          class="sort-btn" :class="{ active: sortBy === 'hot' }"
          @click="sortBy = 'hot'"
        >热门</button>
        <button
          class="sort-btn" :class="{ active: sortBy === 'new' }"
          @click="sortBy = 'new'"
        >最新</button>
      </div>

      <!-- Filter bar — standalone row with horizontal scroll -->
      <div class="filter-bar">
        <button
          v-for="f in filters" :key="f"
          class="filter-btn" :class="{ active: activeFilter === f }"
          @click="activeFilter = f"
        >{{ f }}</button>
      </div>

      <!-- Post list -->
      <div class="post-list">
        <article
          v-for="post in filteredPosts"
          :key="post.id"
          class="post-card"
          @click="goToDetail(post.id)"
        >
          <div class="post-header">
            <div class="post-avatar">{{ post.avatar }}</div>
            <div>
              <div class="post-author">{{ post.author }}</div>
              <div class="post-time">{{ post.time }}</div>
            </div>
            <div class="post-tags">
              <span class="tag-company">{{ post.company }}</span>
              <span class="tag-role">{{ post.role }}</span>
            </div>
          </div>

          <h3 class="post-title">{{ post.title }}</h3>
          <p class="post-content">{{ post.content }}</p>

          <div class="post-actions">
            <button class="action-btn" :class="{ liked: post.liked }" @click.stop="store.toggleLike(post.id)">
              <svg viewBox="0 0 24 24" :fill="post.liked ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
              <span>{{ post.likes }}</span>
            </button>
            <button class="action-btn" @click.stop="goToDetail(post.id)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
              <span>{{ post.comments.length }}</span>
            </button>
          </div>

        </article>
      </div>

      <!-- Empty state -->
      <EmptyState
        v-if="filteredPosts.length === 0"
        title="暂无面经"
        description="该分类下还没有面经，去发布第一篇吧"
      />
    </div>
  </ScreenView>
</template>

<style scoped>
.pad { padding-inline: 20px; }
.stack { display: flex; flex-direction: column; }
.row-between { display: flex; align-items: center; justify-content: space-between; gap: 8px; }

.title {
  font-family: var(--font-display);
  font-size: 24px;
  letter-spacing: -0.02em;
  margin: 0;
}

/* Publish button */
.publish-btn {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 8px 14px;
  border-radius: 999px;
  border: 0;
  background: var(--accent);
  color: #fff;
  font-size: 13px; font-family: inherit; font-weight: 500;
  cursor: pointer;
}
.publish-btn svg { width: 16px; height: 16px; }

/* Sort */
.sort-row {
  display: flex; align-items: center; gap: 4px;
}
.sort-label { font-size: 12px; color: var(--muted); margin-right: 4px; }
.sort-btn {
  padding: 4px 10px;
  border: 0; background: transparent;
  color: var(--muted); font-size: 12px; font-family: inherit;
  cursor: pointer;
}
.sort-btn.active { color: var(--accent); font-weight: 600; }

/* Filter — standalone row */
.filter-bar {
  display: flex; gap: 6px;
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 2px;
}
.filter-bar::-webkit-scrollbar { display: none; }
.filter-btn {
  flex-shrink: 0;
  padding: 5px 12px; border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface); color: var(--muted);
  font-size: 12px; font-family: inherit;
  cursor: pointer; transition: all 0.15s;
}
.filter-btn.active {
  background: var(--accent); color: #fff;
  border-color: var(--accent);
}

/* Post list */
.post-list { display: flex; flex-direction: column; gap: 10px; }

.post-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: border-color 0.15s;
}
.post-card:hover { border-color: var(--accent); }

.post-header {
  display: flex; align-items: center; gap: 10px;
}
.post-avatar {
  width: 36px; height: 36px;
  border-radius: 50%;
  background: var(--fg-soft);
  display: grid; place-items: center;
  font-size: 14px; font-weight: 600;
  flex-shrink: 0;
}
.post-author { font-size: 14px; font-weight: 500; }
.post-time { font-size: 11px; color: var(--muted); font-family: var(--font-mono); }
.post-tags { display: flex; gap: 6px; margin-left: auto; }
.tag-company {
  padding: 2px 8px; border-radius: 999px;
  background: var(--accent-soft); color: var(--accent);
  font-size: 11px; font-weight: 500; font-family: var(--font-mono);
}
.tag-role {
  padding: 2px 8px; border-radius: 999px;
  background: var(--fg-soft); color: var(--muted);
  font-size: 11px; font-family: var(--font-mono);
}

.post-title { font-size: 15px; font-weight: 600; margin: 10px 0 0; line-height: 1.4; }
.post-content {
  margin: 8px 0 0;
  font-size: 13px; color: var(--muted);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-actions {
  display: flex; gap: 16px; margin-top: 10px;
  padding-top: 10px; border-top: 1px solid var(--border);
}
.action-btn {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 2px 0; border: 0; background: transparent;
  color: var(--muted); font-size: 13px; font-family: var(--font-mono);
  cursor: pointer; transition: color 0.15s;
}
.action-btn svg { width: 16px; height: 16px; }
.action-btn.liked { color: oklch(55% 0.17 12); }

</style>
