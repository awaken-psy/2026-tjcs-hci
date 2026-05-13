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
import SearchIcon from '@/components/icons/SearchIcon.vue'
import PlayIcon from '@/components/icons/PlayIcon.vue'
import CodeIcon from '@/components/icons/CodeIcon.vue'
import PenIcon from '@/components/icons/PenIcon.vue'
import BarChartIcon from '@/components/icons/BarChartIcon.vue'

const router = useRouter()

function goToJobs() {
  router.push('/jobs')
}

function goToJobDetail() {
  router.push('/job-detail?from=home')
}

function goToNotifications() {
  router.push('/notifications')
}
</script>

<template>
  <AppLayout>
    <AppHeader greeting="周四 · 5月8日" title="早上好，张明">
      <template #action>
        <div class="action-group">
          <IconButton aria-label="搜索" @click="router.push('/search')">
            <SearchIcon />
          </IconButton>
          <IconButton aria-label="通知" @click="goToNotifications">
            <BellIcon />
          </IconButton>
        </div>
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

    <section class="pad" data-od-id="growth-entry" style="margin-top: 18px;">
      <div class="row-between" style="margin-bottom: 10px;">
        <span class="h3">学习成长</span>
      </div>
      <div class="grid-3">
        <AppCard padding="14px 10px" style="text-align: center; cursor: pointer;" @click="router.push('/study-plan')">
          <div class="entry-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
              <polyline points="8 14 10 16 16 10" />
            </svg>
          </div>
          <div class="entry-label">学习计划</div>
          <div class="entry-meta">13 天 Streak</div>
        </AppCard>
        <AppCard padding="14px 10px" style="text-align: center; cursor: pointer;" @click="router.push('/leaderboard')">
          <div class="entry-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M6 9H4.5a2 2 0 00-2 2v9a2 2 0 002 2H6" />
              <path d="M18 6h1.5a2 2 0 012 2v12a2 2 0 01-2 2H18" />
              <rect x="6" y="10" width="5" height="11" rx="1" />
              <rect x="13" y="4" width="5" height="17" rx="1" />
            </svg>
          </div>
          <div class="entry-label">排行榜</div>
          <div class="entry-meta">Top 15%</div>
        </AppCard>
        <AppCard padding="14px 10px" style="text-align: center; cursor: pointer;" @click="router.push('/community')">
          <div class="entry-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              <line x1="9" y1="10" x2="15" y2="10" /><line x1="9" y1="14" x2="13" y2="14" />
            </svg>
          </div>
          <div class="entry-label">面经社区</div>
          <div class="entry-meta">6 篇新面经</div>
        </AppCard>
      </div>
    </section>

    <section class="pad" data-od-id="cta" style="margin-top: 14px;">
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
        <AppCard class="job-row" @click="goToJobDetail">
          <Avatar :size="44">
            <CodeIcon />
          </Avatar>
          <div class="flex-1">
            <div class="job-title">前端开发工程师</div>
            <div class="job-sub">阿里 · 字节 · 美团高频题</div>
          </div>
          <Pill>热</Pill>
        </AppCard>

        <AppCard class="job-row" @click="goToJobDetail">
          <Avatar :size="44">
            <PenIcon />
          </Avatar>
          <div class="flex-1">
            <div class="job-title">产品经理</div>
            <div class="job-sub">需求分析 · 项目复盘 · 优先级</div>
          </div>
        </AppCard>

        <AppCard class="job-row" @click="goToJobDetail">
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
.action-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

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

.entry-icon {
  width: 36px; height: 36px;
  border-radius: 12px;
  background: var(--accent-soft);
  color: var(--accent);
  display: grid; place-items: center;
  margin: 0 auto 8px;
}
.entry-icon svg { width: 20px; height: 20px; }
.entry-label { font-size: 13px; font-weight: 600; }
.entry-meta {
  font-family: var(--font-mono);
  font-size: 10px; color: var(--muted);
  margin-top: 3px;
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
