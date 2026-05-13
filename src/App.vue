<script setup lang="ts">
import { useRoute } from 'vue-router'
import DeviceFrame from './components/layout/DeviceFrame.vue'
import ScreenSwitcher from './components/layout/ScreenSwitcher.vue'

const route = useRoute()
const screens = [
  { id: 'Splash', path: '/' },
  { id: 'Onboarding 1', path: '/onboarding-1' },
  { id: 'Onboarding 2', path: '/onboarding-2' },
  { id: 'Login', path: '/login' },
  { id: 'SMS Code', path: '/sms-code' },
  { id: 'Home', path: '/home' },
  { id: 'Notifications', path: '/notifications' },
  { id: 'Jobs', path: '/jobs' },
  { id: 'Setup', path: '/setup' },
  { id: 'Interview', path: '/interview' },
  { id: 'Feedback', path: '/feedback' },
  { id: 'History', path: '/history' },
  { id: 'Profile', path: '/profile' },
  { id: 'Resume', path: '/resume' },
  { id: 'Growth', path: '/growth' },
  { id: 'Settings', path: '/settings' },
  { id: 'About', path: '/about' },
]
</script>

<template>
  <div class="stage">
    <div class="caption">
      <strong>智能面试官</strong>
      <span class="dot-sep">·</span>
      <span>交互原型</span>
      <span class="dot-sep">·</span>
      <span>{{ route.name }}</span>
    </div>

    <ScreenSwitcher :screens="screens" />

    <DeviceFrame>
      <router-view />
    </DeviceFrame>
  </div>
</template>

<style scoped>
.stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  min-height: 100vh;
  padding: 24px;
}

.caption {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
}

.caption strong {
  color: var(--fg);
  font-weight: 500;
}

.dot-sep {
  margin: 0 6px;
  opacity: 0.5;
}
</style>
