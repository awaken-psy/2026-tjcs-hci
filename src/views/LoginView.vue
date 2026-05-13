<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ScreenView from '@/components/layout/ScreenView.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from '@/components/ui/AppInput.vue'
import WechatIcon from '@/components/icons/WechatIcon.vue'
import AppleIcon from '@/components/icons/AppleIcon.vue'

const router = useRouter()
const phone = ref('138****8888')
const code = ref('')

function login() {
  router.push('/home')
}

function getCode() {
  router.push({ path: '/sms-code', query: { phone: phone.value } })
}
</script>

<template>
  <ScreenView>
    <div class="pad stack" style="padding-top: 48px; gap: 28px;">
    <div class="text-center">
      <h1 class="title">欢迎回来</h1>
      <p class="sub">登录后开始你的面试训练</p>
    </div>

    <div class="stack" style="gap: 14px;">
      <div>
        <label class="meta">手机号</label>
        <AppInput v-model="phone" type="tel" placeholder="请输入手机号" />
      </div>
      <div>
        <label class="meta">验证码</label>
        <div class="row">
          <AppInput v-model="code" placeholder="6位验证码" style="flex: 1;" />
          <AppButton variant="secondary" style="width: auto; padding: 12px 16px; min-height: 48px; font-size: 13px;" @click="getCode">
            获取验证码
          </AppButton>
        </div>
      </div>
    </div>

    <div class="stack" style="gap: 10px;">
      <AppButton @click="login">登录 / 注册</AppButton>
      <p class="meta note">未注册手机号将自动创建账号</p>
    </div>

    <div class="text-center" style="margin-top: 24px;">
      <p class="meta divider">— 其他方式登录 —</p>
      <div class="row social">
        <button class="icon-btn social-btn" aria-label="WeChat">
          <WechatIcon />
        </button>
        <button class="icon-btn social-btn" aria-label="Apple">
          <AppleIcon />
        </button>
      </div>
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
}

.row {
  display: flex;
  align-items: center;
  gap: 12px;
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

.meta {
  font-family: var(--font-mono);
  font-size: var(--fs-meta);
  color: var(--muted);
  display: block;
  margin-bottom: 6px;
}

.note {
  text-align: center;
  margin: 0;
}

.divider {
  margin: 0 0 14px;
}

.social {
  justify-content: center;
  gap: 20px;
}

.icon-btn {
  width: 48px;
  height: 48px;
  border-radius: 999px;
  background: var(--surface);
  border: 1px solid var(--border);
  display: grid;
  place-items: center;
  color: var(--fg);
  cursor: pointer;
}

.icon-btn svg {
  width: 20px;
  height: 20px;
  stroke: currentColor;
  fill: none;
  stroke-width: 1.5;
}
</style>
