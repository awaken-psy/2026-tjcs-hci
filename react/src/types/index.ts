export interface ScreenInfo {
  id: string
  path: string
}

export interface JobItem {
  id: string
  name: string
  count: string
  icon: React.ComponentType
}

export interface HistoryItem {
  id: string
  title: string
  subtitle: string
  score: number
  icon: React.ComponentType
}

export interface MenuItemData {
  label: string
  icon: React.ComponentType
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
