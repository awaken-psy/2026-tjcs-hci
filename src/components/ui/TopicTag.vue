<script setup lang="ts">
const props = defineProps<{
  label: string
}>()

const iconMap: Record<string, string> = {
  '算法': '◈',
  '系统设计': '◇',
  '行为面': '◎',
  '项目经验': '◉',
  '前端基础': '◆',
  '数据结构': '▣',
  '网络': '◐',
  '数据库': '◑',
}

const icon = iconMap[props.label] || '•'
</script>

<template>
  <span class="topic-tag">
    <span class="icon">{{ icon }}</span>
    {{ label }}
  </span>
</template>

<style scoped>
.topic-tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 5px 10px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 999px;
  font-size: 12px;
  color: var(--fg);
  font-weight: 500;
}

.icon {
  color: var(--accent);
  font-size: 10px;
}
</style>
