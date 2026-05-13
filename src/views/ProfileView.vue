<script setup lang="ts">
import { useRouter } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'
import AppCard from '@/components/ui/AppCard.vue'
import Avatar from '@/components/ui/Avatar.vue'
import MenuItem from '@/components/ui/MenuItem.vue'
import UserIcon from '@/components/icons/UserIcon.vue'
import FileIcon from '@/components/icons/FileIcon.vue'
import BarChartIcon from '@/components/icons/BarChartIcon.vue'
import SettingsIcon from '@/components/icons/SettingsIcon.vue'
import InfoIcon from '@/components/icons/InfoIcon.vue'

const router = useRouter()

const stats = [
  { label: '总面试次数', value: '23', accent: true },
  { label: '平均得分', value: '79', accent: false },
  { label: '累计时长', value: '12h', accent: false },
]

const menuItems = [
  { label: '我的简历', icon: FileIcon, path: '/resume' },
  { label: '能力成长曲线', icon: BarChartIcon, path: '/growth' },
  { label: '设置', icon: SettingsIcon, path: '/settings' },
  { label: '关于我们', icon: InfoIcon, path: '/about' },
]
</script>

<template>
  <AppLayout>
    <div class="pad" style="padding-top: 24px;" data-od-id="profile-head">
      <div class="row" style="gap: 16px;">
        <Avatar :size="64">
          <UserIcon />
        </Avatar>
        <div>
          <h1 class="h2">张明</h1>
          <p class="meta">XX大学 · 计算机科学 · 大四</p>
        </div>
      </div>
    </div>

    <section class="pad" data-od-id="profile-stats" style="margin-top: 20px;">
      <div class="grid-3">
        <AppCard
          v-for="s in stats"
          :key="s.label"
          padding="14px 8px"
          style="text-align: center;"
        >
          <div class="num" :class="{ accent: s.accent }">{{ s.value }}</div>
          <div class="meta">{{ s.label }}</div>
        </AppCard>
      </div>
    </section>

    <section class="pad" data-od-id="profile-menu" style="margin-top: 8px;">
      <div class="menu-list">
        <MenuItem
          v-for="item in menuItems"
          :key="item.label"
          :label="item.label"
          @click="router.push(item.path)"
        >
          <template #icon>
            <component :is="item.icon" />
          </template>
        </MenuItem>
      </div>
    </section>
  </AppLayout>
</template>

<style scoped>
.pad {
  padding-inline: 20px;
}

.row {
  display: flex;
  align-items: center;
}

.h2 {
  font-family: var(--font-display);
  font-size: var(--fs-h2);
  letter-spacing: -0.015em;
  line-height: 1.2;
  margin: 0;
}

.meta {
  font-family: var(--font-mono);
  font-size: var(--fs-meta);
  color: var(--muted);
  margin: 4px 0 0;
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

.menu-list {
  display: flex;
  flex-direction: column;
}
</style>
