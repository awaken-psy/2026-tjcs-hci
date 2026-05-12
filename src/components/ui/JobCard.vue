<script setup lang="ts">
const props = defineProps<{
  name: string
  count: string
  selected?: boolean
}>()

const emit = defineEmits<{
  select: []
}>()
</script>

<template>
  <div
    :class="['job-card', { selected: props.selected }]"
    @click="emit('select')"
  >
    <div class="job-icon">
      <slot name="icon" />
    </div>
    <span class="job-name">{{ name }}</span>
    <span class="job-count">{{ count }}</span>
  </div>
</template>

<style scoped>
.job-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 20px 12px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  cursor: pointer;
  transition: border-color 0.15s;
}

.job-card:hover {
  border-color: var(--accent);
}

.job-card.selected {
  border-color: var(--accent);
  background: var(--accent-soft);
}

.job-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--accent-soft);
  color: var(--accent);
  display: grid;
  place-items: center;
}

.job-icon :deep(svg) {
  width: 20px;
  height: 20px;
  stroke: currentColor;
  fill: none;
  stroke-width: 1.8;
}

.job-name {
  font-size: 13px;
  font-weight: 500;
}

.job-count {
  font-size: 11px;
  color: var(--muted);
  font-family: var(--font-mono);
}
</style>
