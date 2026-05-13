<script setup lang="ts">
const props = defineProps<{
  name: string
  size?: number
}>()

const initial = props.name.charAt(0)
</script>

<template>
  <div
    class="logo"
    :style="{
      width: `${size || 44}px`,
      height: `${size || 44}px`,
      fontSize: `${(size || 44) * 0.4}px`,
    }"
  >
    {{ initial }}
  </div>
</template>

<style scoped>
.logo {
  border-radius: 12px;
  background: var(--accent-soft);
  color: var(--accent);
  display: grid;
  place-items: center;
  font-weight: 700;
  flex-shrink: 0;
}
</style>
