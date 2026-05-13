<script setup lang="ts">
import { useRouter } from 'vue-router'
import ScreenView from '@/components/layout/ScreenView.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import ScoreRing from '@/components/ui/ScoreRing.vue'
import ProgressBar from '@/components/ui/ProgressBar.vue'

const router = useRouter()

const dimensions = [
  { label: '表达能力', score: 85 },
  { label: '逻辑思维', score: 78 },
  { label: '专业知识', score: 82 },
  { label: '应变能力', score: 75 },
]

function goHome() {
  router.push('/home')
}

function retry() {
  router.push('/setup')
}

function goDetailed() {
  router.push('/detailed-feedback')
}
</script>

<template>
  <ScreenView>
    <div class="pad stack" style="padding-top: 16px; gap: 24px;">
    <div class="text-center">
      <p class="meta">面试报告</p>
      <h1 class="h2">前端开发工程师 · 中级</h1>
      <p class="meta">2026年5月8日 · 8 分钟</p>
    </div>

    <ScoreRing :score="80" />

    <section>
      <p class="meta section-title">维度得分</p>
      <div class="stack" style="gap: 12px;">
        <div v-for="d in dimensions" :key="d.label">
          <div class="row-between">
            <span style="font-size: 14px;">{{ d.label }}</span>
            <span class="num">{{ d.score }}</span>
          </div>
          <ProgressBar :value="d.score" />
        </div>
      </div>
    </section>

    <AppCard>
      <p class="meta section-title">AI 建议</p>
      <p class="advice">
        你的技术基础扎实，建议在项目描述中增加更多量化成果（如性能提升百分比、用户规模）。此外，遇到压力题时可以先停顿 2-3 秒组织语言，避免语速过快。
      </p>
    </AppCard>

    <div class="stack" style="gap: 10px;">
      <AppButton @click="goDetailed">
        查看详细报告
      </AppButton>
      <AppButton variant="secondary" @click="retry">再来一次</AppButton>
      <AppButton variant="ghost" @click="goHome">回到首页</AppButton>
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

.text-center {
  text-align: center;
}

.meta {
  font-family: var(--font-mono);
  font-size: var(--fs-meta);
  color: var(--muted);
  margin: 0 0 8px;
}

.h2 {
  font-family: var(--font-display);
  font-size: 24px;
  margin: 0;
}

.section-title {
  margin: 0 0 8px;
}

.row-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4px;
}

.num {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
  font-size: 14px;
  font-weight: 600;
}

.advice {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  color: var(--muted);
}
</style>
