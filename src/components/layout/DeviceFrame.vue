<script setup lang="ts">
import { ref, onMounted } from 'vue'

const screenRef = ref<HTMLElement | null>(null)

onMounted(() => {
  if (screenRef.value && localStorage.getItem('theme') === 'dark') {
    screenRef.value.setAttribute('data-theme', 'dark')
  }
})
</script>

<template>
  <div class="device">
    <span class="btn-rail left-1" aria-hidden="true" />
    <span class="btn-rail left-2" aria-hidden="true" />
    <span class="btn-rail left-3" aria-hidden="true" />
    <span class="btn-rail right-1" aria-hidden="true" />
    <span class="island" aria-hidden="true" />

    <div ref="screenRef" class="screen">
      <slot />
      <div class="home-indicator" aria-hidden="true" />
    </div>
  </div>
</template>

<style scoped>
.device {
  position: relative;
  width: 390px;
  height: 844px;
  border-radius: 56px;
  padding: 12px;
  background: linear-gradient(160deg, #2a2a2c 0%, #1a1a1c 50%, #0e0e10 100%);
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.04) inset,
    0 0 0 2px #000 inset,
    0 28px 60px -12px rgba(0,0,0,0.45),
    0 8px 20px -8px rgba(0,0,0,0.35);
  isolation: isolate;
  flex-shrink: 0;
}

.device::before,
.device::after {
  content: '';
  position: absolute;
  width: 3px;
  background: linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.06) 8%, transparent 16%, transparent 84%, rgba(255,255,255,0.04) 92%, transparent 100%);
  top: 100px;
  bottom: 100px;
  pointer-events: none;
}

.device::before { left: -1px; }
.device::after  { right: -1px; }

.island {
  position: absolute;
  top: 22px;
  left: 50%;
  transform: translateX(-50%);
  width: 124px;
  height: 36px;
  background: #000;
  border-radius: 999px;
  z-index: 5;
}

.btn-rail {
  position: absolute;
  width: 4px;
  background: #0a0a0c;
  border-radius: 2px;
}

.btn-rail.left-1  { left: -3px; top: 174px; height: 32px; }
.btn-rail.left-2  { left: -3px; top: 220px; height: 60px; }
.btn-rail.left-3  { left: -3px; top: 290px; height: 60px; }
.btn-rail.right-1 { right: -3px; top: 250px; height: 100px; }

.screen {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--bg);
  border-radius: 44px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.home-indicator {
  flex: 0 0 28px;
  position: relative;
}

.home-indicator::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 8px;
  transform: translateX(-50%);
  width: 134px;
  height: 5px;
  background: var(--fg);
  border-radius: 999px;
  opacity: 0.85;
}
</style>
