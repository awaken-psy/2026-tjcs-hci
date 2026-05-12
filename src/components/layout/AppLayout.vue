<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import StatusBar from '@/components/ui/StatusBar.vue'
import TabBar from '@/components/ui/TabBar.vue'

const route = useRoute()

const showTabBar = computed(() => {
  const tabbarRoutes = ['/home', '/history', '/profile']
  return tabbarRoutes.includes(route.path)
})
</script>

<template>
  <div class="screen-view">
    <StatusBar />
    <main class="content">
      <slot />
    </main>
    <TabBar v-if="showTabBar" />
  </div>
</template>

<style scoped>
.screen-view {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  flex: 1;
}

.content {
  flex: 1 1 auto;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  position: relative;
}

.content::-webkit-scrollbar {
  display: none;
}
</style>
