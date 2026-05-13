<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import ScreenView from '@/components/layout/ScreenView.vue'
import BackButton from '@/components/ui/BackButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppButton from '@/components/ui/AppButton.vue'

const router = useRouter()

const streak = ref(13)

const weekPlan = ref([
  { day: '周一', task: '刷算法题 3 道', done: true },
  { day: '周二', task: '复习错题集', done: true },
  { day: '周三', task: '模拟面试 1 场', done: false },
  { day: '周四', task: '刷系统设计题 2 道', done: false },
  { day: '周五', task: '复习前端基础', done: false },
  { day: '周六', task: '整理面经笔记', done: false },
  { day: '周日', task: '自由练习', done: false },
])

function toggleDone(index: number) {
  weekPlan.value[index].done = !weekPlan.value[index].done
}

// May 2026 calendar — May 1 = Friday
const checkedDays = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
const totalDays = 31
const startDay = 5 // Friday

const calendarWeeks = computed(() => {
  const weeks: (number | null)[][] = []
  let day = 1
  let current: (number | null)[] = []
  for (let i = 0; i < startDay; i++) current.push(null)
  while (day <= totalDays) {
    current.push(day)
    if (current.length === 7) { weeks.push(current); current = [] }
    day++
  }
  while (current.length > 0 && current.length < 7) current.push(null)
  if (current.length > 0) weeks.push(current)
  return weeks
})

function isChecked(day: number) { return checkedDays.includes(day) }
function isToday(day: number) { return day === 13 }

const dayHeaders = ['日', '一', '二', '三', '四', '五', '六']

const suggestedTasks = [
  { title: '完成「虚拟滚动」错题回顾', reason: '上次得分偏低' },
  { title: '模拟一场前端中级面试', reason: '本周还未完成' },
  { title: '学习 React Fiber 架构', reason: '高频考点' },
]

function goBack() { router.push('/home') }
</script>

<template>
  <ScreenView>
    <div class="pad stack" style="padding-top: 12px; gap: 18px; padding-bottom: 24px;">
      <BackButton @click="goBack" />

      <div class="row-between">
        <h1 class="title">学习计划</h1>
        <span class="week-label">第 20 周</span>
      </div>

      <!-- Streak -->
      <AppCard padding="18px" class="streak-card">
        <div class="row" style="gap: 16px;">
          <div class="streak-fire">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 2C8.5 8 4 10 4 15a8 8 0 0016 0c0-5-4.5-7-8-13z" fill="currentColor" stroke="none" />
            </svg>
          </div>
          <div>
            <div class="streak-num">{{ streak }} <span class="streak-unit">天</span></div>
            <div class="streak-label">连续打卡</div>
          </div>
        </div>
        <p class="streak-msg">再坚持 7 天解锁「自律达人」成就</p>
      </AppCard>

      <!-- Weekly Plan -->
      <section>
        <p class="section-label">本周计划</p>
        <div class="plan-list">
          <div
            v-for="(item, i) in weekPlan"
            :key="item.day"
            class="plan-row"
            :class="{ done: item.done }"
            @click="toggleDone(i)"
          >
            <div class="check-box" :class="{ checked: item.done }">
              <svg v-if="item.done" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div class="plan-content">
              <span class="plan-day">{{ item.day }}</span>
              <span class="plan-task" :class="{ done: item.done }">{{ item.task }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Month Calendar -->
      <section>
        <p class="section-label">5月打卡日历</p>
        <AppCard padding="14px">
          <div class="cal-header">
            <span v-for="d in dayHeaders" :key="d" class="cal-dow">{{ d }}</span>
          </div>
          <div class="cal-grid">
            <template v-for="(week, wi) in calendarWeeks" :key="wi">
              <div
                v-for="(day, di) in week"
                :key="wi + '-' + di"
                class="cal-cell"
                :class="{
                  empty: day === null,
                  checked: day && isChecked(day),
                  today: day && isToday(day),
                }"
              >
                <span v-if="day" class="cal-num">{{ day }}</span>
              </div>
            </template>
          </div>
        </AppCard>
      </section>

      <!-- Suggested Tasks -->
      <section>
        <p class="section-label">AI 建议任务</p>
        <div class="stack" style="gap: 8px;">
          <AppCard
            v-for="(t, i) in suggestedTasks"
            :key="i"
            padding="14px 16px"
            class="suggest-row"
          >
            <div class="row-between">
              <div>
                <div class="suggest-title">{{ t.title }}</div>
                <div class="suggest-reason">{{ t.reason }}</div>
              </div>
              <AppButton variant="ghost" style="flex-shrink: 0;">开始</AppButton>
            </div>
          </AppCard>
        </div>
      </section>
    </div>
  </ScreenView>
</template>

<style scoped>
.pad { padding-inline: 20px; }
.stack { display: flex; flex-direction: column; }
.row { display: flex; align-items: center; }
.row-between { display: flex; align-items: center; justify-content: space-between; gap: 8px; }

.title {
  font-family: var(--font-display);
  font-size: 24px;
  letter-spacing: -0.02em;
  margin: 0;
}

.week-label {
  font-family: var(--font-mono);
  font-size: var(--fs-meta);
  color: var(--muted);
}

/* Streak */
.streak-card {
  border-color: transparent;
  background: linear-gradient(135deg, oklch(94% 0.03 65), oklch(98% 0.015 55));
}
.streak-fire {
  width: 52px; height: 52px;
  border-radius: 50%;
  background: oklch(64% 0.18 42);
  color: #fff;
  display: grid; place-items: center;
  flex-shrink: 0;
}
.streak-fire svg { width: 28px; height: 28px; }
.streak-num {
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.03em;
}
.streak-unit { font-size: 18px; font-weight: 500; }
.streak-label {
  font-family: var(--font-mono);
  font-size: var(--fs-meta);
  color: var(--muted);
  margin-top: 2px;
}
.streak-msg {
  margin: 12px 0 0;
  font-size: 13px;
  color: oklch(48% 0.12 42);
}

/* Section label */
.section-label {
  font-family: var(--font-mono);
  font-size: var(--fs-meta);
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin: 0 0 10px;
}

/* Weekly Plan */
.plan-list { display: flex; flex-direction: column; gap: 6px; }
.plan-row {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 14px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  cursor: pointer;
  transition: border-color 0.15s;
}
.plan-row.done { opacity: 0.55; }
.check-box {
  width: 24px; height: 24px;
  border-radius: 6px;
  border: 2px solid var(--border);
  flex-shrink: 0;
  display: grid; place-items: center;
  transition: all 0.15s;
}
.check-box.checked {
  background: oklch(55% 0.14 145);
  border-color: oklch(55% 0.14 145);
}
.check-box svg { width: 14px; height: 14px; stroke: #fff; }
.plan-content { display: flex; align-items: center; gap: 10px; }
.plan-day {
  font-size: 13px;
  font-weight: 600;
  font-family: var(--font-mono);
  min-width: 32px;
}
.plan-task { font-size: 14px; }
.plan-task.done { text-decoration: line-through; color: var(--muted); }

/* Calendar */
.cal-header {
  display: grid; grid-template-columns: repeat(7, 1fr);
  text-align: center; margin-bottom: 6px;
}
.cal-dow {
  font-family: var(--font-mono);
  font-size: 11px; color: var(--muted);
  padding: 4px 0;
}
.cal-grid {
  display: flex; flex-direction: column; gap: 4px;
}
.cal-grid > template {
  display: contents;
}
.cal-cell {
  aspect-ratio: 1;
  display: grid; place-items: center;
  border-radius: 50%;
  font-size: 14px;
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
}
.cal-cell.empty { visibility: hidden; }
.cal-cell.checked {
  background: oklch(55% 0.14 145);
  color: #fff;
  font-weight: 600;
}
.cal-cell.today:not(.checked) {
  box-shadow: inset 0 0 0 2px oklch(55% 0.14 145);
  color: oklch(55% 0.14 145);
  font-weight: 600;
}
.cal-num { line-height: 1; }

/* calendar grid needs actual grid */
.cal-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

/* Suggested */
.suggest-row {
  cursor: pointer;
}
.suggest-title { font-size: 14px; font-weight: 500; }
.suggest-reason {
  font-size: 12px; color: var(--muted);
  font-family: var(--font-mono); margin-top: 3px;
}
</style>
