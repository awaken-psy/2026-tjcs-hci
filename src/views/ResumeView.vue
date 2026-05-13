<script setup lang="ts">
import { useRouter } from 'vue-router'
import ScreenView from '@/components/layout/ScreenView.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppButton from '@/components/ui/AppButton.vue'
import BackButton from '@/components/ui/BackButton.vue'
import Avatar from '@/components/ui/Avatar.vue'
import Tag from '@/components/ui/Tag.vue'
import UserIcon from '@/components/icons/UserIcon.vue'

const router = useRouter()

interface Education {
  school: string
  degree: string
  period: string
}

interface Experience {
  title: string
  company: string
  period: string
  desc: string
}

const info = {
  name: '张明',
  school: 'XX大学',
  major: '计算机科学与技术',
  degree: '本科 · 大四',
  email: 'zhangming@example.com',
  phone: '138****8888',
}

const educationList: Education[] = [
  { school: 'XX大学', degree: '计算机科学与技术 · 本科', period: '2022.09 - 2026.06' },
]

const experienceList: Experience[] = [
  {
    title: '前端开发实习生',
    company: '某科技有限公司',
    period: '2025.06 - 2025.09',
    desc: '参与内部CRM系统重构，使用Vue 3 + TypeScript完成5个核心模块开发，页面加载性能提升40%。',
  },
  {
    title: '前端开发实习生',
    company: '某互联网公司',
    period: '2025.01 - 2025.04',
    desc: '负责移动端H5活动页面开发，累计服务用户超50万，获得部门季度优秀实习生。',
  },
]

const skills = ['JavaScript', 'TypeScript', 'Vue 3', 'React', 'Node.js', 'CSS/Sass', 'Git', 'Webpack']
</script>

<template>
  <ScreenView>
    <div class="pad stack" style="padding-top: 16px; gap: 20px;">
      <BackButton @click="router.push('/profile')" />

      <div class="text-center" style="margin-top: 4px;">
        <h1 class="title">我的简历</h1>
        <p class="meta">最后更新：2026年5月8日</p>
      </div>

      <section data-od-id="resume-basic">
        <div class="row" style="gap: 14px;">
          <Avatar :size="52">
            <UserIcon />
          </Avatar>
          <div>
            <div class="h3">{{ info.name }}</div>
            <div class="meta-row">{{ info.school }} · {{ info.major }}</div>
            <div class="meta-row">{{ info.degree }}</div>
          </div>
        </div>
        <div class="contacts" style="margin-top: 12px;">
          <div class="contact-item">
            <span class="meta">邮箱</span>
            <span class="contact-val">{{ info.email }}</span>
          </div>
          <div class="contact-item">
            <span class="meta">手机</span>
            <span class="contact-val">{{ info.phone }}</span>
          </div>
        </div>
      </section>

      <section data-od-id="resume-skills">
        <p class="section-label">技能标签</p>
        <div class="tag-wrap">
          <Tag v-for="s in skills" :key="s">{{ s }}</Tag>
        </div>
      </section>

      <section data-od-id="resume-edu">
        <p class="section-label">教育背景</p>
        <AppCard v-for="e in educationList" :key="e.school" padding="14px 16px" style="margin-bottom: 8px;">
          <div class="row-between">
            <div>
              <div class="item-title">{{ e.school }}</div>
              <div class="meta">{{ e.degree }}</div>
            </div>
            <span class="meta">{{ e.period }}</span>
          </div>
        </AppCard>
      </section>

      <section data-od-id="resume-exp">
        <p class="section-label">实习经历</p>
        <AppCard v-for="e in experienceList" :key="e.title + e.period" padding="14px 16px" style="margin-bottom: 8px;">
          <div class="row-between" style="margin-bottom: 6px;">
            <div class="item-title">{{ e.title }}</div>
            <span class="meta">{{ e.period }}</span>
          </div>
          <div class="meta" style="margin-bottom: 6px;">{{ e.company }}</div>
          <p class="exp-desc">{{ e.desc }}</p>
        </AppCard>
      </section>

      <div style="padding-bottom: 24px;">
        <AppButton variant="secondary">编辑简历</AppButton>
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

.text-center {
  text-align: center;
}

.title {
  font-family: var(--font-display);
  font-size: 22px;
  margin: 0 0 6px;
  letter-spacing: -0.02em;
}

.meta {
  font-family: var(--font-mono);
  font-size: var(--fs-meta);
  color: var(--muted);
  margin: 0;
}

.row {
  display: flex;
  align-items: center;
}

.row-between {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
}

.h3 {
  font-size: var(--fs-h3);
  font-weight: 600;
  line-height: 1.3;
}

.meta-row {
  font-size: 13px;
  color: var(--muted);
  margin-top: 2px;
}

.contacts {
  display: flex;
  gap: 24px;
}

.contact-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.contact-val {
  font-size: 13px;
}

.section-label {
  font-family: var(--font-mono);
  font-size: var(--fs-meta);
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin: 0 0 10px;
}

.tag-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.item-title {
  font-size: 14px;
  font-weight: 600;
}

.exp-desc {
  margin: 0;
  font-size: 13px;
  color: var(--muted);
  line-height: 1.55;
}
</style>
