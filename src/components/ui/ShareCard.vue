<script setup lang="ts">
import { ref } from 'vue'

export interface ShareData {
  score: number
  jobTitle: string
  date: string
  duration: string
  dimensions: { label: string; score: number }[]
  historyAvg: number
}

const props = defineProps<{
  data: ShareData
}>()

const emit = defineEmits<{
  close: []
}>()

const templateIndex = ref(0)
const templates = ['卡片', '简约', '海报']

function handleCopy() {
  const text = `我在「智能面试官」完成了${props.data.jobTitle}面试\n得分：${props.data.score} 分 | 较历史平均 ${props.data.score >= props.data.historyAvg ? '+' : ''}${props.data.score - props.data.historyAvg}\n—— 来试试你能拿多少分？`
  navigator.clipboard?.writeText(text)
}
</script>

<template>
  <Teleport to="body">
    <div class="overlay" @click.self="emit('close')">
      <div class="share-panel">
        <div class="panel-header">
          <span class="panel-title">分享面试成绩</span>
          <button class="close-btn" @click="emit('close')" aria-label="关闭">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <!-- Template selector -->
        <div class="template-tabs">
          <button
            v-for="(t, i) in templates" :key="t"
            class="tpl-btn" :class="{ active: templateIndex === i }"
            @click="templateIndex = i"
          >{{ t }}</button>
        </div>

        <!-- Share preview card -->
        <div class="preview" :class="'tpl-' + templateIndex">
          <div class="preview-inner">
            <div class="preview-brand">智能面试官</div>
            <div class="preview-job">{{ data.jobTitle }}</div>
            <div class="preview-score-wrap">
              <span class="preview-score">{{ data.score }}</span>
              <span class="preview-unit">分</span>
            </div>
            <div class="preview-date">{{ data.date }} · {{ data.duration }}</div>

            <div class="preview-dims">
              <div v-for="d in data.dimensions" :key="d.label" class="preview-dim">
                <span class="dim-label">{{ d.label }}</span>
                <div class="dim-bar-wrap">
                  <div class="dim-bar" :style="{ width: d.score + '%' }" />
                </div>
                <span class="dim-val">{{ d.score }}</span>
              </div>
            </div>

            <div class="preview-compare">
              较历史平均
              <span :style="{ color: data.score >= data.historyAvg ? 'oklch(55% 0.14 145)' : 'oklch(55% 0.16 25)' }">
                {{ data.score >= data.historyAvg ? '+' : '' }}{{ data.score - data.historyAvg }}
              </span>
            </div>

            <div class="preview-watermark">扫码体验智能面试官</div>
          </div>
        </div>

        <!-- Actions -->
        <div class="panel-actions">
          <button class="action-btn secondary" @click="handleCopy">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
            </svg>
            复制文案
          </button>
          <button class="action-btn primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            保存图片
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.overlay {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(0,0,0,0.45);
  display: flex; align-items: center; justify-content: center;
  animation: fadeIn 0.2s ease;
}
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

.share-panel {
  width: 320px;
  max-height: 90vh;
  overflow-y: auto;
  background: var(--surface);
  border-radius: 20px;
  padding: 20px;
  display: flex; flex-direction: column; gap: 14px;
}

.panel-header {
  display: flex; align-items: center; justify-content: space-between;
}
.panel-title { font-size: 16px; font-weight: 600; }
.close-btn {
  width: 32px; height: 32px;
  border-radius: 50%; border: 0;
  background: var(--fg-soft);
  display: grid; place-items: center;
  cursor: pointer; color: var(--muted);
}
.close-btn svg { width: 16px; height: 16px; }

/* Template tabs */
.template-tabs { display: flex; gap: 6px; }
.tpl-btn {
  flex: 1; padding: 6px 0;
  border-radius: 8px; border: 1px solid var(--border);
  background: var(--surface); color: var(--muted);
  font-size: 13px; font-family: inherit;
  cursor: pointer; transition: all 0.15s;
}
.tpl-btn.active { background: var(--accent); color: #fff; border-color: var(--accent); }

/* Preview card */
.preview {
  border-radius: 16px; padding: 20px;
  text-align: center;
}
.preview.tpl-0 {
  background: linear-gradient(135deg, oklch(94% 0.03 160), oklch(98% 0.012 200));
  border: 1px solid var(--border);
}
.preview.tpl-1 {
  background: var(--fg);
  color: #fff;
}
.preview.tpl-2 {
  background: linear-gradient(135deg, oklch(55% 0.16 145), oklch(58% 0.18 180));
  color: #fff;
}

.preview-brand { font-family: var(--font-mono); font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.6; }
.preview-job { font-size: 14px; margin-top: 6px; opacity: 0.8; }
.preview-score-wrap { margin-top: 10px; }
.preview-score { font-family: var(--font-display); font-size: 48px; font-weight: 700; letter-spacing: -0.03em; }
.preview-unit { font-size: 16px; opacity: 0.6; margin-left: 2px; }
.preview-date { font-family: var(--font-mono); font-size: 11px; opacity: 0.5; margin-top: 4px; }

.preview-dims {
  margin-top: 16px;
  display: flex; flex-direction: column; gap: 8px;
  text-align: left;
}
.preview-dim {
  display: flex; align-items: center; gap: 8px;
  font-size: 12px;
}
.dim-label { min-width: 56px; opacity: 0.7; }
.dim-bar-wrap { flex: 1; height: 4px; border-radius: 2px; background: rgba(128,128,128,0.2); overflow: hidden; }
.dim-bar { height: 100%; border-radius: 2px; background: currentColor; opacity: 0.7; }
.dim-val { font-family: var(--font-mono); font-size: 11px; min-width: 24px; text-align: right; opacity: 0.7; }

.preview-compare { font-family: var(--font-mono); font-size: 11px; margin-top: 12px; opacity: 0.6; }
.preview-watermark { font-family: var(--font-mono); font-size: 10px; margin-top: 14px; opacity: 0.35; }

/* Action buttons */
.panel-actions { display: flex; gap: 10px; }
.action-btn {
  flex: 1;
  display: inline-flex; align-items: center; justify-content: center;
  gap: 6px;
  padding: 12px 0; border-radius: 14px;
  font-size: 14px; font-family: inherit; font-weight: 500;
  cursor: pointer; border: 0;
  transition: opacity 0.15s;
}
.action-btn:active { opacity: 0.9; }
.action-btn svg { width: 16px; height: 16px; }
.action-btn.primary { background: var(--accent); color: #fff; }
.action-btn.secondary { background: var(--fg-soft); color: var(--fg); }
</style>
