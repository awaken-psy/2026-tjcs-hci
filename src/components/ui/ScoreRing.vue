<script setup lang="ts">
const props = defineProps<{
  score: number
  size?: number
}>()

const circumference = 2 * Math.PI * 52
const offset = circumference - (props.score / 100) * circumference
</script>

<template>
  <div class="score-ring" :style="{ width: `${size || 120}px`, height: `${size || 120}px` }">
    <svg viewBox="0 0 120 120">
      <circle cx="60" cy="60" r="52" fill="none" stroke="var(--border)" stroke-width="8" />
      <circle
        cx="60"
        cy="60"
        r="52"
        fill="none"
        stroke="var(--accent)"
        stroke-width="8"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="offset"
        stroke-linecap="round"
        style="transform: rotate(-90deg); transform-origin: center;"
      />
    </svg>
    <div class="score-value">{{ score }}</div>
  </div>
</template>

<style scoped>
.score-ring {
  position: relative;
  margin: 0 auto;
}

.score-value {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-family: var(--font-mono);
  font-size: 36px;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--fg);
}
</style>
