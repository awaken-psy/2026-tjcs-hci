<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'ghost'
    to?: string
  }>(),
  { variant: 'primary' }
)

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <button
    :class="['btn', `btn-${variant}`]"
    @click="emit('click')"
  >
    <slot />
  </button>
</template>

<style scoped>
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 48px;
  padding: 14px 20px;
  border: 0;
  border-radius: 14px;
  font: inherit;
  font-size: 15px;
  cursor: pointer;
  transition: opacity 0.15s;
}

.btn:active {
  opacity: 0.9;
}

.btn-primary {
  background: var(--accent);
  color: #fff;
  font-weight: 600;
  letter-spacing: -0.005em;
}

.btn-secondary {
  background: transparent;
  color: var(--fg);
  border: 1px solid var(--border);
  font-weight: 500;
}

.btn-ghost {
  display: inline-flex;
  min-height: 36px;
  padding: 8px 16px;
  background: transparent;
  color: var(--muted);
  font-size: 13px;
  width: auto;
}
</style>
