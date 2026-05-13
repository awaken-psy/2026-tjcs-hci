<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ScreenView from '@/components/layout/ScreenView.vue'
import AppButton from '@/components/ui/AppButton.vue'
import BackButton from '@/components/ui/BackButton.vue'

const router = useRouter()
const route = useRoute()
const phone = computed(() => (route.query.phone as string) || '138****8888')

const digits = ref(['', '', '', '', '', ''])
const inputRefs = ref<(HTMLInputElement | null)[]>([])
const countdown = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

function onInput(idx: number, e: Event) {
  const el = e.target as HTMLInputElement
  const val = el.value.replace(/\D/g, '')
  if (val.length > 1) {
    el.value = val[val.length - 1]
  }
  digits.value[idx] = el.value
  if (el.value && idx < 5) {
    inputRefs.value[idx + 1]?.focus()
  }
}

function onKeydown(idx: number, e: KeyboardEvent) {
  if (e.key === 'Backspace' && !digits.value[idx] && idx > 0) {
    inputRefs.value[idx - 1]?.focus()
  }
}

function startCountdown() {
  countdown.value = 60
  if (timer) clearInterval(timer)
  timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      if (timer) clearInterval(timer)
      timer = null
    }
  }, 1000)
}

function resend() {
  if (countdown.value > 0) return
  startCountdown()
}

function verify() {
  const code = digits.value.join('')
  if (code.length < 6) return
  router.push('/home')
}

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

startCountdown()
</script>

<template>
  <ScreenView>
    <div class="pad stack" style="padding-top: 16px; gap: 32px;">
      <BackButton @click="router.push('/login')" />

      <div class="text-center">
        <h1 class="title">输入验证码</h1>
        <p class="sub">验证码已发送至 {{ phone }}</p>
      </div>

      <div class="code-grid">
        <input
          v-for="(d, i) in digits"
          :key="i"
          :ref="el => { inputRefs[i] = el as HTMLInputElement }"
          :value="d"
          type="tel"
          maxlength="1"
          inputmode="numeric"
          pattern="[0-9]"
          class="code-box"
          :class="{ filled: d }"
          @input="onInput(i, $event)"
          @keydown="onKeydown(i, $event)"
        />
      </div>

      <div class="text-center">
        <p class="meta resend">
          <template v-if="countdown > 0">{{ countdown }}s 后重新发送</template>
          <button v-else class="resend-btn" @click="resend">重新发送验证码</button>
        </p>
      </div>

      <div style="margin-top: auto;">
        <AppButton :class="{ dim: digits.join('').length < 6 }" @click="verify">验证</AppButton>
      </div>
    </div>
  </ScreenView>
</template>

<style scoped>
.pad {
  padding-inline: 20px;
}

.stack {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

.text-center {
  text-align: center;
}

.title {
  font-family: var(--font-display);
  font-size: 26px;
  margin: 0 0 8px;
  letter-spacing: -0.02em;
}

.sub {
  margin: 0;
  color: var(--muted);
  font-size: 14px;
}

.code-grid {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.code-box {
  width: 44px;
  height: 52px;
  text-align: center;
  font-family: var(--font-mono);
  font-size: 22px;
  font-weight: 600;
  letter-spacing: -0.02em;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--surface);
  color: var(--fg);
  outline: none;
  transition: border-color 0.15s;
}

.code-box:focus {
  border-color: var(--accent);
}

.code-box.filled {
  border-color: var(--accent);
  background: var(--accent-soft);
}

.meta {
  font-family: var(--font-mono);
  font-size: var(--fs-meta);
  color: var(--muted);
  margin: 0;
}

.resend {
  margin: 0;
}

.resend-btn {
  background: none;
  border: 0;
  color: var(--accent);
  font: inherit;
  cursor: pointer;
  padding: 0;
}

.dim {
  opacity: 0.5;
  pointer-events: none;
}
</style>
