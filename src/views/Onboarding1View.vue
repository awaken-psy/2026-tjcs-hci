<script setup lang="ts">
import { useRouter } from 'vue-router'
import ScreenView from '@/components/layout/ScreenView.vue'
import AppButton from '@/components/ui/AppButton.vue'
import MonitorIcon from '@/components/icons/MonitorIcon.vue'

const router = useRouter()

function next() {
  router.push('/onboarding-2')
}

function skip() {
  router.push('/login')
}
</script>

<template>
  <ScreenView>
    <div class="onboarding-wrap">
    <div class="onboarding-illustration">
      <MonitorIcon class="illustration-icon" />
    </div>

    <div class="text-center">
      <p class="meta step">STEP 1 OF 2</p>
      <h1 class="headline">真实面试场景模拟</h1>
      <p class="desc">基于 500+ 真实企业面试题库，覆盖技术、产品、运营等核心岗位，还原真实面试流程。</p>
    </div>

    <div class="dots">
      <span class="dot active"></span>
      <span class="dot"></span>
    </div>

    <div class="actions">
      <AppButton @click="next">下一步</AppButton>
      <AppButton variant="ghost" @click="skip">跳过</AppButton>
    </div>
  </ScreenView>
</template>

<style scoped>
.onboarding-wrap {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 32px 28px 24px;
  gap: 24px;
  min-height: 100%;
}

.onboarding-illustration {
  width: 100%;
  aspect-ratio: 4 / 3;
  max-width: 100%;
  background: linear-gradient(135deg, var(--accent-soft), var(--fg-soft)), var(--surface);
  border: 1px solid var(--border);
  border-radius: 24px;
  display: grid;
  place-items: center;
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 12px;
}

.illustration-icon {
  width: 64px;
  height: 64px;
  stroke: var(--accent);
  fill: none;
  stroke-width: 1.5;
}

.text-center {
  text-align: center;
}

.step {
  margin: 0 0 8px;
  font-family: var(--font-mono);
  font-size: var(--fs-meta);
  color: var(--muted);
}

.headline {
  font-family: var(--font-display);
  font-size: 24px;
  margin: 0 0 12px;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.desc {
  margin: 0 auto;
  max-width: 28ch;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.6;
}

.dots {
  display: flex;
  justify-content: center;
  gap: 6px;
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--border);
  transition: all 0.2s;
}

.dot.active {
  width: 18px;
  background: var(--accent);
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: auto;
}
</style>
