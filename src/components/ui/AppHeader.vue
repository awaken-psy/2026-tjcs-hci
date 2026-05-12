<script setup lang="ts">
defineProps<{
  greeting?: string
  title: string
}>()
</script>

<template>
  <div class="header">
    <div>
      <p v-if="greeting" class="greeting">{{ greeting }}</p>
      <h1 class="title">{{ title }}</h1>
    </div>
    <slot name="action" />
  </div>
</template>

<style scoped>
.header {
  padding: 8px 20px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.greeting {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
  margin: 0 0 4px;
}

.title {
  font-family: var(--font-display);
  font-size: var(--fs-h1);
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin: 0;
}
</style>
