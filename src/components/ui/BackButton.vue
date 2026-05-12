<script setup lang="ts">
import ArrowLeftIcon from '@/components/icons/ArrowLeftIcon.vue'

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <button class="back-btn" @click="emit('click')">
    <ArrowLeftIcon />
    <span><slot>返回</slot></span>
  </button>
</template>

<style scoped>
.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 8px 0;
  background: transparent;
  border: 0;
  color: var(--muted);
  font: inherit;
  font-size: 14px;
  cursor: pointer;
}

.back-btn svg {
  width: 16px;
  height: 16px;
  stroke: currentColor;
  fill: none;
  stroke-width: 2;
}
</style>
