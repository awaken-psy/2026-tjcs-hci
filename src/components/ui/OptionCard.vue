<script setup lang="ts">
const props = defineProps<{
  selected: boolean
}>()

const emit = defineEmits<{
  select: []
}>()
</script>

<template>
  <div
    :class="['option-card', { selected: props.selected }]"
    @click="emit('select')"
  >
    <span class="radio">
      <span v-if="props.selected" class="radio-dot" />
    </span>
    <div class="body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.option-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  cursor: pointer;
  transition: border-color 0.15s;
}

.option-card.selected {
  border-color: var(--accent);
  background: var(--accent-soft);
}

.radio {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid var(--border);
  display: grid;
  place-items: center;
  flex-shrink: 0;
}

.option-card.selected .radio {
  border-color: var(--accent);
}

.radio-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--accent);
}

.body {
  flex: 1;
}
</style>
