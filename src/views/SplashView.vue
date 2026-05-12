<script setup lang="ts">
import { useRouter } from 'vue-router'
import ScreenView from '@/components/layout/ScreenView.vue'
import MicIcon from '@/components/icons/MicIcon.vue'

const router = useRouter()

function goToOnboarding() {
  router.push('/onboarding-1')
}
</script>

<template>
  <ScreenView>
    <div class="splash-wrap" @click="goToOnboarding">
    <div class="splash-logo">
      <MicIcon class="logo-icon" />
    </div>
    <h1 class="splash-title">智能面试官</h1>
    <p class="splash-sub">AI 模拟面试陪练助手<br>让每一次练习都算数</p>
    <p class="meta hint">点击任意处开始 →</p>
    </div>
  </ScreenView>
</template>

<style scoped>
.splash-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 40px 32px;
  text-align: center;
  min-height: 100%;
}

.splash-logo {
  width: 88px;
  height: 88px;
  border-radius: 24px;
  background: var(--accent);
  display: grid;
  place-items: center;
  color: #fff;
}

.logo-icon {
  width: 44px;
  height: 44px;
  stroke: currentColor;
  fill: none;
  stroke-width: 1.8;
}

.splash-title {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0;
}

.splash-sub {
  font-size: 14px;
  color: var(--muted);
  line-height: 1.5;
  margin: 0;
  max-width: 24ch;
}

.meta {
  font-family: var(--font-mono);
  font-size: var(--fs-meta);
  color: var(--muted);
}

.hint {
  margin-top: auto;
  padding-top: 40px;
}
</style>
