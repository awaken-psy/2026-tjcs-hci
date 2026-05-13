<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  active?: boolean
  barCount?: number
}>()

const bars = ref(Array.from({ length: props.barCount || 20 }, () => 0.3))

let intervalId: ReturnType<typeof setInterval> | null = null

function randomize() {
  bars.value = bars.value.map(() => 0.15 + Math.random() * 0.85)
}

onMounted(() => {
  if (props.active) {
    intervalId = setInterval(randomize, 120)
  }
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<template>
  <div class="waveform">
    <span
      v-for="(h, i) in bars"
      :key="i"
      class="bar"
      :style="{ height: `${h * 100}%`, opacity: 0.4 + h * 0.6 }"
    />
  </div>
</template>

<style scoped>
.waveform {
  display: flex;
  align-items: center;
  gap: 3px;
  height: 32px;
}

.bar {
  width: 3px;
  background: var(--accent);
  border-radius: 999px;
  transition: height 0.1s ease;
  flex-shrink: 0;
}
</style>
