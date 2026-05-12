<template>
  <span class="tag">
    <slot />
  </span>
</template>

<style scoped>
.tag {
  display: inline-flex;
  padding: 3px 9px;
  background: transparent;
  color: var(--muted);
  border: 1px solid var(--border);
  border-radius: 999px;
  font-size: 11px;
}
</style>
