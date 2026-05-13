<script setup lang="ts">
import { useRouter } from 'vue-router'
import ScreenView from '@/components/layout/ScreenView.vue'
import AppCard from '@/components/ui/AppCard.vue'
import BackButton from '@/components/ui/BackButton.vue'
import BarChartIcon from '@/components/icons/BarChartIcon.vue'

const router = useRouter()

interface ScoreEntry {
  date: string
  score: number
  label: string
}

const scoreHistory: ScoreEntry[] = [
  { date: '01/15', score: 62, label: '前端初级' },
  { date: '02/02', score: 68, label: '产品实习' },
  { date: '02/20', score: 71, label: '前端初级' },
  { date: '03/10', score: 73, label: '数据分析' },
  { date: '03/25', score: 76, label: '前端中级' },
  { date: '04/08', score: 74, label: '产品经理' },
  { date: '04/22', score: 78, label: '前端中级' },
  { date: '05/08', score: 80, label: '前端中级' },
]

const svgW = 300
const svgH = 180
const padL = 36
const padR = 16
const padT = 16
const padB = 28

const minScore = 50
const maxScore = 100
const range = maxScore - minScore

const points = scoreHistory.map((entry, i) => {
  const x = padL + (i / (scoreHistory.length - 1)) * (svgW - padL - padR)
  const y = padT + ((maxScore - entry.score) / range) * (svgH - padT - padB)
  return { x, y, ...entry }
})

const polyline = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ')
const fillArea = polyline + ` L${points[points.length - 1].x},${svgH - padB} L${points[0].x},${svgH - padB} Z`

const dimensions = [
  { name: '表达能力', score: 85 },
  { name: '逻辑思维', score: 78 },
  { name: '专业知识', score: 82 },
  { name: '应变能力', score: 75 },
]

const radarSize = 140
const radarR = 56
const radarCenter = radarSize / 2
const levelCount = 4

function radarPoint(angle: number, value: number, scale: number) {
  const r = (value / 100) * radarR * scale
  return `${radarCenter + r * Math.sin(angle)},${radarCenter - r * Math.cos(angle)}`
}

const dimLen = dimensions.length
const radarAngles = dimensions.map((_, i) => (2 * Math.PI * i) / dimLen - Math.PI / 2)

const radarPolygon = dimensions
  .map((d, i) => radarPoint(radarAngles[i], d.score, 1))
  .join(' ')

function levelPath(level: number) {
  const scale = level / levelCount
  return dimensions
    .map((_, i) => radarPoint(radarAngles[i], 100, scale))
    .join(' ')
}
</script>

<template>
  <ScreenView>
    <div class="pad stack" style="padding-top: 16px; gap: 20px;">
      <BackButton @click="router.push('/profile')" />

      <div class="text-center" style="margin-top: 4px;">
        <h1 class="title">能力成长曲线</h1>
        <p class="meta">基于 23 场面试数据分析</p>
      </div>

      <section data-od-id="growth-score-trend">
        <p class="section-label">面试得分趋势</p>
        <AppCard padding="16px">
          <svg
            :viewBox="`0 0 ${svgW} ${svgH}`"
            class="chart-svg"
          >
            <polygon
              :points="fillArea"
              :fill="'var(--accent-soft)'"
            />
            <path
              :d="polyline"
              fill="none"
              :stroke="'var(--accent)'"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <circle
              v-for="(p, i) in points"
              :key="i"
              :cx="p.x"
              :cy="p.y"
              r="4"
              :fill="'var(--surface)'"
              :stroke="'var(--accent)'"
              stroke-width="2"
            />
          </svg>
          <div class="label-row">
            <span class="meta" v-for="(p, i) in points" :key="i">{{ p.date }}</span>
          </div>
        </AppCard>
      </section>

      <section data-od-id="growth-radar">
        <p class="section-label">能力维度</p>
        <AppCard padding="16px">
          <div class="radar-wrap">
            <svg
              :viewBox="`0 0 ${radarSize} ${radarSize}`"
              class="radar-svg"
            >
              <polygon
                v-for="l in levelCount"
                :key="l"
                :points="levelPath(l)"
                fill="none"
                stroke="var(--border)"
                stroke-width="1"
              />
              <line
                v-for="(_, i) in dimensions"
                :key="'axis-' + i"
                :x1="radarCenter"
                :y1="radarCenter"
                :x2="radarCenter + radarR * Math.sin(radarAngles[i])"
                :y2="radarCenter - radarR * Math.cos(radarAngles[i])"
                stroke="var(--border)"
                stroke-width="1"
              />
              <polygon
                :points="radarPolygon"
                fill="var(--accent-soft)"
                stroke="var(--accent)"
                stroke-width="1.5"
              />
              <circle
                v-for="(d, i) in dimensions"
                :key="'dot-' + i"
                :cx="radarCenter + (d.score / 100) * radarR * Math.sin(radarAngles[i])"
                :cy="radarCenter - (d.score / 100) * radarR * Math.cos(radarAngles[i])"
                r="3"
                fill="var(--surface)"
                stroke="var(--accent)"
                stroke-width="1.5"
              />
            </svg>
            <div class="radar-labels">
              <div
                v-for="(d, i) in dimensions"
                :key="'lbl-' + i"
                class="radar-label-item"
              >
                <span class="d-label">{{ d.name }}</span>
                <span class="d-score">{{ d.score }}</span>
              </div>
            </div>
          </div>
        </AppCard>
      </section>

      <section data-od-id="growth-summary">
        <AppCard padding="16px">
          <div class="row-between" style="margin-bottom: 10px;">
            <span class="h3">AI 成长建议</span>
            <BarChartIcon class="advice-icon" />
          </div>
          <p class="meta" style="line-height: 1.6;">
            近3个月你的面试得分从62分提升至80分，增长29%。表达能力是你的强项（85分），
            建议加强应变能力的刻意练习（75分），特别是在压力题和开放性问题上的应对。
          </p>
        </AppCard>
      </section>

      <div style="padding-bottom: 24px;" />
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

.section-label {
  font-family: var(--font-mono);
  font-size: var(--fs-meta);
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin: 0 0 10px;
}

.chart-svg {
  width: 100%;
  height: auto;
  display: block;
}

.label-row {
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
}

.radar-wrap {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.radar-svg {
  width: 140px;
  height: 140px;
  flex-shrink: 0;
}

.radar-labels {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 4px;
}

.radar-label-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.d-label {
  font-size: 13px;
  min-width: 64px;
}

.d-score {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
  font-size: 13px;
  font-weight: 600;
  color: var(--accent);
}

.h3 {
  font-size: var(--fs-h3);
  font-weight: 600;
  line-height: 1.3;
  margin: 0;
}

.row-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.advice-icon {
  width: 18px;
  height: 18px;
  stroke: var(--muted);
  fill: none;
  stroke-width: 1.8;
}
</style>
