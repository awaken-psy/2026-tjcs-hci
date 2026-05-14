<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ScreenView from '@/components/layout/ScreenView.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppButton from '@/components/ui/AppButton.vue'
import BackButton from '@/components/ui/BackButton.vue'
import BellIcon from '@/components/icons/BellIcon.vue'

const router = useRouter()

const pushEnabled = ref(true)
const soundEnabled = ref(true)
const dailyReminder = ref(true)
const darkMode = ref(false)

onMounted(() => {
  darkMode.value = localStorage.getItem('theme') === 'dark'
})

function toggleDarkMode() {
  darkMode.value = !darkMode.value
  const theme = darkMode.value ? 'dark' : 'light'
  localStorage.setItem('theme', theme)
  const screen = document.querySelector('.screen')
  if (screen) {
    if (darkMode.value) {
      screen.setAttribute('data-theme', 'dark')
    } else {
      screen.removeAttribute('data-theme')
    }
  }
}

function goHelpCenter() {
  router.push('/help-center')
}

function logout() {
  router.push('/login')
}
</script>

<template>
  <ScreenView>
    <div class="pad stack" style="padding-top: 16px; gap: 20px;">
      <BackButton @click="router.push('/profile')" />

      <div class="text-center" style="margin-top: 4px;">
        <h1 class="title">设置</h1>
      </div>

      <section data-od-id="settings-account">
        <p class="section-label">账号信息</p>
        <AppCard padding="0">
          <div class="setting-row">
            <span>手机号</span>
            <span class="val">138****8888</span>
          </div>
          <div class="setting-row">
            <span>昵称</span>
            <span class="val">张明</span>
          </div>
          <div class="setting-row">
            <span>邮箱</span>
            <span class="val">zhangming@example.com</span>
          </div>
        </AppCard>
      </section>

      <section data-od-id="settings-notification">
        <p class="section-label">通知设置</p>
        <AppCard padding="0">
          <div class="setting-row toggle">
            <div class="toggle-left">
              <BellIcon class="setting-icon" />
              <span>推送通知</span>
            </div>
            <label class="switch">
              <input v-model="pushEnabled" type="checkbox" />
              <span class="slider"></span>
            </label>
          </div>
          <div class="setting-row toggle">
            <span>声音提醒</span>
            <label class="switch">
              <input v-model="soundEnabled" type="checkbox" />
              <span class="slider"></span>
            </label>
          </div>
          <div class="setting-row toggle">
            <span>每日练习提醒</span>
            <label class="switch">
              <input v-model="dailyReminder" type="checkbox" />
              <span class="slider"></span>
            </label>
          </div>
        </AppCard>
      </section>

      <section data-od-id="settings-general">
        <p class="section-label">通用</p>
        <AppCard padding="0">
          <div class="setting-row toggle">
            <div class="toggle-left">
              <svg class="setting-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
              </svg>
              <span>深色模式</span>
            </div>
            <label class="switch">
              <input :checked="darkMode" type="checkbox" @change="toggleDarkMode" />
              <span class="slider"></span>
            </label>
          </div>
          <div class="setting-row">
            <span>当前版本</span>
            <span class="val">v1.2.0</span>
          </div>
          <div class="setting-row">
            <span>清除缓存</span>
            <span class="val">12.3 MB</span>
          </div>
          <div class="setting-row clickable" @click="goHelpCenter">
            <span>帮助中心</span>
            <ArrowRightIcon class="chev" />
          </div>
          <div class="setting-row">
            <span>数据导出</span>
            <ArrowRightIcon class="chev" />
          </div>
        </AppCard>
      </section>

      <div style="padding-top: 8px; padding-bottom: 24px;">
        <AppButton variant="secondary" @click="logout">退出登录</AppButton>
      </div>
    </div>
  </ScreenView>
</template>

<script lang="ts">
import ArrowRightIcon from '@/components/icons/ArrowRightIcon.vue'
export default {
  components: { ArrowRightIcon }
}
</script>

<style scoped>
.pad {
  padding-inline: 20px;
}

.stack {
  display: flex;
  flex-direction: column;
}

.text-center {
  text-align: center;
}

.title {
  font-family: var(--font-display);
  font-size: 22px;
  margin: 0;
  letter-spacing: -0.02em;
}

.section-label {
  font-family: var(--font-mono);
  font-size: var(--fs-meta);
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin: 0 0 10px;
}

.setting-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  font-size: 15px;
  border-top: 1px solid var(--border);
}

.setting-row:first-child {
  border-top: 0;
}

.val {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--muted);
}

.clickable {
  cursor: pointer;
}

.clickable:active {
  background: var(--fg-soft);
}

.toggle {
  cursor: default;
}

.toggle-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.setting-icon {
  width: 18px;
  height: 18px;
  stroke: var(--muted);
  fill: none;
  stroke-width: 1.8;
}

.switch {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 26px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  inset: 0;
  background: var(--border);
  border-radius: 999px;
  transition: background 0.2s;
}

.slider::before {
  content: '';
  position: absolute;
  width: 22px;
  height: 22px;
  left: 2px;
  bottom: 2px;
  background: #fff;
  border-radius: 50%;
  transition: transform 0.2s;
}

.switch input:checked + .slider {
  background: var(--accent);
}

.switch input:checked + .slider::before {
  transform: translateX(18px);
}

.chev {
  width: 16px;
  height: 16px;
  stroke: var(--border);
  fill: none;
  stroke-width: 2;
}
</style>
