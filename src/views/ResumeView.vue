<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import ScreenView from '@/components/layout/ScreenView.vue'
import AppCard from '@/components/ui/AppCard.vue'
import AppButton from '@/components/ui/AppButton.vue'
import BackButton from '@/components/ui/BackButton.vue'
import Avatar from '@/components/ui/Avatar.vue'
import Tag from '@/components/ui/Tag.vue'
import UserIcon from '@/components/icons/UserIcon.vue'
import { loadResume } from '@/utils/resumeStore'

const router = useRouter()
const resume = loadResume()

const info = computed(() => ({
  name: resume.personal.name,
  email: resume.personal.email,
  phone: resume.personal.phone,
  location: resume.personal.location,
}))

const firstEdu = resume.education[0]
const schoolInfo = computed(() => ({
  school: firstEdu?.school || '',
  major: firstEdu?.major || '',
  degree: firstEdu ? `${firstEdu.degree} · 大四` : '',
}))

const educationList = computed(() => resume.education.map(e => ({
  id: e.id,
  school: e.school,
  degree: `${e.major} · ${e.degree}`,
  period: `${e.startDate} - ${e.endDate}`,
})))

const experienceList = computed(() => resume.experience.map(e => ({
  id: e.id,
  title: e.title,
  company: e.company,
  period: `${e.startDate} - ${e.endDate}`,
  desc: e.description,
})))

const projectList = computed(() => resume.projects.map(p => ({
  id: p.id,
  name: p.name,
  role: p.role,
  period: `${p.startDate} - ${p.endDate}`,
  desc: p.description,
})))

const skills = computed(() => resume.skills)
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
            <div class="meta-row">{{ schoolInfo.school }} · {{ schoolInfo.major }}</div>
            <div class="meta-row">{{ schoolInfo.degree }}</div>
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
          <div class="contact-item">
            <span class="meta">所在地</span>
            <span class="contact-val">{{ info.location }}</span>
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
        <AppCard v-for="e in educationList" :key="e.id" padding="14px 16px" style="margin-bottom: 8px;">
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
        <AppCard v-for="e in experienceList" :key="e.id" padding="14px 16px" style="margin-bottom: 8px;">
          <div class="row-between" style="margin-bottom: 6px;">
            <div class="item-title">{{ e.title }}</div>
            <span class="meta">{{ e.period }}</span>
          </div>
          <div class="meta" style="margin-bottom: 6px;">{{ e.company }}</div>
          <p class="exp-desc">{{ e.desc }}</p>
        </AppCard>
        <p v-if="!experienceList.length" class="empty-hint">暂无实习经历</p>
      </section>

      <section data-od-id="resume-projects">
        <p class="section-label">项目经历</p>
        <AppCard v-for="p in projectList" :key="p.id" padding="14px 16px" style="margin-bottom: 8px;">
          <div class="row-between" style="margin-bottom: 6px;">
            <div class="item-title">{{ p.name }}</div>
            <span class="meta">{{ p.period }}</span>
          </div>
          <div class="meta" style="margin-bottom: 6px;">{{ p.role }}</div>
          <p class="exp-desc">{{ p.desc }}</p>
        </AppCard>
        <p v-if="!projectList.length" class="empty-hint">暂无项目经历</p>
      </section>

      <section v-if="resume.summary" data-od-id="resume-summary">
        <p class="section-label">自我评价</p>
        <AppCard padding="14px 16px" style="margin-bottom: 8px;">
          <p class="summary-text">{{ resume.summary }}</p>
        </AppCard>
      </section>

      <div style="padding-bottom: 24px;">
        <AppButton variant="secondary" @click="router.push('/resume/edit')">编辑简历</AppButton>
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

.empty-hint {
  font-size: 13px;
  color: var(--muted);
  margin: 0;
}

.exp-desc {
  margin: 0;
  font-size: 13px;
  color: var(--muted);
  line-height: 1.55;
}

.summary-text {
  font-size: 13px;
  color: var(--muted);
  line-height: 1.55;
}
</style>
