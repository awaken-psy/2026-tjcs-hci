<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  bookmarked?: boolean
}>()

const emit = defineEmits<{
  toggle: [bookmarked: boolean]
}>()

const isBookmarked = ref(props.bookmarked || false)

function toggle() {
  isBookmarked.value = !isBookmarked.value
  emit('toggle', isBookmarked.value)
}
</script>

<template>
  <button
    class="bookmark-btn"
    :class="{ active: isBookmarked }"
    @click.stop="toggle"
    aria-label="收藏"
  >
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
    </svg>
  </button>
</template>

<style scoped>
.bookmark-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 0;
  background: transparent;
  color: var(--muted);
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: all 0.15s;
}

.bookmark-btn svg {
  width: 18px;
  height: 18px;
}

.bookmark-btn.active {
  color: oklch(60% 0.18 45);
}

.bookmark-btn.active svg {
  fill: currentColor;
}
</style>
