<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import ScreenView from '@/components/layout/ScreenView.vue'
import BackButton from '@/components/ui/BackButton.vue'
import AppCard from '@/components/ui/AppCard.vue'
import { store, companyOptions } from '@/utils/communityStore'

const router = useRouter()

const newPost = ref({ company: '', role: '', title: '', content: '' })
const companyInput = ref('')
const showDropdown = ref(false)
const submitted = ref(false)

const filteredCompanies = computed(() => {
  if (!companyInput.value) return companyOptions
  const q = companyInput.value.toLowerCase()
  return companyOptions.filter(c => c.toLowerCase().includes(q))
})

function selectCompany(c: string) {
  companyInput.value = c
  newPost.value.company = c
  showDropdown.value = false
}

function onCompanyInput() {
  newPost.value.company = companyInput.value
  showDropdown.value = true
}

function onCompanyBlur() {
  // Delay to allow click on dropdown item
  setTimeout(() => { showDropdown.value = false }, 150)
}

function submitPost() {
  if (!newPost.value.title || !newPost.value.content) return
  store.createPost({
    company: companyInput.value || '通用',
    role: newPost.value.role,
    title: newPost.value.title,
    content: newPost.value.content,
  })
  submitted.value = true
  setTimeout(() => {
    router.push('/community')
  }, 600)
}

function goBack() { router.push('/community') }
</script>

<template>
  <ScreenView>
    <div class="pad stack" style="padding-top: 12px; gap: 14px; padding-bottom: 24px;">
      <BackButton @click="goBack" />

      <h1 class="title">发布面经</h1>
      <p class="subtitle">分享你的面试经历，帮助更多求职者</p>

      <!-- Success -->
      <AppCard v-if="submitted" padding="20px" class="success-card">
        <div class="success-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <p class="success-text">发布成功！</p>
      </AppCard>

      <!-- Form -->
      <AppCard v-else padding="16px">
        <div class="form-group">
          <label class="form-label">公司名称</label>
          <div class="combobox-wrapper">
            <input
              v-model="companyInput"
              class="form-input"
              placeholder="选择或输入公司名称"
              @focus="showDropdown = true"
              @input="onCompanyInput"
              @blur="onCompanyBlur"
            />
            <div v-if="showDropdown && filteredCompanies.length > 0" class="dropdown">
              <button
                v-for="c in filteredCompanies"
                :key="c"
                class="dropdown-item"
                @mousedown.prevent="selectCompany(c)"
              >{{ c }}</button>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">岗位方向</label>
          <input
            v-model="newPost.role"
            class="form-input"
            placeholder="如：前端开发、后端开发、产品经理"
          />
        </div>

        <div class="form-group">
          <label class="form-label">面经标题</label>
          <input
            v-model="newPost.title"
            class="form-input"
            placeholder="给你的面经取个标题"
          />
        </div>

        <div class="form-group">
          <label class="form-label">面试经历</label>
          <textarea
            v-model="newPost.content"
            class="form-textarea"
            placeholder="分享面试流程、考察重点、你的心得体验..."
            rows="8"
          />
          <p class="char-count">{{ newPost.content.length }} 字</p>
        </div>

        <button
          class="submit-btn"
          :class="{ disabled: !newPost.title || !newPost.content }"
          :disabled="!newPost.title || !newPost.content"
          @click="submitPost"
        >发布面经</button>
      </AppCard>
    </div>
  </ScreenView>
</template>

<style scoped>
.pad { padding-inline: 20px; }
.stack { display: flex; flex-direction: column; }

.title {
  font-family: var(--font-display);
  font-size: 24px;
  letter-spacing: -0.02em;
  margin: 0;
}
.subtitle {
  margin: -6px 0 0;
  font-size: 13px; color: var(--muted);
}

/* Form */
.form-group {
  display: flex; flex-direction: column; gap: 6px;
  margin-bottom: 14px;
}
.form-group:last-of-type { margin-bottom: 0; }
.form-label {
  font-size: 13px; font-weight: 500; color: var(--fg);
}

.form-input {
  width: 100%; padding: 10px 12px;
  border: 1px solid var(--border); border-radius: 8px;
  font-size: 14px; font-family: inherit;
  background: var(--bg); color: var(--fg);
}
.form-input:focus { outline: none; border-color: var(--accent); }

.form-textarea {
  width: 100%; padding: 10px 12px;
  border: 1px solid var(--border); border-radius: 8px;
  font-size: 14px; font-family: inherit; resize: vertical;
  background: var(--bg); color: var(--fg);
  line-height: 1.6;
}
.form-textarea:focus { outline: none; border-color: var(--accent); }

.char-count {
  margin: 0; text-align: right;
  font-size: 11px; color: var(--border); font-family: var(--font-mono);
}

/* Combobox */
.combobox-wrapper { position: relative; }
.dropdown {
  position: absolute; top: 100%; left: 0; right: 0; z-index: 10;
  margin-top: 4px;
  background: var(--surface);
  border: 1px solid var(--border); border-radius: 8px;
  max-height: 180px; overflow-y: auto;
  box-shadow: 0 4px 16px oklch(0% 0 0 / 0.08);
}
.dropdown-item {
  display: block; width: 100%; padding: 10px 12px;
  border: 0; background: transparent;
  font-size: 14px; font-family: inherit; color: var(--fg);
  text-align: left; cursor: pointer;
}
.dropdown-item:hover { background: var(--bg); }

.submit-btn {
  margin-top: 16px; padding: 12px 0; width: 100%;
  border-radius: 10px; border: 0;
  background: var(--accent); color: #fff;
  font-size: 15px; font-weight: 600; font-family: inherit;
  cursor: pointer; transition: opacity 0.15s;
}
.submit-btn.disabled { opacity: 0.45; cursor: not-allowed; }

/* Success */
.success-card { text-align: center; }
.success-icon {
  width: 48px; height: 48px; border-radius: 50%;
  background: oklch(58% 0.2 150 / 0.12);
  color: oklch(58% 0.18 150);
  display: grid; place-items: center;
  margin: 0 auto 12px;
}
.success-icon svg { width: 24px; height: 24px; }
.success-text { font-size: 16px; font-weight: 600; margin: 0; }
</style>
