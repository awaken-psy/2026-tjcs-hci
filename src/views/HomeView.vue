<script setup lang="ts">
import { useRouter } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'
import AppHeader from '@/components/ui/AppHeader.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppButton from '@/components/ui/AppButton.vue'
import IconButton from '@/components/ui/IconButton.vue'
import Pill from '@/components/ui/Pill.vue'
import Avatar from '@/components/ui/Avatar.vue'
import BellIcon from '@/components/icons/BellIcon.vue'
import PlayIcon from '@/components/icons/PlayIcon.vue'
import CodeIcon from '@/components/icons/CodeIcon.vue'
import PenIcon from '@/components/icons/PenIcon.vue'
import BarChartIcon from '@/components/icons/BarChartIcon.vue'

const router = useRouter()

function goToJobs() {
  router.push('/jobs')
}

function goToSetup() {
  router.push('/setup')
}

function goToNotifications() {
  router.push('/notifications')
}
</script>

<template>
  <AppLayout>
    <AppHeader greeting="周四 · 5月8日" title="早上好，张明">
      <template #action>
        <IconButton aria-label="通知" @click="goToNotifications">
          <BellIcon />
        </IconButton>
      </template>
    </AppHeader>

    <section class="pad" data-od-id="stats">
      <div class="grid-3">
        <AppCard padding="14px 8px" style="text-align: center;">
          <div class="num accent">12</div>
          <div class="meta">本周面试</div>
        </AppCard>
        <AppCard padding="14px 8px" style="text-align: center;">
          <div class="num">82</div>
          <div class="meta">平均得分</div>
        </AppCard>
        <AppCard padding="14px 8px" style="text-align: center;">
          <div class="num">3.5h</div>
          <div class="meta">练习时长</div>
        </AppCard>
      </div>
    </section>

    <section class="pad" data-od-id="cta" style="margin-top: 6px;">
      <AppButton @click="goToJobs">
        <PlayIcon class="btn-icon" />
        开始新面试
      </AppButton>
    </section>

    <section class="pad" data-od-id="recommended" style="margin-top: 18px;">
      <div class="row-between" style="margin-bottom: 10px;">
        <span class="h3">推荐岗位</span>
        <AppButton variant="ghost" style="padding: 4px 8px;" @click="goToJobs">全部 →</AppButton>
      </div>
      <div class="stack" style="gap: 8px;">
        <AppCard class="job-row" @click="goToSetup">
          <Avatar :size="44">
            <CodeIcon />
          </Avatar>
          <div class="flex-1">
            <div class="job-title">前端开发工程师</div>
            <div class="job-sub">阿里 · 字节 · 美团高频题</div>
          </div>
          <Pill>热</Pill>
        </AppCard>

        <AppCard class="job-row" @click="goToSetup">
          <Avatar :size="44">
            <PenIcon />
          </Avatar>
          <div class="flex-1">
            <div class="job-title">产品经理</div>
            <div class="job-sub">需求分析 · 项目复盘 · 优先级</div>
          </div>
        </AppCard>

        <AppCard class="job-row" @click="goToSetup">
          <Avatar :size="44">
            <BarChartIcon />
          </Avatar>
          <div class="flex-1">
            <div class="job-title">数据分析师</div>
            <div class="job-sub">SQL · 统计学 · 业务洞察</div>
          </div>
        </AppCard>
      </div>
    </section>
  </AppLayout>
</template>

<style scoped>
.pad {
  padding-inline: 20px;
}

.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.num {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
  font-size: 22px;
  letter-spacing: -0.02em;
}

.accent {
  color: var(--accent);
}

.meta {
  font-family: var(--font-mono);
  font-size: var(--fs-meta);
  color: var(--muted);
  margin-top: 4px;
}

.row-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.h3 {
  font-size: var(--fs-h3);
  font-weight: 600;
  line-height: 1.3;
  margin: 0;
}

.stack {
  display: flex;
  flex-direction: column;
}

.job-row {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.flex-1 {
  flex: 1;
}

.job-title {
  font-size: 15px;
  font-weight: 500;
}

.job-sub {
  color: var(--muted);
  font-size: 13px;
  margin-top: 2px;
}

.btn-icon {
  width: 18px;
  height: 18px;
  stroke: currentColor;
  fill: none;
  stroke-width: 2;
  margin-right: 8px;
}
</style>
