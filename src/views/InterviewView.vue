<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import AppButton from '@/components/ui/AppButton.vue'
import ChatBubble from '@/components/ui/ChatBubble.vue'
import InterviewTimer from '@/components/ui/InterviewTimer.vue'
import QuestionNavigator from '@/components/ui/QuestionNavigator.vue'
import MicIcon from '@/components/icons/MicIcon.vue'

const router = useRouter()

const totalQuestions = 10
const currentQuestion = ref(3)
const seconds = ref(522)
const isPaused = ref(false)
const showQuitConfirm = ref(false)
const answeredQuestions = ref([1, 2])

let timerId: ReturnType<typeof setInterval> | null = null

function startTimer() {
  timerId = setInterval(() => {
    if (!isPaused.value) seconds.value++
  }, 1000)
}

onMounted(() => startTimer())
onUnmounted(() => { if (timerId) clearInterval(timerId) })

function pause() {
  isPaused.value = true
}

function resume() {
  isPaused.value = false
}

function confirmQuit() {
  showQuitConfirm.value = true
}

function cancelQuit() {
  showQuitConfirm.value = false
}

function quitInterview() {
  showQuitConfirm.value = false
  isPaused.value = false
  router.push('/feedback')
}

function goPrev() {
  if (currentQuestion.value > 1) currentQuestion.value--
}

function goNext() {
  if (currentQuestion.value < totalQuestions) {
    if (!answeredQuestions.value.includes(currentQuestion.value)) {
      answeredQuestions.value.push(currentQuestion.value)
    }
    currentQuestion.value++
  }
}

</script>

<template>
  <div class="screen-view">
    <!-- Header -->
    <div class="interview-header">
      <div class="row" style="gap: 8px;">
        <span class="live-dot"></span>
        <span style="font-size: 13px; font-weight: 500;">面试中</span>
      </div>
      <InterviewTimer :seconds="seconds" :paused="isPaused" />
    </div>

    <!-- Navigator -->
    <div class="navigator-wrap">
      <QuestionNavigator
        :total="totalQuestions"
        :current="currentQuestion"
        :answered="answeredQuestions"
        show-status
        @navigate="(i) => currentQuestion = i"
      />
    </div>

    <!-- Chat Area -->
    <div class="chat-area">
      <ChatBubble role="ai">
        你好，欢迎参加今天的面试。请先做一个简短的自我介绍，时间控制在 2 分钟以内。
      </ChatBubble>

      <ChatBubble role="user">
        您好，我是张明，XX大学计算机专业大四学生，有过两段前端实习经历...
      </ChatBubble>

      <ChatBubble role="ai">
        好的。你在实习中遇到过最具挑战的技术问题是什么？你是如何解决的？
      </ChatBubble>
    </div>

    <!-- Bottom Controls -->
    <div class="controls">
      <div class="nav-row">
        <AppButton
          variant="ghost"
          style="flex: 1;"
          :style="{ opacity: currentQuestion > 1 ? 1 : 0.4 }"
          @click="goPrev"
        >
          上一题
        </AppButton>
        <AppButton
          variant="ghost"
          style="flex: 1;"
          :style="{ opacity: currentQuestion < totalQuestions ? 1 : 0.4 }"
          @click="goNext"
        >
          下一题
        </AppButton>
      </div>
      <div class="row-between" style="margin-top: 10px;">
        <AppButton variant="secondary" style="flex: 1;" @click="pause">结束面试</AppButton>
        <button class="voice-btn" aria-label="语音回答">
          <MicIcon class="mic-icon" />
        </button>
      </div>
    </div>

    <!-- Pause Overlay -->
    <div v-if="isPaused" class="pause-overlay" @click.self="resume">
      <div class="pause-card">
        <h2 class="pause-title">面试已暂停</h2>
        <p class="pause-meta">当前进度：第 {{ currentQuestion }} / {{ totalQuestions }} 题</p>
        <InterviewTimer class="pause-timer" :seconds="seconds" paused />

        <div class="pause-actions">
          <AppButton @click="resume">继续面试</AppButton>
          <AppButton variant="secondary" style="color: #dc2626; border-color: oklch(55% 0.16 25 / 0.3);" @click="confirmQuit">结束面试</AppButton>
        </div>
      </div>
    </div>

    <!-- Quit Confirm Modal -->
    <div v-if="showQuitConfirm" class="modal-overlay" @click.self="cancelQuit">
      <div class="modal-card">
        <p class="modal-title">确认结束面试？</p>
        <p class="modal-desc">结束将保存当前进度，可在历史记录中查看报告。</p>
        <div class="modal-actions">
          <AppButton variant="secondary" @click="cancelQuit">取消</AppButton>
          <AppButton @click="quitInterview">确认结束</AppButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.screen-view {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  flex: 1;
  position: relative;
}

.interview-header {
  padding: 8px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}

.row {
  display: flex;
  align-items: center;
}

.live-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ef4444;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.navigator-wrap {
  padding: 10px 20px 6px;
  flex-shrink: 0;
}

.chat-area {
  flex: 1;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: flex-end;
  overflow-y: auto;
}

.controls {
  padding: 0 20px 12px;
  flex-shrink: 0;
}

.nav-row {
  display: flex;
  gap: 10px;
}

.row-between {
  display: flex;
  align-items: center;
  gap: 12px;
}

.voice-btn {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--accent);
  color: #fff;
  border: 0;
  display: grid;
  place-items: center;
  cursor: pointer;
  box-shadow: 0 4px 16px color-mix(in oklch, var(--accent) 30%, transparent);
  flex-shrink: 0;
}

.mic-icon {
  width: 24px;
  height: 24px;
  stroke: currentColor;
  fill: none;
  stroke-width: 2;
}

/* Pause Overlay */
.pause-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
  display: grid;
  place-items: center;
  z-index: 50;
  padding: 20px;
}

.pause-card {
  background: var(--surface);
  border-radius: var(--radius-card);
  padding: 28px 24px;
  width: 100%;
  max-width: 320px;
  text-align: center;
}

.pause-title {
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 8px;
}

.pause-meta {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--muted);
  margin: 0 0 12px;
}

.pause-timer {
  display: block;
  font-size: 28px;
  margin-bottom: 20px;
}

.pause-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Modal */
.modal-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(4px);
  display: grid;
  place-items: center;
  z-index: 60;
  padding: 20px;
}

.modal-card {
  background: var(--surface);
  border-radius: var(--radius-card);
  padding: 24px 20px;
  width: 100%;
  max-width: 300px;
}

.modal-title {
  font-size: 17px;
  font-weight: 600;
  margin: 0 0 6px;
}

.modal-desc {
  font-size: 13px;
  color: var(--muted);
  line-height: 1.5;
  margin: 0 0 20px;
}

.modal-actions {
  display: flex;
  gap: 10px;
}
</style>
