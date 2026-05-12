<script setup lang="ts">
defineProps<{
  value: number
}>()
</script>

<template>
  <div class="progress-bar">
    <span :style="{ width: `${value}%` }" />
  </div>
</template>

<style scoped>
.progress-bar {
  height: 6px;
  background: var(--border);
  border-radius: 999px;
  overflow: hidden;
}

.progress-bar > span {
  display: block;
  height: 100%;
  background: var(--accent);
}
</style>
