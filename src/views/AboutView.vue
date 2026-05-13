<script setup lang="ts">
import { useRouter } from 'vue-router'
import ScreenView from '@/components/layout/ScreenView.vue'
import AppCard from '@/components/ui/AppCard.vue'
import BackButton from '@/components/ui/BackButton.vue'
import InfoIcon from '@/components/icons/InfoIcon.vue'

const router = useRouter()
</script>

<template>
  <ScreenView>
    <div class="pad stack" style="padding-top: 16px; gap: 20px;">
      <BackButton @click="router.push('/profile')" />

      <div class="text-center" style="margin-top: 4px;">
        <div class="app-logo">
          <InfoIcon class="logo-icon" />
        </div>
        <h1 class="title">智能面试官</h1>
        <p class="meta">v1.2.0</p>
      </div>

      <section data-od-id="about-intro">
        <AppCard padding="20px">
          <p class="intro">
            智能面试官是一款基于 AI 技术的面试模拟训练工具。我们覆盖前端开发、后端开发、产品经理、数据分析等 12 个岗位方向，提供 500+ 高质量面试题库，
            帮助你通过真实场景模拟提升面试能力。
          </p>
        </AppCard>
      </section>

      <section data-od-id="about-features">
        <p class="section-label">核心功能</p>
        <div class="feat-grid">
          <AppCard padding="14px 16px">
            <div class="feat-num accent">500+</div>
            <div class="feat-text">真实面试题库</div>
          </AppCard>
          <AppCard padding="14px 16px">
            <div class="feat-num accent">4维</div>
            <div class="feat-text">能力评估模型</div>
          </AppCard>
          <AppCard padding="14px 16px">
            <div class="feat-num accent">AI</div>
            <div class="feat-text">智能反馈建议</div>
          </AppCard>
          <AppCard padding="14px 16px">
            <div class="feat-num accent">12</div>
            <div class="feat-text">覆盖岗位方向</div>
          </AppCard>
        </div>
      </section>

      <section data-od-id="about-info">
        <p class="section-label">关于</p>
        <AppCard padding="0">
          <div class="info-row">
            <span>开发者</span>
            <span class="val">智能面试官 Team</span>
          </div>
          <div class="info-row">
            <span>技术支持</span>
            <span class="val">support@example.com</span>
          </div>
          <div class="info-row">
            <span>隐私政策</span>
            <ArrowRightIcon class="chev" />
          </div>
          <div class="info-row">
            <span>用户协议</span>
            <ArrowRightIcon class="chev" />
          </div>
        </AppCard>
      </section>

      <div class="text-center" style="padding-bottom: 32px;">
        <p class="meta">Copyright 2026 智能面试官</p>
      </div>
    </div>
  </ScreenView>
</template>

<script lang="ts">
import ArrowRightIcon from '@/components/icons/ArrowRightIcon.vue'
export default {
  components: { ArrowRightIcon }
}
</script>

<style scoped>
.pad {
  padding-inline: 20px;
}

.stack {
  display: flex;
  flex-direction: column;
}

.text-center {
  text-align: center;
}

.app-logo {
  width: 64px;
  height: 64px;
  border-radius: 18px;
  background: var(--accent);
  display: grid;
  place-items: center;
  margin: 0 auto 14px;
}

.logo-icon {
  width: 32px;
  height: 32px;
  stroke: #fff;
  fill: none;
  stroke-width: 2;
}

.title {
  font-family: var(--font-display);
  font-size: 22px;
  margin: 0 0 6px;
  letter-spacing: -0.02em;
}

.meta {
  font-family: var(--font-mono);
  font-size: var(--fs-meta);
  color: var(--muted);
  margin: 0;
}

.intro {
  margin: 0;
  font-size: 14px;
  line-height: 1.65;
  color: var(--muted);
}

.section-label {
  font-family: var(--font-mono);
  font-size: var(--fs-meta);
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin: 0 0 10px;
}

.feat-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
}

.feat-num {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: -0.02em;
  margin-bottom: 4px;
}

.accent {
  color: var(--accent);
}

.feat-text {
  font-size: 13px;
  color: var(--muted);
}

.info-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  font-size: 15px;
  border-top: 1px solid var(--border);
}

.info-row:first-child {
  border-top: 0;
}

.val {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--muted);
}

.chev {
  width: 16px;
  height: 16px;
  stroke: var(--border);
  fill: none;
  stroke-width: 2;
}
</style>
