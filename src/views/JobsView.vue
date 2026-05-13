<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ScreenView from '@/components/layout/ScreenView.vue'
import BackButton from '@/components/ui/BackButton.vue'
import AppButton from '@/components/ui/AppButton.vue'
import JobCard from '@/components/ui/JobCard.vue'
import CodeIcon from '@/components/icons/CodeIcon.vue'
import PenIcon from '@/components/icons/PenIcon.vue'
import InfoIcon from '@/components/icons/InfoIcon.vue'
import SettingsIcon from '@/components/icons/SettingsIcon.vue'
import BarChartIcon from '@/components/icons/BarChartIcon.vue'
import MonitorIcon from '@/components/icons/MonitorIcon.vue'

const router = useRouter()

const selectedJob = ref('技术开发')

const jobs = [
  { id: '技术开发', name: '技术开发', count: '326 题', icon: CodeIcon, selected: true },
  { id: '产品经理', name: '产品经理', count: '189 题', icon: PenIcon, selected: false },
  { id: '运营', name: '运营', count: '145 题', icon: InfoIcon, selected: false },
  { id: '市场营销', name: '市场营销', count: '112 题', icon: SettingsIcon, selected: false },
  { id: '设计', name: '设计', count: '98 题', icon: MonitorIcon, selected: false },
  { id: '数据分析', name: '数据分析', count: '134 题', icon: BarChartIcon, selected: false },
]

function selectJob(id: string) {
  selectedJob.value = id
}

function goBack() {
  router.push('/home')
}

function confirm() {
  router.push('/job-detail?from=jobs')
}
</script>

<template>
  <ScreenView>
    <div class="pad stack" style="padding-top: 12px; gap: 20px; min-height: 100%;">
    <BackButton @click="goBack" />

    <h1 class="h2">选择面试岗位</h1>
    <p class="desc">选择你要练习的岗位方向，我们将匹配对应题库。</p>

    <div class="job-grid" data-od-id="job-grid">
      <JobCard
        v-for="job in jobs"
        :key="job.id"
        :name="job.name"
        :count="job.count"
        :selected="selectedJob === job.id"
        @select="selectJob(job.id)"
      >
        <template #icon>
          <component :is="job.icon" />
        </template>
      </JobCard>
    </div>

    <div style="margin-top: auto; padding-top: 20px;">
      <AppButton @click="confirm">
        确认选择 · {{ selectedJob }}
      </AppButton>
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

.h2 {
  font-family: var(--font-display);
  font-size: var(--fs-h2);
  letter-spacing: -0.015em;
  line-height: 1.2;
  margin: 0;
}

.desc {
  margin: -8px 0 0;
  color: var(--muted);
  font-size: 14px;
}

.job-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
</style>
