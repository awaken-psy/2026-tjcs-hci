<script setup lang="ts">
defineProps<{
  total: number
  current: number
  answered?: number[]
  showStatus?: boolean
}>()

const emit = defineEmits<{
  navigate: [index: number]
}>()
</script>

<template>
  <div class="navigator">
    <div class="dots">
      <button
        v-for="i in total"
        :key="i"
        class="dot"
        :class="{
          current: i === current,
          answered: showStatus && answered?.includes(i),
        }"
        @click="emit('navigate', i)"
      />
    </div>
    <span class="label">第 {{ current }} / {{ total }} 题</span>
  </div>
</template>

<style scoped>
.navigator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.dots {
  display: flex;
  gap: 6px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 0;
  padding: 0;
  background: var(--border);
  cursor: pointer;
  transition: all 0.15s;
}

.dot.current {
  background: var(--accent);
  width: 20px;
  border-radius: 999px;
}

.dot.answered {
  background: oklch(55% 0.14 145);
}

.dot.answered.current {
  background: var(--accent);
}

.label {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--muted);
}
</style>
