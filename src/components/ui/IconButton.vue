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
  color: var(--fg);
  cursor: pointer;
}

.icon-btn svg {
  width: 18px;
  height: 18px;
  stroke: currentColor;
  fill: none;
  stroke-width: 1.7;
}
</style>
