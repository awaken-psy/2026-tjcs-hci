<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ScreenView from '@/components/layout/ScreenView.vue'
import BackButton from '@/components/ui/BackButton.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import WaveformVisualizer from '@/components/ui/WaveformVisualizer.vue'

const router = useRouter()

const micStatus = ref<'idle' | 'recording' | 'passed' | 'failed'>('idle')
const networkStatus = ref<'good' | 'fair' | 'poor'>('good')
const cameraStatus = ref<'idle' | 'passed'>('idle')

const summary = {
  job: '前端开发工程师',
  level: '中级',
  duration: '30 分钟',
  questions: 10,
}

const envTips = [
  '选择安静、无回声的空间',
  '确保光线充足，面部清晰可见',
  '关闭消息通知，避免干扰',
  '准备好纸笔，便于快速记录思路',
]

function toggleMic() {
  if (micStatus.value === 'idle') {
    micStatus.value = 'recording'
    setTimeout(() => {
      micStatus.value = 'passed'
    }, 2500)
  } else if (micStatus.value === 'recording') {
    micStatus.value = 'idle'
  }
}

function checkCamera() {
  cameraStatus.value = 'passed'
}

function goBack() {
  router.push('/setup')
}

function startInterview() {
  router.push('/interview')
}

const allReady = () => micStatus.value === 'passed' && networkStatus.value !== 'poor'
</script>

<template>
  <ScreenView>
    <div class="pad stack" style="padding-top: 12px; gap: 20px; min-height: 100%; padding-bottom: 24px;">
      <BackButton @click="goBack" />

      <h1 class="h2">面试准备</h1>

      <!-- Summary Card -->
      <AppCard padding="16px" class="summary-card">
        <div class="row-between" style="margin-bottom: 10px;">
          <span class="summary-title">{{ summary.job }}</span>
          <span class="meta-badge">{{ summary.level }}</span>
        </div>
        <div class="summary-meta">
          <span>预计 {{ summary.duration }}</span>
          <span class="dot" />
          <span>约 {{ summary.questions }} 题</span>
        </div>
      </AppCard>

      <!-- Device Check -->
      <section>
        <p class="section-label">设备检查</p>
        <div class="check-list">
          <!-- Mic -->
          <AppCard padding="14px 16px" class="check-item">
            <div class="row-between">
              <div class="row" style="gap: 10px;">
                <div class="check-icon" :class="{ ok: micStatus === 'passed', active: micStatus === 'recording' }">
                  <svg v-if="micStatus !== 'passed'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 1a3 3 0 013 3v7a3 3 0 01-6 0V4a3 3 0 013-3z" />
                    <path d="M19 10v2a7 7 0 01-14 0v-2" />
                    <path d="M12 19v4" />
                  </svg>
                  <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <div class="check-name">麦克风</div>
                  <div class="check-status">
                    <span v-if="micStatus === 'idle'">点击测试录音</span>
                    <span v-else-if="micStatus === 'recording'" style="color: var(--accent);">录制中...</span>
                    <span v-else-if="micStatus === 'passed'" style="color: oklch(55% 0.14 145);">检测通过</span>
                  </div>
                </div>
              </div>
              <AppButton
                v-if="micStatus !== 'recording'"
                variant="ghost"
                style="padding: 6px 12px; font-size: 13px;"
                @click="toggleMic"
              >
                {{ micStatus === 'passed' ? '重新测试' : '测试' }}
              </AppButton>
            </div>
            <div v-if="micStatus === 'recording'" style="margin-top: 10px;">
              <WaveformVisualizer :active="true" :bar-count="24" />
            </div>
          </AppCard>

          <!-- Network -->
          <AppCard padding="14px 16px" class="check-item">
            <div class="row" style="gap: 10px;">
              <div class="check-icon" :class="{ ok: networkStatus === 'good', warn: networkStatus === 'fair' }">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12.55a11 11 0 0114.08 0" />
                  <path d="M1.42 9a16 16 0 0121.16 0" />
                  <path d="M8.53 16.11a6 6 0 016.95 0" />
                  <path d="M12 20h.01" />
                </svg>
              </div>
              <div class="flex-1">
                <div class="check-name">网络连接</div>
                <div class="check-status">
                  <span v-if="networkStatus === 'good'" style="color: oklch(55% 0.14 145);">状态良好 · WiFi</span>
                  <span v-else-if="networkStatus === 'fair'" style="color: oklch(65% 0.14 75);">状态一般 · 4G</span>
                  <span v-else style="color: oklch(55% 0.16 25);">建议使用 WiFi</span>
                </div>
              </div>
            </div>
          </AppCard>

          <!-- Camera -->
          <AppCard padding="14px 16px" class="check-item">
            <div class="row-between">
              <div class="row" style="gap: 10px;">
                <div class="check-icon" :class="{ ok: cameraStatus === 'passed' }">
                  <svg v-if="cameraStatus !== 'passed'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                  <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <div>
                  <div class="check-name">摄像头（可选）</div>
                  <div class="check-status">
                    <span v-if="cameraStatus === 'idle'">面试无需视频</span>
                    <span v-else style="color: oklch(55% 0.14 145);">检测通过</span>
                  </div>
                </div>
              </div>
              <AppButton
                v-if="cameraStatus === 'idle'"
                variant="ghost"
                style="padding: 6px 12px; font-size: 13px;"
                @click="checkCamera"
              >
                检测
              </AppButton>
            </div>
          </AppCard>
        </div>
      </section>

      <!-- Environment Tips -->
      <section>
        <p class="section-label">环境建议</p>
        <AppCard padding="14px 16px">
          <ul class="tip-list">
            <li v-for="(tip, i) in envTips" :key="i" class="tip-item">
              <span class="tip-dot" />
              {{ tip }}
            </li>
          </ul>
        </AppCard>
      </section>

      <div style="margin-top: auto; padding-top: 20px;">
        <div class="stack" style="gap: 10px;">
          <AppButton :style="{ opacity: allReady() ? 1 : 0.5 }" @click="startInterview">
            准备好了，开始面试
          </AppButton>
          <AppButton variant="secondary" @click="goBack">返回调整设置</AppButton>
        </div>
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

.summary-card {
  background: var(--accent-soft);
  border-color: transparent;
}

.summary-title {
  font-size: 16px;
  font-weight: 600;
}

.meta-badge {
  display: inline-flex;
  padding: 2px 8px;
  background: var(--surface);
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  font-family: var(--font-mono);
  color: var(--accent);
}

.summary-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--muted);
  font-family: var(--font-mono);
}

.dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: var(--border);
}

.section-label {
  font-family: var(--font-mono);
  font-size: var(--fs-meta);
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin: 0 0 10px;
}

.check-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.check-item {
  transition: border-color 0.15s;
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

.check-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: var(--fg-soft);
  color: var(--muted);
  display: grid;
  place-items: center;
  flex-shrink: 0;
  transition: all 0.2s;
}

.check-icon svg {
  width: 18px;
  height: 18px;
}

.check-icon.ok {
  background: color-mix(in oklch, oklch(55% 0.14 145) 12%, transparent);
  color: oklch(55% 0.14 145);
}

.check-icon.warn {
  background: color-mix(in oklch, oklch(65% 0.14 75) 12%, transparent);
  color: oklch(65% 0.14 75);
}

.check-icon.active {
  background: var(--accent-soft);
  color: var(--accent);
}

.check-name {
  font-size: 14px;
  font-weight: 500;
}

.check-status {
  font-size: 12px;
  color: var(--muted);
  margin-top: 2px;
}

.tip-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tip-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 13px;
  color: var(--muted);
  line-height: 1.5;
}

.tip-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  margin-top: 6px;
  flex-shrink: 0;
}
</style>
