<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { ChatMessage } from '@/types'
import { BrowserAudioRecorder, canRecordAudio } from '@/utils/audioRecorder'
import { requestInterviewReply, transcribeAnswer } from '@/utils/interviewApi'
import AppButton from '@/components/ui/AppButton.vue'
import ChatBubble from '@/components/ui/ChatBubble.vue'
import InterviewTimer from '@/components/ui/InterviewTimer.vue'
import QuestionNavigator from '@/components/ui/QuestionNavigator.vue'
import MicIcon from '@/components/icons/MicIcon.vue'

const router = useRouter()

const totalQuestions = 10
const maxRecordingSeconds = 60
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

function pause() {
  isPaused.value = true
  stopAudioActivity()
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
  if (timerId) clearInterval(timerId)
  stopAudioActivity()
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

const hasRecorder = canRecordAudio()
const hasSynthesis = 'speechSynthesis' in window

const messages = ref<ChatMessage[]>([
  { role: 'ai', content: '你好，欢迎参加今天的面试。请先做一个简短的自我介绍，时间控制在 1 分钟以内。' },
  { role: 'user', content: '您好，我是张明，XX大学计算机专业大四学生，有过两段前端实习经历...' },
  { role: 'ai', content: '好的。你在实习中遇到过最具挑战的技术问题是什么？你是如何解决的？' },
])

const chatArea = ref<HTMLElement>()

type VoiceState = 'idle' | 'recording' | 'transcribing' | 'thinking' | 'speaking' | 'error'
const voiceState = ref<VoiceState>('idle')
const errorMessage = ref('')
const recordingSeconds = ref(0)

let recorder: BrowserAudioRecorder | null = null
let recordingTimer: ReturnType<typeof setInterval> | null = null

const voiceHint = computed(() => {
  if (!hasRecorder) return '当前浏览器不支持录音，请使用新版 Chrome'
  if (errorMessage.value) return errorMessage.value
  if (voiceState.value === 'recording') {
    return `正在录音 ${recordingSeconds.value}s / ${maxRecordingSeconds}s，点击停止`
  }
  if (voiceState.value === 'transcribing') return '正在转写语音...'
  if (voiceState.value === 'thinking') return 'AI 正在生成追问...'
  if (voiceState.value === 'speaking') return 'AI 正在朗读，点击可停止'
  return '点击麦克风开始语音回答'
})

const isVoiceBusy = computed(() => {
  return voiceState.value === 'transcribing' || voiceState.value === 'thinking'
})

function beginRecordingTimer() {
  recordingSeconds.value = 0
  recordingTimer = setInterval(() => {
    recordingSeconds.value++
    if (recordingSeconds.value >= maxRecordingSeconds) {
      stopRecording()
    }
  }, 1000)
}

function clearRecordingTimer() {
  if (recordingTimer) {
    clearInterval(recordingTimer)
    recordingTimer = null
  }
}

async function startRecording() {
  if (!hasRecorder || isVoiceBusy.value) return

  try {
    errorMessage.value = ''
    stopSpeaking()
    recorder = new BrowserAudioRecorder()
    await recorder.start()
    voiceState.value = 'recording'
    beginRecordingTimer()
  } catch (error) {
    recorder = null
    voiceState.value = 'error'
    errorMessage.value = error instanceof Error
      ? error.message
      : '无法访问麦克风，请检查浏览器权限。'
  }
}

async function stopRecording() {
  if (voiceState.value !== 'recording' || !recorder) return

  clearRecordingTimer()
  voiceState.value = 'transcribing'

  try {
    const audio = await recorder.stop()
    recorder = null

    const text = await transcribeAnswer(audio)
    const userMessage: ChatMessage = { role: 'user', content: text }
    messages.value.push(userMessage)
    scrollToBottom()

    voiceState.value = 'thinking'
    const aiMessage = await requestInterviewReply({
      messages: messages.value,
      questionIndex: currentQuestion.value,
      totalQuestions,
      jobTitle: '前端开发工程师',
      level: '中级',
    })

    messages.value.push({ role: 'ai', content: aiMessage })
    if (!answeredQuestions.value.includes(currentQuestion.value)) {
      answeredQuestions.value.push(currentQuestion.value)
    }
    scrollToBottom()
    speakText(aiMessage)
  } catch (error) {
    voiceState.value = 'error'
    errorMessage.value = error instanceof Error
      ? error.message
      : '语音处理失败，请稍后重试。'
  }
}

function speakText(text: string) {
  if (!hasSynthesis) {
    voiceState.value = 'idle'
    return
  }

  speechSynthesis.cancel()
  voiceState.value = 'speaking'

  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'zh-CN'
  utterance.rate = 1.05
  utterance.pitch = 1.0

  const voices = speechSynthesis.getVoices()
  const zhVoice = voices.find((voice) => voice.lang.startsWith('zh'))
  if (zhVoice) utterance.voice = zhVoice

  utterance.onend = () => {
    voiceState.value = 'idle'
  }

  utterance.onerror = () => {
    voiceState.value = 'idle'
  }

  speechSynthesis.speak(utterance)
}

function stopSpeaking() {
  if (hasSynthesis) {
    speechSynthesis.cancel()
  }
  if (voiceState.value === 'speaking') {
    voiceState.value = 'idle'
  }
}

function stopAudioActivity() {
  clearRecordingTimer()
  if (recorder) {
    recorder.abort()
    recorder = null
  }
  stopSpeaking()
  if (voiceState.value !== 'error') {
    voiceState.value = 'idle'
  }
}

function toggleVoice() {
  if (voiceState.value === 'speaking') {
    stopSpeaking()
    return
  }
  if (voiceState.value === 'recording') {
    stopRecording()
    return
  }
  if (voiceState.value === 'idle' || voiceState.value === 'error') {
    startRecording()
  }
}

function endInterview() {
  pause()
}

function scrollToBottom() {
  nextTick(() => {
    if (chatArea.value) {
      chatArea.value.scrollTop = chatArea.value.scrollHeight
    }
  })
}

onMounted(() => {
  startTimer()
  if (hasSynthesis) {
    speechSynthesis.getVoices()
    speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices()
  }
})

onUnmounted(() => {
  if (timerId) clearInterval(timerId)
  stopAudioActivity()
})
</script>

<template>
  <div class="screen-view">
    <div class="interview-header">
      <div class="row" style="gap: 8px;">
        <span class="live-dot"></span>
        <span style="font-size: 13px; font-weight: 500;">面试中</span>
      </div>
      <InterviewTimer :seconds="seconds" :paused="isPaused" />
    </div>

    <div class="navigator-wrap">
      <QuestionNavigator
        :total="totalQuestions"
        :current="currentQuestion"
        :answered="answeredQuestions"
        show-status
        @navigate="(i: number) => currentQuestion = i"
      />
    </div>

    <div ref="chatArea" class="chat-area">
      <template v-for="(msg, i) in messages" :key="i">
        <ChatBubble :role="msg.role">
          {{ msg.content }}
          <span v-if="msg.role === 'ai' && i === messages.length - 1 && voiceState === 'speaking'" class="speaking-indicator">🔊</span>
        </ChatBubble>
      </template>
    </div>

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
        <AppButton variant="secondary" style="flex: 1;" @click="endInterview">结束面试</AppButton>
        <button
          :class="['voice-btn', voiceState]"
          :disabled="isVoiceBusy"
          :aria-label="voiceState === 'idle' ? '语音回答' : voiceState === 'recording' ? '停止录音' : voiceState === 'speaking' ? '停止朗读' : '处理中'"
          @click="toggleVoice"
        >
          <MicIcon v-if="voiceState !== 'speaking'" class="mic-icon" />
          <svg v-else class="mic-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
          <span v-if="voiceState === 'recording'" class="voice-ring"></span>
        </button>
      </div>
      <p :class="['hint', { warn: !hasRecorder || voiceState === 'error' }]">{{ voiceHint }}</p>
    </div>

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
  position: relative;
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
  transition: background 0.2s, transform 0.15s;
}

.voice-btn:disabled {
  cursor: wait;
  opacity: 0.72;
}

.voice-btn:active {
  transform: scale(0.95);
}

.voice-btn.recording {
  background: #ef4444;
  box-shadow: 0 4px 16px rgba(239, 68, 68, 0.35);
  animation: recording-pulse 1.2s ease-in-out infinite;
}

.voice-btn.speaking {
  background: #8b5cf6;
  box-shadow: 0 4px 16px rgba(139, 92, 246, 0.35);
}

.voice-btn.transcribing,
.voice-btn.thinking {
  background: var(--muted);
  animation: none;
}

.voice-btn.error {
  background: #ef4444;
}

@keyframes recording-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.08); }
}

.voice-ring {
  position: absolute;
  inset: -6px;
  border-radius: 50%;
  border: 2px solid #ef4444;
  opacity: 0;
  animation: ring-expand 1.5s ease-out infinite;
}

@keyframes ring-expand {
  0% { transform: scale(0.8); opacity: 0.6; }
  100% { transform: scale(1.4); opacity: 0; }
}

.mic-icon {
  width: 24px;
  height: 24px;
  stroke: currentColor;
  fill: none;
  stroke-width: 2;
}

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

.speaking-indicator {
  margin-left: 4px;
  font-size: 12px;
  animation: speaking-bounce 0.8s ease-in-out infinite;
}

@keyframes speaking-bounce {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}

.hint {
  margin: 8px 0 0;
  text-align: center;
  font-size: 12px;
  color: var(--muted);
}

.hint.warn {
  color: #ef4444;
}
</style>
