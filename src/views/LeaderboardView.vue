<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import ScreenView from '@/components/layout/ScreenView.vue'
import BackButton from '@/components/ui/BackButton.vue'

const router = useRouter()

const tabs = ['周榜', '月榜', '总榜'] as const
type Tab = (typeof tabs)[number]
const activeTab = ref<Tab>('周榜')

interface User {
  name: string
  avatar: string
  weeklyScore: number
  monthlyScore: number
  totalScore: number
  problems: number
  streak: number
}

const users: User[] = [
  { name: '林涛', avatar: '林', weeklyScore: 94, monthlyScore: 92, totalScore: 91, problems: 156, streak: 42 },
  { name: '何雨', avatar: '何', weeklyScore: 91, monthlyScore: 89, totalScore: 88, problems: 134, streak: 31 },
  { name: '赵敏', avatar: '赵', weeklyScore: 88, monthlyScore: 90, totalScore: 89, problems: 143, streak: 28 },
  { name: '李华', avatar: '李', weeklyScore: 86, monthlyScore: 85, totalScore: 83, problems: 121, streak: 25 },
  { name: '王芳', avatar: '王', weeklyScore: 84, monthlyScore: 86, totalScore: 85, problems: 118, streak: 22 },
  { name: '杨帆', avatar: '杨', weeklyScore: 83, monthlyScore: 82, totalScore: 81, problems: 108, streak: 20 },
  { name: '黄磊', avatar: '黄', weeklyScore: 82, monthlyScore: 83, totalScore: 80, problems: 103, streak: 18 },
  { name: '周婷', avatar: '周', weeklyScore: 81, monthlyScore: 79, totalScore: 82, problems: 99, streak: 16 },
  { name: '陈静', avatar: '陈', weeklyScore: 80, monthlyScore: 81, totalScore: 78, problems: 95, streak: 19 },
  { name: '刘洋', avatar: '刘', weeklyScore: 79, monthlyScore: 78, totalScore: 79, problems: 91, streak: 15 },
  { name: '吴鑫', avatar: '吴', weeklyScore: 78, monthlyScore: 76, totalScore: 77, problems: 87, streak: 14 },
  { name: '孙悦', avatar: '孙', weeklyScore: 77, monthlyScore: 77, totalScore: 75, problems: 82, streak: 13 },
  { name: '郑爽', avatar: '郑', weeklyScore: 76, monthlyScore: 75, totalScore: 76, problems: 78, streak: 12 },
  { name: '钱多', avatar: '钱', weeklyScore: 75, monthlyScore: 74, totalScore: 73, problems: 74, streak: 11 },
  { name: '马超', avatar: '马', weeklyScore: 73, monthlyScore: 72, totalScore: 74, problems: 70, streak: 10 },
  { name: '张明', avatar: '张', weeklyScore: 80, monthlyScore: 79, totalScore: 80, problems: 82, streak: 13 },
  { name: '郭强', avatar: '郭', weeklyScore: 72, monthlyScore: 71, totalScore: 70, problems: 65, streak: 9 },
  { name: '高远', avatar: '高', weeklyScore: 70, monthlyScore: 70, totalScore: 69, problems: 61, streak: 11 },
  { name: '罗浩', avatar: '罗', weeklyScore: 69, monthlyScore: 68, totalScore: 68, problems: 58, streak: 8 },
  { name: '梁晓', avatar: '梁', weeklyScore: 67, monthlyScore: 69, totalScore: 67, problems: 55, streak: 7 },
  { name: '宋薇', avatar: '宋', weeklyScore: 66, monthlyScore: 65, totalScore: 66, problems: 52, streak: 6 },
  { name: '唐宇', avatar: '唐', weeklyScore: 64, monthlyScore: 66, totalScore: 64, problems: 48, streak: 8 },
  { name: '韩冰', avatar: '韩', weeklyScore: 62, monthlyScore: 63, totalScore: 63, problems: 45, streak: 5 },
  { name: '朱睿', avatar: '朱', weeklyScore: 61, monthlyScore: 60, totalScore: 61, problems: 42, streak: 4 },
  { name: '胡洁', avatar: '胡', weeklyScore: 58, monthlyScore: 62, totalScore: 60, problems: 38, streak: 3 },
]

type ScoreKey = 'weeklyScore' | 'monthlyScore' | 'totalScore'

const scoreKey = computed<ScoreKey>(() => {
  if (activeTab.value === '周榜') return 'weeklyScore'
  if (activeTab.value === '月榜') return 'monthlyScore'
  return 'totalScore'
})

const ranked = computed(() => {
  const sorted = [...users].sort((a, b) => b[scoreKey.value] - a[scoreKey.value])
  return sorted
})

const top3 = computed(() => ranked.value.slice(0, 3))
const rest = computed(() => ranked.value.slice(3))

const currentUserRank = computed(() => {
  return ranked.value.findIndex(u => u.name === '张明') + 1
})

const percentile = computed(() => {
  const rank = currentUserRank.value
  const total = ranked.value.length
  return Math.round(((total - rank) / total) * 100)
})

const medals = ['#FFD700', '#C0C0C0', '#CD7F32']

function goBack() { router.push('/home') }
</script>

<template>
  <ScreenView>
    <div class="pad stack" style="padding-top: 12px; gap: 16px; padding-bottom: 24px;">
      <BackButton @click="goBack" />
      <h1 class="title">排行榜</h1>

      <!-- Tabs -->
      <div class="tab-bar">
        <button
          v-for="t in tabs" :key="t"
          class="tab-btn" :class="{ active: activeTab === t }"
          @click="activeTab = t"
        >{{ t }}</button>
      </div>

      <!-- Top 3 -->
      <div class="top3-row">
        <div v-for="(u, i) in top3" :key="u.name" class="top3-card" :class="'rank-' + (i + 1)">
          <div class="medal" :style="{ background: medals[i] }">
            <span class="medal-num">{{ i + 1 }}</span>
          </div>
          <div class="top3-avatar">{{ u.avatar }}</div>
          <div class="top3-name">{{ u.name }}</div>
          <div class="top3-score">{{ u[scoreKey] }}<span class="score-unit">分</span></div>
          <div class="top3-meta">{{ u.problems }} 题 · {{ u.streak }}天</div>
        </div>
      </div>

      <!-- Rest of list -->
      <div class="list">
        <div
          v-for="(u, i) in rest"
          :key="u.name"
          class="list-row"
          :class="{ me: u.name === '张明' }"
        >
          <span class="rank-num">{{ i + 4 }}</span>
          <div class="list-avatar" :class="{ me: u.name === '张明' }">{{ u.avatar }}</div>
          <div class="list-info">
            <div class="list-name">
              {{ u.name }}
              <span v-if="u.name === '张明'" class="me-tag">我</span>
            </div>
            <div class="list-meta">{{ u.problems }} 题 · 打卡 {{ u.streak }} 天</div>
          </div>
          <div class="list-score">{{ u[scoreKey] }}<span class="score-unit">分</span></div>
        </div>
      </div>

      <!-- Percentile -->
      <div class="pct-card">
        <div class="pct-row">
          <span class="pct-label">当前排名</span>
          <span class="pct-rank">第 {{ currentUserRank }} 名</span>
        </div>
        <div class="pct-row pct-row-divider">
          <span class="pct-label">超越了</span>
          <span class="pct-value">{{ percentile }}% 的用户</span>
        </div>
      </div>
    </div>
  </ScreenView>
</template>

<style scoped>
.pad { padding-inline: 20px; }
.stack { display: flex; flex-direction: column; }

.title {
  font-family: var(--font-display);
  font-size: 24px;
  letter-spacing: -0.02em;
  margin: 0;
}

/* Tabs */
.tab-bar { display: flex; gap: 6px; }
.tab-btn {
  flex: 1; padding: 8px 0;
  border-radius: 10px; border: 0;
  background: var(--fg-soft);
  color: var(--muted);
  font-size: 14px; font-family: inherit;
  cursor: pointer; transition: all 0.15s;
}
.tab-btn.active {
  background: var(--accent);
  color: #fff;
  font-weight: 600;
}

/* Top 3 */
.top3-row {
  display: flex; gap: 10px;
}
.top3-card {
  flex: 1;
  display: flex; flex-direction: column; align-items: center;
  gap: 4px;
  padding: 16px 4px;
  border-radius: var(--radius-card);
  background: var(--surface);
  border: 1px solid var(--border);
  position: relative;
}
.top3-card.rank-1 { border-color: #FFD700; background: oklch(97% 0.04 90); }
.medal {
  width: 28px; height: 28px;
  border-radius: 50%;
  display: grid; place-items: center;
  position: absolute; top: 10px; left: 10px;
}
.medal-num { font-size: 13px; font-weight: 700; color: #fff; }
.top3-avatar {
  width: 44px; height: 44px;
  border-radius: 50%;
  background: var(--fg-soft);
  display: grid; place-items: center;
  font-size: 16px; font-weight: 600;
}
.top3-name { font-size: 13px; font-weight: 600; }
.top3-score {
  font-family: var(--font-display);
  font-size: 20px; font-weight: 700;
  letter-spacing: -0.02em;
}
.score-unit { font-size: 12px; font-weight: 400; color: var(--muted); }
.top3-meta { font-family: var(--font-mono); font-size: 10px; color: var(--muted); }

/* List */
.list {
  display: flex; flex-direction: column;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  overflow: hidden;
}
.list-row {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 14px;
  border-bottom: 1px solid var(--border);
  transition: background 0.1s;
}
.list-row:last-child { border-bottom: 0; }
.list-row.me { background: oklch(97% 0.015 140); }
.rank-num {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
  font-size: 13px; color: var(--muted);
  min-width: 24px; text-align: center;
}
.list-avatar {
  width: 36px; height: 36px;
  border-radius: 50%;
  background: var(--fg-soft);
  display: grid; place-items: center;
  font-size: 13px; font-weight: 600;
  flex-shrink: 0;
}
.list-avatar.me {
  background: var(--accent);
  color: #fff;
}
.list-info { flex: 1; }
.list-name { font-size: 14px; font-weight: 500; }
.me-tag {
  display: inline-block;
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 999px;
  background: var(--accent);
  color: #fff;
  margin-left: 6px;
  vertical-align: middle;
  font-family: var(--font-mono);
}
.list-meta { font-size: 11px; color: var(--muted); font-family: var(--font-mono); margin-top: 2px; }
.list-score {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
  font-size: 16px; font-weight: 600;
  letter-spacing: -0.01em;
}
.list-score .score-unit { font-size: 11px; }

/* Percentile card */
.pct-card {
  background: var(--accent-soft);
  border-radius: 12px;
  padding: 20px;
}
.pct-row {
  display: flex; align-items: center; justify-content: space-between;
}
.pct-row-divider {
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px solid var(--border);
}
.pct-label { font-size: 14px; color: var(--muted); }
.pct-rank { font-size: 15px; font-weight: 600; }
.pct-value { font-family: var(--font-display); font-size: 20px; font-weight: 700; color: var(--accent); letter-spacing: -0.02em; }
</style>
