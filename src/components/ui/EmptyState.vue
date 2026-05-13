<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    description?: string
  }>(),
  { description: '' }
)
</script>

<template>
  <div class="empty-state" data-od-id="empty-state">
    <div class="empty-icon">
      <slot name="icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.6a2 2 0 00-1.8 1.1l-.5 1a2 2 0 01-1.8 1.1H9.7a2 2 0 01-1.8-1.1l-.5-1a2 2 0 00-1.8-1.1H4" />
        </svg>
      </slot>
    </div>
    <p class="empty-title">{{ title }}</p>
    <p v-if="description" class="empty-desc">{{ description }}</p>
    <slot name="action" />
  </div>
</template>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 24px;
  text-align: center;
}

.empty-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--fg-soft);
  color: var(--border);
  display: grid;
  place-items: center;
  margin-bottom: 16px;
}

.empty-icon :deep(svg) {
  width: 24px;
  height: 24px;
}

.empty-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 6px;
  color: var(--fg);
}

.empty-desc {
  font-size: 13px;
  color: var(--muted);
  margin: 0;
  line-height: 1.5;
  max-width: 240px;
}
</style>
