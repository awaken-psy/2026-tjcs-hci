<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  seconds: number
  paused?: boolean
}>()

const display = computed(() => {
  const m = Math.floor(props.seconds / 60)
  const s = props.seconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
})
</script>

<template>
  <span class="timer" :class="{ paused }">
    {{ display }}
  </span>
</template>

<style scoped>
.timer {
  font-family: var(--font-mono);
  font-size: 14px;
  font-weight: 600;
  color: var(--accent);
  font-variant-numeric: tabular-nums;
}

.timer.paused {
  color: var(--muted);
}
</style>
