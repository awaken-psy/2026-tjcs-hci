<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import type { ChatMessage } from '@/types'
import AppButton from '@/components/ui/AppButton.vue'
import ChatBubble from '@/components/ui/ChatBubble.vue'
import InterviewTimer from '@/components/ui/InterviewTimer.vue'
import QuestionNavigator from '@/components/ui/QuestionNavigator.vue'
import MicIcon from '@/components/icons/MicIcon.vue'

const router = useRouter()

// ═══ Interview Progress (路线 A) ═══
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

function pause() {
  isPaused.value = true
  // 暂停时停止所有语音活动
  if (hasSynthesis) speechSynthesis.cancel()
  if (recognition) recognition.abort()
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
  speechSynthesis.cancel()
  if (recognition) recognition.abort()
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

// ═══ Voice Features (main 分支) ═══
const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
const hasRecognition = !!SpeechRecognition
const hasSynthesis = 'speechSynthesis' in window

const messages = ref<ChatMessage[]>([
  { role: 'ai', content: '你好，欢迎参加今天的面试。请先做一个简短的自我介绍，时间控制在 2 分钟以内。' },
  { role: 'user', content: '您好，我是张明，XX大学计算机专业大四学生，有过两段前端实习经历...' },
  { role: 'ai', content: '好的。你在实习中遇到过最具挑战的技术问题是什么？你是如何解决的？' },
])

const chatArea = ref<HTMLElement>()

const aiFollowUps = [
  '不错。能具体说说你在这个项目中使用的技术栈和选型理由吗？',
  '了解了。你如何看待团队协作中的 Code Review？有什么实践经验吗？',
  '很好。如果让你重新设计这个系统，你会做哪些改进？',
  '谢谢你的分享。你对加班文化怎么看？',
  '有意思。你能讲讲你遇到的最难调试的一个 Bug 吗？',
  '明白了。你觉得前端未来三年的发展趋势是什么？',
  '好的。你在学习新技术时通常采用什么方法？',
]
let followUpIndex = 0

function getNextAiMessage(): string {
  const msg = aiFollowUps[followUpIndex % aiFollowUps.length]
  followUpIndex++
  return msg
}

type VoiceState = 'idle' | 'recording' | 'transcribing' | 'speaking'
const voiceState = ref<VoiceState>('idle')

let recognition: InstanceType<typeof SpeechRecognition> | null = null

function initRecognition() {
  if (!hasRecognition) return null
  const rec = new SpeechRecognition()
  rec.lang = 'zh-CN'
  rec.continuous = true
  rec.interimResults = true

  rec.onresult = (e: any) => {
    let interim = ''
    let final = ''
    for (let i = e.resultIndex; i < e.results.length; i++) {
      const transcript = e.results[i][0].transcript
      if (e.results[i].isFinal) {
        final += transcript
      } else {
        interim += transcript
      }
    }
    if (final) {
      recognitionFinalText += final
    }
    const displayText = recognitionFinalText + interim
    if (messages.value.length > 0) {
      messages.value[messages.value.length - 1].content = displayText
    }
    scrollToBottom()
  }

  rec.onerror = (e: any) => {
    console.warn('SpeechRecognition error:', e.error)
    if (e.error === 'no-speech' || e.error === 'aborted') {
      stopRecording()
    }
  }

  rec.onend = () => {
    if (voiceState.value === 'recording') {
      finalizeRecognition()
    }
  }

  return rec
}

let recognitionFinalText = ''

function startRecording() {
  if (!hasRecognition) return
  recognitionFinalText = ''
  messages.value.push({ role: 'user', content: '' })
  scrollToBottom()

  recognition = initRecognition()
  recognition!.start()
  voiceState.value = 'recording'
}

function stopRecording() {
  if (recognition) {
    recognition.stop()
  }
  finalizeRecognition()
}

function finalizeRecognition() {
  voiceState.value = 'idle'
  const last = messages.value[messages.value.length - 1]
  if (last && last.role === 'user' && !last.content.trim()) {
    messages.value.pop()
    return
  }
  setTimeout(() => {
    const aiMsg = getNextAiMessage()
    messages.value.push({ role: 'ai', content: aiMsg })
    scrollToBottom()
    speakText(aiMsg)
  }, 600)
}

function speakText(text: string) {
  if (!hasSynthesis) return
  speechSynthesis.cancel()

  voiceState.value = 'speaking'

  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'zh-CN'
  utterance.rate = 1.05
  utterance.pitch = 1.0

  const voices = speechSynthesis.getVoices()
  const zhVoice = voices.find(v => v.lang.startsWith('zh'))
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
  speechSynthesis.cancel()
  voiceState.value = 'idle'
}

function toggleVoice() {
  if (voiceState.value === 'speaking') {
    stopSpeaking()
    return
  }
  if (voiceState.value === 'idle') {
    startRecording()
  } else if (voiceState.value === 'recording') {
    stopRecording()
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
  speechSynthesis.cancel()
  if (recognition) recognition.abort()
})
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
        @navigate="(i: number) => currentQuestion = i"
      />
    </div>

    <!-- Chat Area -->
    <div ref="chatArea" class="chat-area">
      <template v-for="(msg, i) in messages" :key="i">
        <ChatBubble :role="msg.role">
          {{ msg.content }}
          <span v-if="msg.role === 'user' && i === messages.length - 1 && voiceState === 'recording'" class="cursor"></span>
          <span v-if="msg.role === 'ai' && i === messages.length - 1 && voiceState === 'speaking'" class="speaking-indicator">&#x1f50a;</span>
        </ChatBubble>
      </template>
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
        <AppButton variant="secondary" style="flex: 1;" @click="endInterview">结束面试</AppButton>
        <button
          :class="['voice-btn', voiceState]"
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
      <p v-if="!hasRecognition" class="hint warn">当前浏览器不支持语音识别，请使用 Chrome</p>
      <p v-else-if="voiceState === 'recording'" class="hint">正在聆听，点击停止...</p>
      <p v-else-if="voiceState === 'transcribing'" class="hint">识别中...</p>
      <p v-else-if="voiceState === 'speaking'" class="hint">AI 正在朗读，点击可停止</p>
      <p v-else class="hint">点击麦克风开始语音回答</p>
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

.voice-btn.transcribing {
  background: var(--muted);
  cursor: default;
  animation: none;
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

.cursor {
  display: inline-block;
  width: 2px;
  height: 1em;
  background: #fff;
  margin-left: 2px;
  vertical-align: text-bottom;
  animation: blink 0.6s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
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
