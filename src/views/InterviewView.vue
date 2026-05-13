<script setup lang="ts">
import { ref, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import type { ChatMessage } from '@/types'
import AppButton from '@/components/ui/AppButton.vue'
import ChatBubble from '@/components/ui/ChatBubble.vue'
import MicIcon from '@/components/icons/MicIcon.vue'

const router = useRouter()

// ── Chat State ──
const messages = ref<ChatMessage[]>([
  { role: 'ai', content: '你好，欢迎参加今天的面试。请先做一个简短的自我介绍，时间控制在 2 分钟以内。' },
  { role: 'user', content: '您好，我是张明，XX大学计算机专业大四学生，有过两段前端实习经历...' },
  { role: 'ai', content: '好的。你在实习中遇到过最具挑战的技术问题是什么？你是如何解决的？' },
])

const chatArea = ref<HTMLElement>()

// ── AI Follow-up Pool ──
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

// ── Voice Simulation ──
type VoiceState = 'idle' | 'recording' | 'transcribing'
const voiceState = ref<VoiceState>('idle')

// Simulated transcript that appears character by character
const liveTranscript = ref('')

// Predefined responses that the "voice recognition" will produce
const simulatedResponses = [
  '在实习期间，我们遇到了一个首屏加载超过 5 秒的性能问题，我通过代码分割和懒加载将时间降到了 1.2 秒。',
  '我认为 Code Review 是保证代码质量的重要环节，在之前的团队中我们采用轮换制，每次 PR 至少两人审核。',
  '如果重新设计，我会优先考虑微前端架构，因为当时单体应用已经严重影响了团队的独立部署效率。',
  '我更看重工作效率而非工作时长，合理的时间管理通常比加班更有效，但紧急情况下我愿意配合团队。',
  '最难调试的 Bug 是一个仅在 iOS Safari 上出现的滚动穿透问题，最终发现是 overscroll-behavior 未设置。',
  '我认为 AI 辅助开发会成为标配，但前端工程师的核心价值在于用户体验设计和架构能力。',
  '我通常先看官方文档的 Getting Started，然后动手写一个小项目，遇到问题再深入源码或社区讨论。',
]
let responseIndex = 0

let recordingTimer: ReturnType<typeof setTimeout> | null = null
let transcribeTimer: ReturnType<typeof setInterval> | null = null

function scrollToBottom() {
  nextTick(() => {
    if (chatArea.value) {
      chatArea.value.scrollTop = chatArea.value.scrollHeight
    }
  })
}

function startRecording() {
  voiceState.value = 'recording'
  // Simulate recording for 2-3 seconds, then auto-transcribe
  const duration = 2000 + Math.random() * 1000
  recordingTimer = setTimeout(() => {
    startTranscription()
  }, duration)
}

function startTranscription() {
  voiceState.value = 'transcribing'
  const fullText = simulatedResponses[responseIndex % simulatedResponses.length]
  responseIndex++

  liveTranscript.value = ''
  let charIdx = 0

  // Add a temporary "transcribing" bubble
  messages.value.push({ role: 'user', content: '' })
  scrollToBottom()

  transcribeTimer = setInterval(() => {
    if (charIdx < fullText.length) {
      // Add 1-3 chars at a time for natural feel
      const chunk = Math.min(1 + Math.floor(Math.random() * 3), fullText.length - charIdx)
      liveTranscript.value += fullText.slice(charIdx, charIdx + chunk)
      charIdx += chunk

      // Update the last message
      messages.value[messages.value.length - 1].content = liveTranscript.value
      scrollToBottom()
    } else {
      // Transcription complete
      clearInterval(transcribeTimer!)
      transcribeTimer = null
      liveTranscript.value = ''
      voiceState.value = 'idle'

      // AI responds after a short delay
      setTimeout(() => {
        messages.value.push({ role: 'ai', content: getNextAiMessage() })
        scrollToBottom()
      }, 800)
    }
  }, 50)
}

function toggleVoice() {
  if (voiceState.value === 'idle') {
    startRecording()
  } else if (voiceState.value === 'recording') {
    // Manual stop recording → start transcription
    if (recordingTimer) {
      clearTimeout(recordingTimer)
      recordingTimer = null
    }
    startTranscription()
  }
  // If transcribing, ignore taps
}

function endInterview() {
  router.push('/feedback')
}

onUnmounted(() => {
  if (recordingTimer) clearTimeout(recordingTimer)
  if (transcribeTimer) clearInterval(transcribeTimer)
})
</script>

<template>
  <div class="screen-view">
    <div class="interview-header">
      <div class="row" style="gap: 8px;">
        <span class="live-dot"></span>
        <span style="font-size: 13px; font-weight: 500;">面试中</span>
      </div>
      <span class="timer">08:42</span>
    </div>

    <div ref="chatArea" class="chat-area">
      <template v-for="(msg, i) in messages" :key="i">
        <ChatBubble :role="msg.role">
          {{ msg.content }}
          <span v-if="msg.role === 'user' && i === messages.length - 1 && voiceState === 'transcribing'" class="cursor"></span>
        </ChatBubble>
      </template>
    </div>

    <div class="controls">
      <div class="row-between">
        <AppButton variant="secondary" style="flex: 1;" @click="endInterview">结束面试</AppButton>
        <button
          :class="['voice-btn', voiceState]"
          :aria-label="voiceState === 'idle' ? '语音回答' : '停止录音'"
          @click="toggleVoice"
        >
          <MicIcon class="mic-icon" />
          <span v-if="voiceState === 'recording'" class="voice-ring"></span>
        </button>
      </div>
      <p v-if="voiceState === 'recording'" class="hint">正在录音，点击停止...</p>
      <p v-else-if="voiceState === 'transcribing'" class="hint">语音识别中...</p>
      <p v-else class="hint">点击麦克风开始语音回答</p>
    </div>
  </div>
</template>

<style scoped>
.screen-view {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  flex: 1;
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

.timer {
  font-family: var(--font-mono);
  font-size: 14px;
  font-weight: 600;
  color: var(--accent);
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

.hint {
  margin: 8px 0 0;
  text-align: center;
  font-size: 12px;
  color: var(--muted);
}
</style>
