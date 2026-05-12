<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import HomeIcon from '@/components/icons/HomeIcon.vue'
import ClockIcon from '@/components/icons/ClockIcon.vue'
import UserIcon from '@/components/icons/UserIcon.vue'

const route = useRoute()
const router = useRouter()

const tabs = [
  { id: 'home', label: '首页', path: '/home', icon: HomeIcon },
  { id: 'history', label: '记录', path: '/history', icon: ClockIcon },
  { id: 'profile', label: '我的', path: '/profile', icon: UserIcon },
]

function goTo(path: string) {
  router.push(path)
}
</script>

<template>
  <nav class="tabbar">
    <a
      v-for="tab in tabs"
      :key="tab.id"
      :class="['tab', { active: route.path === tab.path }]"
      @click="goTo(tab.path)"
    >
      <component :is="tab.icon" />
      {{ tab.label }}
    </a>
  </nav>
</template>

<style scoped>
.tabbar {
  flex: 0 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 8px 8px 0;
  border-top: 1px solid var(--border);
  background: color-mix(in oklch, var(--surface) 92%, transparent);
  backdrop-filter: blur(20px);
}

.tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 8px 0;
  color: var(--muted);
  font-size: 10px;
  letter-spacing: 0.02em;
  cursor: pointer;
}

.tab.active {
  color: var(--accent);
}

.tab :deep(svg) {
  width: 22px;
  height: 22px;
  stroke: currentColor;
  fill: none;
  stroke-width: 1.7;
}

.tab.active :deep(svg) {
  stroke-width: 2;
}
</style>
