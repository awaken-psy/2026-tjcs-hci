<script setup lang="ts">
withDefaults(
  defineProps<{
    message?: string
  }>(),
  { message: '网络连接异常，请检查网络后重试' }
)

const emit = defineEmits<{
  retry: []
}>()
</script>

<template>
  <div class="network-error" data-od-id="network-error" role="alert">
    <div class="ne-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M1 1l22 22" />
        <path d="M16.7 16.7A8.7 8.7 0 001 5.3" />
        <path d="M8.6 3.5A13.2 13.2 0 0123 15.8" />
        <path d="M5.7 9.1a6.6 6.6 0 018.6 8.6" />
        <path d="M20.1 15.8A3.4 3.4 0 0012 11.2" />
      </svg>
    </div>
    <p class="ne-title">网络异常</p>
    <p class="ne-desc">{{ message }}</p>
    <button class="ne-btn" @click="emit('retry')">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="23 4 23 10 17 10" />
        <path d="M20.5 15a9 9 0 11-2.1-9.4L23 10" />
      </svg>
      重新加载
    </button>
  </div>
</template>

<style scoped>
.network-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 24px;
  text-align: center;
}

.ne-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--fg-soft);
  color: var(--muted);
  display: grid;
  place-items: center;
  margin-bottom: 20px;
}

.ne-icon svg {
  width: 28px;
  height: 28px;
}

.ne-title {
  font-size: 17px;
  font-weight: 600;
  margin: 0 0 6px;
}

.ne-desc {
  font-size: 13px;
  color: var(--muted);
  margin: 0;
  max-width: 240px;
  line-height: 1.5;
}

.ne-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 20px;
  padding: 10px 20px;
  border-radius: 12px;
  border: 1px solid var(--accent);
  background: transparent;
  color: var(--accent);
  font-size: 14px;
  font-family: inherit;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
}

.ne-btn svg {
  width: 16px;
  height: 16px;
}

.ne-btn:active {
  background: var(--accent-soft);
}
</style>
