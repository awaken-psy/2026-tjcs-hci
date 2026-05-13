import type { ResumeData } from '@/types'

const STORAGE_KEY = 'od-resume-data'

const defaultResume: ResumeData = {
  personal: {
    name: '张明',
    email: 'zhangming@example.com',
    phone: '13800000000',
    location: '北京',
  },
  education: [
    {
      id: '1',
      school: 'XX大学',
      degree: '本科',
      major: '计算机科学与技术',
      startDate: '2022-09',
      endDate: '2026-06',
    },
  ],
  experience: [
    {
      id: '1',
      company: '某科技有限公司',
      title: '前端开发实习生',
      startDate: '2025-06',
      endDate: '2025-09',
      description: '参与内部CRM系统重构，使用Vue 3 + TypeScript完成5个核心模块开发，页面加载性能提升40%。',
    },
    {
      id: '2',
      company: '某互联网公司',
      title: '前端开发实习生',
      startDate: '2025-01',
      endDate: '2025-04',
      description: '负责移动端H5活动页面开发，累计服务用户超50万，获得部门季度优秀实习生。',
    },
  ],
  skills: ['JavaScript', 'TypeScript', 'Vue 3', 'React', 'Node.js', 'CSS/Sass', 'Git', 'Webpack'],
  projects: [
    {
      id: '1',
      name: '校园二手交易平台',
      role: '前端负责人',
      startDate: '2024-09',
      endDate: '2024-12',
      description: '基于Vue 3 + Spring Boot的校园二手交易平台，实现商品发布、搜索、即时通讯等功能，DAU 2000+。',
    },
  ],
  summary: '计算机科学与技术专业大四在读，具备扎实的前端开发基础和良好的工程化思维。有两次实习经历，熟悉Vue 3和TypeScript生态，具备独立开发能力。热爱开源社区，持续关注前端技术发展。',
}

export function loadResume(): ResumeData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      return { ...defaultResume, ...parsed }
    }
  } catch { /* corrupted data — fall through to default */ }
  return { ...defaultResume }
}

export function saveResume(data: ResumeData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}
