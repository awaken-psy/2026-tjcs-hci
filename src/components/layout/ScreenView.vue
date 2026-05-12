<template>
  <div class="screen-view">
    <slot />
  </div>
</template>

<style scoped>
.screen-view {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  display: flex;
  flex-direction: column;
}

.screen-view::-webkit-scrollbar {
  display: none;
}
</style>
