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
