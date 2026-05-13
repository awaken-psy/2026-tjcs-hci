<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ScreenView from '@/components/layout/ScreenView.vue'
import BackButton from '@/components/ui/BackButton.vue'
import AppButton from '@/components/ui/AppButton.vue'
import OptionCard from '@/components/ui/OptionCard.vue'

const router = useRouter()

const difficulty = ref('初级')
const duration = ref('15 分钟')

const difficulties = [
  { value: '初级', desc: '适合实习生、校招岗位' },
  { value: '中级', desc: '适合 1-3 年经验社招' },
  { value: '高级', desc: '适合资深 / 专家岗位' },
]

const durations = [
  { value: '15 分钟', desc: '快速体验模式，约 5 题' },
  { value: '30 分钟', desc: '标准模式，约 10 题' },
]

function goBack() {
  router.push('/jobs')
}

function startInterview() {
  router.push('/pre-interview')
}
</script>

<template>
  <ScreenView>
    <div class="pad stack" style="padding-top: 12px; gap: 20px; min-height: 100%;">
    <BackButton @click="goBack" />

    <h1 class="h2">面试设置</h1>

    <div class="stack" style="gap: 20px;">
      <section>
        <h3 class="h3" style="margin-bottom: 10px;">难度等级</h3>
        <div class="option-group">
          <OptionCard
            v-for="d in difficulties"
            :key="d.value"
            :selected="difficulty === d.value"
            @select="difficulty = d.value"
          >
            <div style="font-weight: 500; font-size: 15px;">{{ d.value }}</div>
            <div class="meta" style="margin-top: 2px;">{{ d.desc }}</div>
          </OptionCard>
        </div>
      </section>

      <section>
        <h3 class="h3" style="margin-bottom: 10px;">面试时长</h3>
        <div class="option-group">
          <OptionCard
            v-for="d in durations"
            :key="d.value"
            :selected="duration === d.value"
            @select="duration = d.value"
          >
            <div style="font-weight: 500; font-size: 15px;">{{ d.value }}</div>
            <div class="meta" style="margin-top: 2px;">{{ d.desc }}</div>
          </OptionCard>
        </div>
      </section>
    </div>

    <div style="margin-top: auto; padding-top: 20px;">
      <AppButton @click="startInterview">开始面试</AppButton>
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

.h3 {
  font-size: var(--fs-h3);
  font-weight: 600;
  line-height: 1.3;
  margin: 0;
}

.option-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.meta {
  font-family: var(--font-mono);
  font-size: var(--fs-meta);
  color: var(--muted);
}
</style>
