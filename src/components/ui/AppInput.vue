<script setup lang="ts">
const model = defineModel<string>()

defineProps<{
  type?: string
  placeholder?: string
}>()
</script>

<template>
  <input
    :type="type || 'text'"
    :placeholder="placeholder"
    v-model="model"
    class="input-field"
  />
</template>

<style scoped>
.input-field {
  width: 100%;
  min-height: 48px;
  padding: 12px 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  font: inherit;
  font-size: 15px;
  color: var(--fg);
  outline: none;
}

.input-field:focus {
  border-color: var(--accent);
}

.input-field::placeholder {
  color: var(--muted);
}
</style>
