<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ScreenView from '@/components/layout/ScreenView.vue'
import BackButton from '@/components/ui/BackButton.vue'
import { store } from '@/utils/communityStore'

const router = useRouter()
const route = useRoute()

const postId = Number(route.params.id)
const post = ref(store.getPost(postId))

const newComment = ref('')

function goBack() { router.push('/community') }

function addComment() {
  if (!newComment.value.trim() || !post.value) return
  store.addComment(post.value.id, newComment.value)
  newComment.value = ''
}
</script>

<template>
  <ScreenView>
    <div v-if="!post" class="pad stack" style="padding-top: 12px; gap: 14px;">
      <BackButton @click="goBack" />
      <div class="empty-state">
        <p class="empty-title">面经不存在</p>
        <p class="empty-desc">该面经可能已被删除</p>
      </div>
    </div>

    <div v-else class="pad stack" style="padding-top: 12px; gap: 12px; padding-bottom: 24px;">
      <BackButton @click="goBack" />

      <!-- Post header -->
      <div class="detail-header">
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

      <h1 class="detail-title">{{ post.title }}</h1>
      <p class="detail-content">{{ post.content }}</p>

      <!-- Actions -->
      <div class="detail-actions">
        <button class="action-btn" :class="{ liked: post.liked }" @click="store.toggleLike(post.id)">
          <svg viewBox="0 0 24 24" :fill="post.liked ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
          <span>{{ post.likes }}</span>
        </button>
        <button class="action-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
          <span>{{ post.comments.length }}</span>
        </button>
      </div>

      <!-- Comments -->
      <div class="comments-section">
        <h3 class="comments-title">评论 ({{ post.comments.length }})</h3>

        <div v-if="post.comments.length === 0" class="comment-empty">
          暂无评论，来写第一条吧
        </div>

        <div
          v-for="c in post.comments"
          :key="c.id"
          class="comment-item"
        >
          <div class="comment-header">
            <span class="comment-author">{{ c.author }}</span>
            <span class="comment-time">{{ c.time }}</span>
          </div>
          <p class="comment-text">{{ c.content }}</p>
        </div>
      </div>

      <!-- Add comment -->
      <div class="add-comment">
        <input
          v-model="newComment"
          class="comment-input"
          placeholder="写下你的评论..."
          @keyup.enter="addComment"
        />
        <button class="comment-submit" :disabled="!newComment.trim()" @click="addComment">
          发送
        </button>
      </div>
    </div>
  </ScreenView>
</template>

<style scoped>
.pad { padding-inline: 20px; }
.stack { display: flex; flex-direction: column; }

/* Header */
.detail-header {
  display: flex; align-items: center; gap: 10px;
}
.post-avatar {
  width: 40px; height: 40px;
  border-radius: 50%;
  background: var(--fg-soft);
  display: grid; place-items: center;
  font-size: 15px; font-weight: 600;
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

/* Content */
.detail-title {
  font-family: var(--font-display);
  font-size: 20px; font-weight: 600;
  line-height: 1.4; margin: 0;
  letter-spacing: -0.01em;
}
.detail-content {
  margin: 0;
  font-size: 14px; color: var(--fg);
  line-height: 1.75;
}

/* Actions */
.detail-actions {
  display: flex; gap: 20px;
  padding: 10px 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}
.action-btn {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 4px 0; border: 0; background: transparent;
  color: var(--muted); font-size: 14px; font-family: var(--font-mono);
  cursor: pointer; transition: color 0.15s;
}
.action-btn svg { width: 18px; height: 18px; }
.action-btn.liked { color: oklch(55% 0.17 12); }

/* Comments */
.comments-section {
  display: flex; flex-direction: column; gap: 12px;
}
.comments-title {
  font-size: 15px; font-weight: 600; margin: 0;
}
.comment-item {
  display: flex; flex-direction: column; gap: 4px;
  padding: 12px; border-radius: 8px;
  background: var(--bg);
}
.comment-header {
  display: flex; justify-content: space-between; align-items: center;
}
.comment-author { font-size: 13px; font-weight: 600; color: var(--accent); }
.comment-time { font-size: 11px; color: var(--border); font-family: var(--font-mono); }
.comment-text { margin: 0; font-size: 13px; color: var(--fg); line-height: 1.5; }
.comment-empty {
  font-size: 13px; color: var(--border); text-align: center;
  padding: 24px 0;
}

/* Add comment */
.add-comment {
  display: flex; gap: 8px;
  padding-top: 8px;
}
.comment-input {
  flex: 1; padding: 10px 12px;
  border: 1px solid var(--border); border-radius: 8px;
  font-size: 14px; font-family: inherit;
  background: var(--bg); color: var(--fg);
}
.comment-input:focus { outline: none; border-color: var(--accent); }
.comment-submit {
  padding: 10px 16px;
  border: 0; border-radius: 8px;
  background: var(--accent); color: #fff;
  font-size: 14px; font-weight: 500; font-family: inherit;
  cursor: pointer;
}
.comment-submit:disabled { opacity: 0.4; cursor: not-allowed; }

/* Empty */
.empty-state {
  display: flex; flex-direction: column; align-items: center;
  padding: 80px 20px; text-align: center;
}
.empty-title { font-size: 16px; font-weight: 600; margin: 0 0 6px; }
.empty-desc { font-size: 13px; color: var(--muted); margin: 0; }
</style>
