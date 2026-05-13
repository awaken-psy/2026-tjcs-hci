<script setup lang="ts">
withDefaults(
  defineProps<{
    lines?: number
  }>(),
  { lines: 3 }
)
</script>

<template>
  <div class="skeleton-card" aria-hidden="true" data-od-id="skeleton-card">
    <div class="sk-block sk-block-head" />
    <div v-for="i in lines" :key="i" class="sk-block sk-block-line" :style="{ width: `${85 - (i - 1) * 15}%` }" />
  </div>
</template>

<style scoped>
.skeleton-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sk-block {
  height: 14px;
  border-radius: 7px;
  background: var(--fg-soft);
  animation: shimmer 1.6s ease-in-out infinite;
}

.sk-block-head {
  width: 40%;
  height: 18px;
}

@keyframes shimmer {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}
</style>
