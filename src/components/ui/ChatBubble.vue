<script setup lang="ts">
defineProps<{
  role: 'ai' | 'user'
}>()
</script>

<template>
  <div :class="['chat-bubble', role]">
    <p><slot /></p>
  </div>
</template>

<style scoped>
.chat-bubble {
  max-width: 85%;
  padding: 12px 16px;
  border-radius: 18px;
  font-size: 14px;
  line-height: 1.5;
}

.chat-bubble p {
  margin: 0;
}

.ai {
  background: var(--surface);
  border: 1px solid var(--border);
  border-bottom-left-radius: 4px;
  align-self: flex-start;
}

.user {
  background: var(--accent);
  color: #fff;
  border-bottom-right-radius: 4px;
  align-self: flex-end;
}
</style>
