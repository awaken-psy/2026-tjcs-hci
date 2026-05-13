<script setup lang="ts">
import { ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    message: string
    type?: 'success' | 'error' | 'info'
    visible: boolean
    duration?: number
  }>(),
  { type: 'info', duration: 2500 }
)

const emit = defineEmits<{
  close: []
}>()

const show = ref(false)

watch(
  () => props.visible,
  (val) => {
    if (val) {
      show.value = true
      setTimeout(() => {
        show.value = false
        emit('close')
      }, props.duration)
    }
  },
  { immediate: true }
)
</script>

<template>
  <Transition name="toast">
    <div v-if="show" :class="['toast', `toast-${type}`]" role="status" aria-live="polite">
      <svg v-if="type === 'success'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M22 11.1V12a10 10 0 11-5.9-9.1" />
        <polyline points="22 4 12 14 9 11" />
      </svg>
      <svg v-else-if="type === 'error'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
      <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
      <span>{{ message }}</span>
    </div>
  </Transition>
</template>

<style scoped>
.toast {
  position: fixed;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  z-index: 9999;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  pointer-events: none;
  max-width: calc(100vw - 48px);
}

.toast svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.toast-success {
  background: oklch(55% 0.16 145);
  color: #fff;
}

.toast-error {
  background: oklch(45% 0.18 22);
  color: #fff;
}

.toast-info {
  background: var(--fg);
  color: var(--bg);
}

.toast-enter-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-leave-active {
  transition: all 0.2s ease-in;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(-12px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-6px);
}
</style>
