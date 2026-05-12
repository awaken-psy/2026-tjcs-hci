<script setup lang="ts">
import { useRouter } from 'vue-router'
import AppButton from '@/components/ui/AppButton.vue'
import ChatBubble from '@/components/ui/ChatBubble.vue'
import MicIcon from '@/components/icons/MicIcon.vue'

const router = useRouter()

function endInterview() {
  router.push('/feedback')
}
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

    <div class="controls">
      <div class="row-between">
        <AppButton variant="secondary" style="flex: 1;" @click="endInterview">结束面试</AppButton>
        <button class="voice-btn" aria-label="语音回答">
          <MicIcon class="mic-icon" />
        </button>
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
</style>
