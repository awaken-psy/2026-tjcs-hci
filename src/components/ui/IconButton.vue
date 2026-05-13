<script setup lang="ts">
const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <button class="icon-btn" @click="emit('click')">
    <slot />
  </button>
</template>

<style scoped>
.icon-btn {
  width: 36px;
  height: 36px;
  border-radius: 999px;
  background: var(--surface);
  border: 1px solid var(--border);
  display: grid;
  place-items: center;
  color: var(--muted);
  cursor: pointer;
}

.icon-btn :deep(svg) {
  width: 16px;
  height: 16px;
}
</style>
