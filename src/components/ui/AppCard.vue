<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'default' | 'accent' | 'flat'
    padding?: string
  }>(),
  { variant: 'default', padding: '16px' }
)
</script>

<template>
  <div
    :class="['card', `card-${variant}`]"
    :style="{ padding }"
  >
    <slot />
  </div>
</template>

<style scoped>
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
}

.card-accent {
  background: var(--accent);
  color: #fff;
  border-color: transparent;
}

.card-flat {
  background: transparent;
  border: 0;
  border-top: 1px solid var(--border);
  border-radius: 0;
}

.card-flat:first-child {
  border-top: 0;
}
</style>
