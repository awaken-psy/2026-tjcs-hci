<script setup lang="ts">
const props = defineProps<{
  level: '初级' | '中级' | '高级'
}>()

const levelMap: Record<string, { color: string; bg: string }> = {
  '初级': { color: 'oklch(55% 0.14 145)', bg: 'color-mix(in oklch, oklch(55% 0.14 145) 12%, transparent)' },
  '中级': { color: 'oklch(65% 0.14 75)', bg: 'color-mix(in oklch, oklch(65% 0.14 75) 12%, transparent)' },
  '高级': { color: 'oklch(55% 0.16 25)', bg: 'color-mix(in oklch, oklch(55% 0.16 25) 12%, transparent)' },
}

const style = levelMap[props.level] || levelMap['初级']
</script>

<template>
  <span class="badge" :style="{ color: style.color, background: style.bg }">
    {{ level }}
  </span>
</template>

<style scoped>
.badge {
  display: inline-flex;
  padding: 3px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 600;
  font-family: var(--font-mono);
}
</style>
