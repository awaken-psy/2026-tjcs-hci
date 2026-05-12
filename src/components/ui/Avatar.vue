<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: number
    color?: string
  }>(),
  { size: 40, color: 'var(--accent)' }
)
</script>

<template>
  <div
    class="avatar"
    :style="{
      width: `${size}px`,
      height: `${size}px`,
      color: color,
    }"
  >
    <slot />
  </div>
</template>

<style scoped>
.avatar {
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-soft), var(--fg-soft)), var(--surface);
  border: 1px solid var(--border);
  display: grid;
  place-items: center;
  font-family: var(--font-mono);
  font-size: 12px;
  flex-shrink: 0;
}

.avatar :deep(svg) {
  width: 20px;
  height: 20px;
  stroke: currentColor;
  fill: none;
  stroke-width: 1.5;
}
</style>
