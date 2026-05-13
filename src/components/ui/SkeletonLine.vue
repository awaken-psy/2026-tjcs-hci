<script setup lang="ts">
withDefaults(
  defineProps<{
    width?: string
    height?: string
  }>(),
  { width: '100%', height: '14px' }
)
</script>

<template>
  <div
    class="skeleton-line"
    aria-hidden="true"
    :style="{ width, height }"
    data-od-id="skeleton-line"
  />
</template>

<style scoped>
.skeleton-line {
  border-radius: 7px;
  background: var(--fg-soft);
  animation: shimmer 1.6s ease-in-out infinite;
}

@keyframes shimmer {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}
</style>
