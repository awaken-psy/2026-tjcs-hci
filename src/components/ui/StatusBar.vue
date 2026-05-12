<script setup lang="ts">
import SignalIcon from '@/components/icons/SignalIcon.vue'
import WifiIcon from '@/components/icons/WifiIcon.vue'
import BatteryIcon from '@/components/icons/BatteryIcon.vue'
</script>

<template>
  <div class="statusbar">
    <span class="num">9:41</span>
    <span class="right">
      <SignalIcon />
      <WifiIcon />
      <BatteryIcon class="battery" />
    </span>
  </div>
</template>

<style scoped>
.statusbar {
  flex: 0 0 47px;
  padding: 18px 26px 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  font-family: var(--font-body);
  font-size: 15px;
  font-weight: 600;
  color: var(--fg);
  letter-spacing: -0.01em;
}

.right {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.battery {
  width: 25px;
}
</style>
