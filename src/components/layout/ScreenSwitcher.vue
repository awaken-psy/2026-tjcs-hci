<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import type { ScreenInfo } from '@/types'

const props = defineProps<{
  screens: ScreenInfo[]
}>()

const route = useRoute()
const router = useRouter()

function navigate(path: string) {
  router.push(path)
}
</script>

<template>
  <div class="screen-switcher">
    <button
      v-for="s in props.screens"
      :key="s.path"
      :class="['switcher-btn', { active: route.path === s.path }]"
      @click="navigate(s.path)"
    >
      {{ s.id }}
    </button>
  </div>
</template>

<style scoped>
.screen-switcher {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  justify-content: center;
  max-width: 420px;
}

.switcher-btn {
  padding: 5px 10px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--muted);
  border-radius: 6px;
  font-size: 11px;
  font-family: var(--font-mono);
  cursor: pointer;
  transition: all 0.15s;
}

.switcher-btn:hover {
  border-color: var(--accent);
  color: var(--fg);
}

.switcher-btn.active {
  background: var(--accent);
  color: #fff;
  border-color: var(--accent);
}
</style>
