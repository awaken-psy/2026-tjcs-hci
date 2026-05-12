<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
  score?: number
}>()

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <div class="list-row" @click="emit('click')">
    <div class="avatar">
      <slot name="icon" />
    </div>
    <div class="body">
      <div class="title">{{ title }}</div>
      <div class="sub">{{ subtitle }}</div>
    </div>
    <span v-if="score !== undefined" class="num score">{{ score }}</span>
  </div>
</template>

<style scoped>
.list-row {
  display: grid;
  grid-template-columns: 40px 1fr auto;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-top: 1px solid var(--border);
  cursor: pointer;
}

.list-row:first-child {
  border-top: 0;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-soft), var(--fg-soft)), var(--surface);
  border: 1px solid var(--border);
  display: grid;
  place-items: center;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--accent);
}

.avatar :deep(svg) {
  width: 18px;
  height: 18px;
  stroke: currentColor;
  fill: none;
  stroke-width: 1.5;
}

.body .title {
  font-size: 15px;
  font-weight: 500;
  line-height: 1.25;
}

.body .sub {
  color: var(--muted);
  font-size: 13px;
  line-height: 1.3;
  margin-top: 2px;
}

.num {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
}

.score {
  color: var(--accent);
  font-weight: 600;
}
</style>
