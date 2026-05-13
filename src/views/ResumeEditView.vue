<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import ScreenView from '@/components/layout/ScreenView.vue'
import BackButton from '@/components/ui/BackButton.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppInput from '@/components/ui/AppInput.vue'
import Tag from '@/components/ui/Tag.vue'
import { loadResume, saveResume } from '@/utils/resumeStore'
import type { ResumeData, ResumeEducation, ResumeExperience, ResumeProject } from '@/types'

const router = useRouter()
const resume = ref<ResumeData>(loadResume())

type Module = 'personal' | 'education' | 'experience' | 'skills' | 'projects' | 'summary' | null
const editingModule = ref<Module>(null)
const editingItemIndex = ref(-1)

const moduleLabels: Record<string, string> = {
  personal: '个人信息',
  education: '教育经历',
  experience: '实习经历',
  skills: '技能标签',
  projects: '项目经历',
  summary: '自我评价',
}

// ---- new item templates ----

function newEducation(): ResumeEducation {
  return { id: Date.now().toString(), school: '', degree: '', major: '', startDate: '', endDate: '' }
}

function newExperience(): ResumeExperience {
  return { id: Date.now().toString(), company: '', title: '', startDate: '', endDate: '', description: '' }
}

function newProject(): ResumeProject {
  return { id: Date.now().toString(), name: '', role: '', startDate: '', endDate: '', description: '' }
}

// ---- item forms ----

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const itemForm = ref<Record<string, any> | null>(null)
const skillInput = ref('')

function openItemForm(index: number) {
  editingItemIndex.value = index
  const mod = editingModule.value!
  const list = (resume.value as any)[mod] as any[]
  itemForm.value = index === -1
    ? (mod === 'education' ? newEducation() : mod === 'experience' ? newExperience() : newProject())
    : { ...list[index] }
}

function saveItemForm() {
  const mod = editingModule.value!
  const list = (resume.value as any)[mod] as any[]
  if (editingItemIndex.value === -1) {
    list.push(itemForm.value!)
  } else {
    list[editingItemIndex.value] = itemForm.value!
  }
  editingItemIndex.value = -1
  itemForm.value = null
  persist()
}

function deleteItem(index: number) {
  const mod = editingModule.value!
  const list = (resume.value as any)[mod] as any[]
  list.splice(index, 1)
  persist()
}

// ---- skills ----

function addSkill() {
  const v = skillInput.value.trim()
  if (v && !resume.value.skills.includes(v)) {
    resume.value.skills.push(v)
    skillInput.value = ''
    persist()
  }
}

function removeSkill(skill: string) {
  resume.value.skills = resume.value.skills.filter(s => s !== skill)
  persist()
}

// ---- persistence ----

function persist() {
  saveResume(resume.value)
}

function selectModule(mod: Module) {
  editingModule.value = mod
  editingItemIndex.value = -1
  itemForm.value = null
  skillInput.value = ''
}

function backToList() {
  editingModule.value = null
  editingItemIndex.value = -1
  itemForm.value = null
}

// ---- summary ----

const personalTitle = computed(() => {
  const p = resume.value.personal
  return p.name || '个人信息'
})

const educationTitle = computed(() => {
  const c = resume.value.education.length
  return c ? `${c} 条教育经历` : '添加教育经历'
})

const experienceTitle = computed(() => {
  const c = resume.value.experience.length
  return c ? `${c} 条实习经历` : '添加实习经历'
})

const projectsTitle = computed(() => {
  const c = resume.value.projects.length
  return c ? `${c} 个项目经历` : '添加项目经历'
})

const skillsTitle = computed(() => {
  const c = resume.value.skills.length
  return c ? `${c} 个技能标签` : '添加技能标签'
})

const summaryTitle = computed(() => {
  return resume.value.summary ? '已填写' : '添加自我评价'
})
</script>

<template>
  <ScreenView>
    <!-- ── List Mode ── -->
    <template v-if="!editingModule">
      <div class="pad stack" style="padding-top: 16px; gap: 4px;">
        <BackButton @click="router.push('/profile')" />

        <div class="header">
          <h1 class="title">编辑简历</h1>
          <p class="meta">点击模块进入编辑</p>
        </div>

        <div class="module-list" style="margin-top: 8px;">
          <button class="module-card" @click="selectModule('personal')">
            <div class="module-info">
              <span class="module-label">个人信息</span>
              <span class="module-detail">{{ personalTitle }}</span>
            </div>
            <span class="chevron">›</span>
          </button>

          <button class="module-card" @click="selectModule('education')">
            <div class="module-info">
              <span class="module-label">教育经历</span>
              <span class="module-detail">{{ educationTitle }}</span>
            </div>
            <span class="chevron">›</span>
          </button>

          <button class="module-card" @click="selectModule('experience')">
            <div class="module-info">
              <span class="module-label">实习经历</span>
              <span class="module-detail">{{ experienceTitle }}</span>
            </div>
            <span class="chevron">›</span>
          </button>

          <button class="module-card" @click="selectModule('skills')">
            <div class="module-info">
              <span class="module-label">技能标签</span>
              <span class="module-detail">{{ skillsTitle }}</span>
            </div>
            <span class="chevron">›</span>
          </button>

          <button class="module-card" @click="selectModule('projects')">
            <div class="module-info">
              <span class="module-label">项目经历</span>
              <span class="module-detail">{{ projectsTitle }}</span>
            </div>
            <span class="chevron">›</span>
          </button>

          <button class="module-card" @click="selectModule('summary')">
            <div class="module-info">
              <span class="module-label">自我评价</span>
              <span class="module-detail">{{ summaryTitle }}</span>
            </div>
            <span class="chevron">›</span>
          </button>
        </div>
      </div>
    </template>

    <!-- ── Edit Mode ── -->
    <template v-else>
      <div class="pad stack" style="padding-top: 16px; gap: 20px;">
        <BackButton @click="backToList">{{ moduleLabels[editingModule!] }}</BackButton>

        <!-- ── Personal ── -->
        <template v-if="editingModule === 'personal'">
          <section data-od-id="edit-personal" style="margin-top: 4px;">
            <h1 class="page-title">个人信息</h1>
            <div class="form-stack">
              <div class="field">
                <label class="field-label">姓名</label>
                <AppInput v-model="resume.personal.name" placeholder="请输入姓名" @update:model-value="persist" />
              </div>
              <div class="field">
                <label class="field-label">邮箱</label>
                <AppInput v-model="resume.personal.email" type="email" placeholder="请输入邮箱" @update:model-value="persist" />
              </div>
              <div class="field">
                <label class="field-label">手机</label>
                <AppInput v-model="resume.personal.phone" placeholder="请输入手机号" @update:model-value="persist" />
              </div>
              <div class="field">
                <label class="field-label">所在地</label>
                <AppInput v-model="resume.personal.location" placeholder="如：北京" @update:model-value="persist" />
              </div>
            </div>
          </section>
        </template>

        <!-- ── Education ── -->
        <template v-if="editingModule === 'education'">
          <section data-od-id="edit-education" style="margin-top: 4px;">
            <h1 class="page-title">教育经历</h1>

            <template v-if="editingItemIndex >= -1 && itemForm">
              <div class="form-stack">
                <div class="field">
                  <label class="field-label">学校</label>
                  <AppInput v-model="itemForm.school" placeholder="请输入学校名称" />
                </div>
                <div class="field">
                  <label class="field-label">学历</label>
                  <AppInput v-model="itemForm.degree" placeholder="如：本科" />
                </div>
                <div class="field">
                  <label class="field-label">专业</label>
                  <AppInput v-model="itemForm.major" placeholder="请输入专业" />
                </div>
                <div class="field-row">
                  <div class="field" style="flex: 1;">
                    <label class="field-label">开始时间</label>
                    <AppInput v-model="itemForm.startDate" type="month" placeholder="YYYY-MM" />
                  </div>
                  <div class="field" style="flex: 1;">
                    <label class="field-label">结束时间</label>
                    <AppInput v-model="itemForm.endDate" type="month" placeholder="YYYY-MM" />
                  </div>
                </div>
                <div class="btn-row">
                  <AppButton variant="secondary" @click="editingItemIndex = -1; itemForm = null">取消</AppButton>
                  <AppButton @click="saveItemForm">保存</AppButton>
                </div>
              </div>
            </template>

            <template v-else>
              <div v-for="(item, i) in resume.education" :key="item.id" class="list-item">
                <div class="list-item-main" @click="openItemForm(i)">
                  <div class="list-item-title">{{ item.school || '未填写' }}</div>
                  <div class="list-item-sub">{{ item.major }}{{ item.degree ? ` · ${item.degree}` : '' }}</div>
                  <div class="list-item-meta" v-if="item.startDate">{{ item.startDate }} — {{ item.endDate }}</div>
                </div>
                <button class="delete-btn" @click="deleteItem(i)">删除</button>
              </div>
              <AppButton variant="secondary" @click="openItemForm(-1)">+ 添加教育经历</AppButton>
            </template>
          </section>
        </template>

        <!-- ── Experience ── -->
        <template v-if="editingModule === 'experience'">
          <section data-od-id="edit-experience" style="margin-top: 4px;">
            <h1 class="page-title">实习经历</h1>

            <template v-if="editingItemIndex >= -1 && itemForm">
              <div class="form-stack">
                <div class="field">
                  <label class="field-label">公司</label>
                  <AppInput v-model="itemForm.company" placeholder="请输入公司名称" />
                </div>
                <div class="field">
                  <label class="field-label">职位</label>
                  <AppInput v-model="itemForm.title" placeholder="如：前端开发实习生" />
                </div>
                <div class="field-row">
                  <div class="field" style="flex: 1;">
                    <label class="field-label">开始时间</label>
                    <AppInput v-model="itemForm.startDate" type="month" placeholder="YYYY-MM" />
                  </div>
                  <div class="field" style="flex: 1;">
                    <label class="field-label">结束时间</label>
                    <AppInput v-model="itemForm.endDate" type="month" placeholder="YYYY-MM" />
                  </div>
                </div>
                <div class="field">
                  <label class="field-label">工作描述</label>
                  <textarea
                    v-model="itemForm.description"
                    class="textarea"
                    placeholder="描述你的工作内容和成果"
                    rows="3"
                  />
                </div>
                <div class="btn-row">
                  <AppButton variant="secondary" @click="editingItemIndex = -1; itemForm = null">取消</AppButton>
                  <AppButton @click="saveItemForm">保存</AppButton>
                </div>
              </div>
            </template>

            <template v-else>
              <div v-for="(item, i) in resume.experience" :key="item.id" class="list-item">
                <div class="list-item-main" @click="openItemForm(i)">
                  <div class="list-item-title">{{ item.title || '未填写' }}</div>
                  <div class="list-item-sub">{{ item.company }}</div>
                  <div class="list-item-meta" v-if="item.startDate">{{ item.startDate }} — {{ item.endDate }}</div>
                </div>
                <button class="delete-btn" @click="deleteItem(i)">删除</button>
              </div>
              <AppButton variant="secondary" @click="openItemForm(-1)">+ 添加实习经历</AppButton>
            </template>
          </section>
        </template>

        <!-- ── Skills ── -->
        <template v-if="editingModule === 'skills'">
          <section data-od-id="edit-skills" style="margin-top: 4px;">
            <h1 class="page-title">技能标签</h1>
            <div class="tag-wrap" style="margin-bottom: 16px;">
              <Tag v-for="s in resume.skills" :key="s">
                {{ s }}
                <button class="tag-remove" @click="removeSkill(s)">×</button>
              </Tag>
            </div>
            <div class="add-skill-row">
              <AppInput v-model="skillInput" placeholder="输入技能名称" @keyup.enter="addSkill" />
              <AppButton variant="secondary" @click="addSkill">添加</AppButton>
            </div>
          </section>
        </template>

        <!-- ── Projects ── -->
        <template v-if="editingModule === 'projects'">
          <section data-od-id="edit-projects" style="margin-top: 4px;">
            <h1 class="page-title">项目经历</h1>

            <template v-if="editingItemIndex >= -1 && itemForm">
              <div class="form-stack">
                <div class="field">
                  <label class="field-label">项目名称</label>
                  <AppInput v-model="itemForm.name" placeholder="请输入项目名称" />
                </div>
                <div class="field">
                  <label class="field-label">担任角色</label>
                  <AppInput v-model="itemForm.role" placeholder="如：前端负责人" />
                </div>
                <div class="field-row">
                  <div class="field" style="flex: 1;">
                    <label class="field-label">开始时间</label>
                    <AppInput v-model="itemForm.startDate" type="month" placeholder="YYYY-MM" />
                  </div>
                  <div class="field" style="flex: 1;">
                    <label class="field-label">结束时间</label>
                    <AppInput v-model="itemForm.endDate" type="month" placeholder="YYYY-MM" />
                  </div>
                </div>
                <div class="field">
                  <label class="field-label">项目描述</label>
                  <textarea
                    v-model="itemForm.description"
                    class="textarea"
                    placeholder="描述项目内容、技术栈和成果"
                    rows="3"
                  />
                </div>
                <div class="btn-row">
                  <AppButton variant="secondary" @click="editingItemIndex = -1; itemForm = null">取消</AppButton>
                  <AppButton @click="saveItemForm">保存</AppButton>
                </div>
              </div>
            </template>

            <template v-else>
              <div v-for="(item, i) in resume.projects" :key="item.id" class="list-item">
                <div class="list-item-main" @click="openItemForm(i)">
                  <div class="list-item-title">{{ item.name || '未填写' }}</div>
                  <div class="list-item-sub">{{ item.role }}</div>
                  <div class="list-item-meta" v-if="item.startDate">{{ item.startDate }} — {{ item.endDate }}</div>
                </div>
                <button class="delete-btn" @click="deleteItem(i)">删除</button>
              </div>
              <AppButton variant="secondary" @click="openItemForm(-1)">+ 添加项目经历</AppButton>
            </template>
          </section>
        </template>

        <!-- ── Summary ── -->
        <template v-if="editingModule === 'summary'">
          <section data-od-id="edit-summary" style="margin-top: 4px;">
            <h1 class="page-title">自我评价</h1>
            <div class="field">
              <textarea
                v-model="resume.summary"
                class="textarea"
                placeholder="简要介绍自己，突出优势和职业目标"
                rows="6"
                @update:model-value="persist"
              />
            </div>
          </section>
        </template>

        <div style="padding-bottom: 24px;" />
      </div>
    </template>
  </ScreenView>
</template>

<style scoped>
.pad { padding-inline: 20px; }
.stack { display: flex; flex-direction: column; }

.header {
  text-align: center;
  margin-top: 4px;
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

/* module list */
.module-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.module-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  cursor: pointer;
  text-align: left;
  font: inherit;
  color: inherit;
  transition: border-color 0.15s, background 0.15s;
}

.module-card:active {
  background: var(--fg-soft);
}

.module-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.module-label {
  font-size: 15px;
  font-weight: 600;
}

.module-detail {
  font-size: 13px;
  color: var(--muted);
}

.chevron {
  font-size: 22px;
  color: var(--border);
  font-weight: 300;
}

/* edit forms */
.page-title {
  font-family: var(--font-display);
  font-size: var(--fs-h3);
  margin: 0 0 16px;
  font-weight: 600;
}

.form-stack {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field-label {
  font-size: 13px;
  font-weight: 500;
  color: var(--muted);
}

.field-row {
  display: flex;
  gap: 12px;
}

.btn-row {
  display: flex;
  gap: 10px;
}

.btn-row > * {
  flex: 1;
}

/* textarea */
.textarea {
  width: 100%;
  min-height: 48px;
  padding: 12px 14px;
  font: inherit;
  font-size: 14px;
  color: var(--fg);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  resize: vertical;
  outline: none;
  font-family: var(--font-body);
}

.textarea:focus {
  border-color: var(--accent);
}

.textarea::placeholder {
  color: var(--muted);
  opacity: 0.6;
}

/* list items (education, experience, projects) */
.list-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-card);
  margin-bottom: 8px;
}

.list-item-main {
  flex: 1;
  cursor: pointer;
}

.list-item-title {
  font-size: 14px;
  font-weight: 600;
  line-height: 1.3;
}

.list-item-sub {
  font-size: 13px;
  color: var(--muted);
  margin-top: 2px;
}

.list-item-meta {
  font-family: var(--font-mono);
  font-size: var(--fs-meta);
  color: var(--muted);
  margin-top: 4px;
}

.delete-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: none;
  border: none;
  color: var(--danger, #DC2626);
  font-size: 13px;
  cursor: pointer;
  border-radius: 8px;
  flex-shrink: 0;
}

.delete-btn:active {
  background: var(--fg-soft);
}

/* tags */
.tag-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag-remove {
  margin-left: 4px;
  background: none;
  border: none;
  color: inherit;
  opacity: 0.5;
  cursor: pointer;
  font-size: 14px;
  padding: 0;
  line-height: 1;
}

.tag-remove:hover {
  opacity: 1;
}

.add-skill-row {
  display: flex;
  gap: 8px;
}

.add-skill-row > :first-child {
  flex: 1;
}

.add-skill-row > :last-child {
  flex-shrink: 0;
  width: auto;
}
</style>
