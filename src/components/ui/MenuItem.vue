<script setup lang="ts">
defineProps<{
  label: string
}>()

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <div class="menu-item" @click="emit('click')">
    <div class="left">
      <slot name="icon" />
      <span class="label">{{ label }}</span>
    </div>
    <ArrowRightIcon class="arrow" />
  </div>
</template>

<script lang="ts">
import ArrowRightIcon from '@/components/icons/ArrowRightIcon.vue'
export default {
  components: { ArrowRightIcon }
}
</script>

<style scoped>
.menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;
  border-top: 1px solid var(--border);
  cursor: pointer;
}

.menu-item:first-child {
  border-top: 0;
}

.left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.left :deep(svg) {
  width: 20px;
  height: 20px;
  stroke: var(--muted);
  fill: none;
  stroke-width: 1.8;
}

.label {
  font-size: 15px;
}

.arrow {
  width: 16px;
  height: 16px;
  stroke: var(--border);
  fill: none;
  stroke-width: 2;
}
</style>
