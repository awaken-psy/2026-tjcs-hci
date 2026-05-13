<script setup lang="ts">
const props = defineProps<{
  score: number
  size?: number
}>()

const color = props.score >= 80
  ? 'oklch(55% 0.14 145)'
  : props.score >= 60
    ? 'oklch(65% 0.14 75)'
    : 'oklch(55% 0.16 25)'
</script>

<template>
  <div class="meter" :style="{ width: `${size || 40}px`, height: `${size || 40}px` }">
    <svg viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="16" fill="none" stroke="var(--border)" stroke-width="4" />
      <circle
        cx="20" cy="20" r="16" fill="none"
        :stroke="color"
        stroke-width="4"
        stroke-linecap="round"
        :stroke-dasharray="`${(score / 100) * 100.5} 100.5`"
        style="transform: rotate(-90deg); transform-origin: center;"
      />
    </svg>
    <span class="value">{{ score }}</span>
  </div>
</template>

<style scoped>
.meter {
  position: relative;
  flex-shrink: 0;
}

.value {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 700;
  color: var(--fg);
}
</style>
