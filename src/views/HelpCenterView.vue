<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import ScreenView from '@/components/layout/ScreenView.vue'
import BackButton from '@/components/ui/BackButton.vue'
import AppCard from '@/components/ui/AppCard.vue'

const router = useRouter()

const searchQuery = ref('')
const expandedId = ref<string | null>(null)

interface FAQ {
  id: string
  category: string
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    id: 'faq-1',
    category: '账号与登录',
    question: '如何注册 AI 面试官账号？',
    answer: '下载 App 后点击"注册"按钮，使用手机号获取验证码即可完成注册。注册后系统会引导你完成 2 分钟的个人偏好设置，以便为你匹配最合适的面试题库。',
  },
  {
    id: 'faq-2',
    category: '账号与登录',
    question: '一个账号可以在多台设备上使用吗？',
    answer: '可以。你的面试记录、收藏题目和研究计划都会云端同步。在任意设备上登录同一账号即可无缝切换，面试进度不会丢失。',
  },
  {
    id: 'faq-3',
    category: '面试功能',
    question: 'AI 面试官支持哪些类型的面试？',
    answer: '目前支持四种面试模式：结构化面试（行为面）、技术问答、案例分析和模拟群面。你可以在「选择岗位」后自定义面试方向和难度等级，系统会基于真实大厂题库动态生成题目。',
  },
  {
    id: 'faq-4',
    category: '面试功能',
    question: '面试过程中的语音输入是如何工作的？',
    answer: '面试时点击麦克风按钮即可开始语音输入，AI 会实时将你的回答转写为文字，并结合回答内容、语速、停顿等因素给出综合评估。语音数据仅在本地处理，不会上传至服务器。',
  },
  {
    id: 'faq-5',
    category: '面试功能',
    question: '面试结束后可以得到哪些反馈？',
    answer: '每场面试结束后，系统会生成一份详细的反馈报告，包括：综合评分（0-100 分）、逐题评分与点评、语言表达与逻辑分析、改进建议和推荐练习方向。你还可以收藏错题并在「我的收藏」中集中复习。',
  },
  {
    id: 'faq-6',
    category: '题库与更新',
    question: '面试题库多久更新一次？',
    answer: '题库每月更新一次，新增题目主要来自近三个月国内一线互联网公司的真实面试真题。重大更新（如新增岗位方向或面试模式）会通过系统通知提前告知。',
  },
  {
    id: 'faq-7',
    category: '题库与更新',
    question: '题库覆盖了哪些公司和岗位？',
    answer: '目前覆盖字节跳动、阿里巴巴、腾讯、美团、拼多多、小红书等头部互联网公司，以及前端开发、后端开发、产品经理、数据分析、UI 设计等十余个核心岗位方向。',
  },
  {
    id: 'faq-8',
    category: '隐私与安全',
    question: '我的面试录音和回答数据会被存储吗？',
    answer: '语音数据仅在面试过程中用于实时转写，面试结束后不会保存原始录音。转写文字、评分和历史记录存储在本地设备，仅在开启云端同步时会上传至加密服务器。我们不会将你的数据用于任何第三方用途。',
  },
  {
    id: 'faq-9',
    category: '付费与会员',
    question: 'AI 面试官是免费的吗？',
    answer: '基础版免费，包含每天 3 次面试机会、核心题库访问和基础反馈报告。Pro 会员解锁无限面试次数、深度分析报告、AI 追问模式和专属题库，月费 ¥29.9，年费 ¥199。新用户享有 7 天免费 Pro 试用。',
  },
  {
    id: 'faq-10',
    category: '付费与会员',
    question: '如何联系客服或反馈问题？',
    answer: '你可以通过以下方式联系我们：① 在 App 内「设置 > 帮助中心」页面底部点击「联系客服」按钮发起在线咨询（工作日 9:00-21:00）；② 发送邮件至 support@ai-interviewer.cn，我们会在 24 小时内回复。',
  },
]

const filteredFAQs = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return faqs
  return faqs.filter(
    (f) =>
      f.question.toLowerCase().includes(q) ||
      f.answer.toLowerCase().includes(q) ||
      f.category.toLowerCase().includes(q)
  )
})

const groupedFAQs = computed(() => {
  const groups: Record<string, FAQ[]> = {}
  for (const f of filteredFAQs.value) {
    if (!groups[f.category]) groups[f.category] = []
    groups[f.category].push(f)
  }
  return groups
})

function toggle(id: string) {
  expandedId.value = expandedId.value === id ? null : id
}

function goBack() {
  router.push('/settings')
}
</script>

<template>
  <ScreenView>
    <div class="pad stack" style="padding-top: 16px; gap: 16px; padding-bottom: 32px;">
      <BackButton @click="goBack" />

      <div class="text-center" style="margin-top: 4px;">
        <h1 class="title">帮助中心</h1>
      </div>

      <!-- Search -->
      <div class="search-wrap">
        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          class="search-input"
          placeholder="搜索问题…"
        />
      </div>

      <!-- FAQ list -->
      <div v-if="Object.keys(groupedFAQs).length === 0" class="no-result">
        <p class="no-result-text">未找到相关问题</p>
        <p class="no-result-hint">试试其他关键词，或联系客服获取帮助</p>
      </div>

      <div v-else v-for="(items, cat) in groupedFAQs" :key="cat" data-od-id="faq-category">
        <p class="section-label">{{ cat }}</p>
        <AppCard padding="0">
          <div
            v-for="item in items"
            :key="item.id"
            class="faq-item"
            :class="{ expanded: expandedId === item.id }"
          >
            <button class="faq-q" @click="toggle(item.id)">
              <span>{{ item.question }}</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                class="faq-chev"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div v-if="expandedId === item.id" class="faq-a">
              <p>{{ item.answer }}</p>
            </div>
          </div>
        </AppCard>
      </div>

      <!-- Contact footer -->
      <div class="contact-footer" data-od-id="help-contact">
        <p class="contact-title">还没有解决你的问题？</p>
        <button class="contact-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          </svg>
          联系客服
        </button>
        <p class="contact-email">support@ai-interviewer.cn</p>
        <p class="contact-hours">工作日 9:00 – 21:00</p>
      </div>
    </div>
  </ScreenView>
</template>

<style scoped>
.pad { padding-inline: 20px; }
.stack { display: flex; flex-direction: column; }
.text-center { text-align: center; }

.title {
  font-family: var(--font-display);
  font-size: 22px;
  margin: 0;
  letter-spacing: -0.02em;
}

/* Search */
.search-wrap {
  position: relative;
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  stroke: var(--muted);
}

.search-input {
  width: 100%;
  padding: 12px 14px 12px 42px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--fg);
  font-size: 15px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.15s;
}

.search-input::placeholder {
  color: var(--border);
}

.search-input:focus {
  border-color: var(--accent);
}

.no-result {
  text-align: center;
  padding: 40px 20px;
}

.no-result-text {
  font-size: 15px;
  font-weight: 500;
  margin: 0 0 4px;
}

.no-result-hint {
  font-size: 13px;
  color: var(--muted);
  margin: 0;
}

/* Section */
.section-label {
  font-family: var(--font-mono);
  font-size: var(--fs-meta);
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin: 0 0 8px;
}

/* FAQ items */
.faq-item {
  border-top: 1px solid var(--border);
}

.faq-item:first-child {
  border-top: 0;
}

.faq-q {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  padding: 14px 16px;
  border: 0;
  background: transparent;
  color: var(--fg);
  font-size: 15px;
  font-family: inherit;
  text-align: left;
  line-height: 1.4;
  cursor: pointer;
}

.faq-chev {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  stroke: var(--muted);
  transition: transform 0.2s;
}

.faq-item.expanded .faq-chev {
  transform: rotate(180deg);
}

.faq-a {
  padding: 0 16px 16px;
}

.faq-a p {
  margin: 0;
  font-size: 14px;
  color: var(--muted);
  line-height: 1.6;
}

/* Contact */
.contact-footer {
  text-align: center;
  padding: 32px 0 0;
  border-top: 1px solid var(--border);
}

.contact-title {
  font-size: 15px;
  font-weight: 500;
  margin: 0 0 16px;
}

.contact-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 12px 24px;
  border-radius: 12px;
  border: 1px solid var(--accent);
  background: transparent;
  color: var(--accent);
  font-size: 15px;
  font-family: inherit;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
}

.contact-btn svg {
  width: 18px;
  height: 18px;
}

.contact-btn:active {
  background: var(--accent-soft);
}

.contact-email {
  margin: 14px 0 2px;
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--muted);
}

.contact-hours {
  margin: 0;
  font-size: 12px;
  color: var(--border);
}
</style>
