export interface ScreenInfo {
  id: string
  path: string
}

export interface JobItem {
  id: string
  name: string
  count: number
  icon: string
}

export interface HistoryItem {
  id: string
  title: string
  subtitle: string
  score: number
  icon: string
}

export interface MenuItemData {
  label: string
  icon: string
  action?: () => void
}

export interface DimensionScore {
  label: string
  score: number
}

export interface ChatMessage {
  role: 'ai' | 'user'
  content: string
}

export interface ResumePersonal {
  name: string
  email: string
  phone: string
  location: string
}

export interface ResumeEducation {
  id: string
  school: string
  degree: string
  major: string
  startDate: string
  endDate: string
}

export interface ResumeExperience {
  id: string
  company: string
  title: string
  startDate: string
  endDate: string
  description: string
}

export interface ResumeProject {
  id: string
  name: string
  role: string
  startDate: string
  endDate: string
  description: string
}

export interface ResumeData {
  personal: ResumePersonal
  education: ResumeEducation[]
  experience: ResumeExperience[]
  skills: string[]
  projects: ResumeProject[]
  summary: string
}
