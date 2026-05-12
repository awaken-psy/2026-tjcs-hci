import { useLocation } from 'react-router-dom'
import DeviceFrame from './components/layout/DeviceFrame'
import ScreenSwitcher from './components/layout/ScreenSwitcher'
import AppRoutes from './router'
import type { ScreenInfo } from './types'

const screens: ScreenInfo[] = [
  { id: 'Splash', path: '/' },
  { id: 'Onboarding 1', path: '/onboarding-1' },
  { id: 'Onboarding 2', path: '/onboarding-2' },
  { id: 'Login', path: '/login' },
  { id: 'Home', path: '/home' },
  { id: 'Jobs', path: '/jobs' },
  { id: 'Setup', path: '/setup' },
  { id: 'Interview', path: '/interview' },
  { id: 'Feedback', path: '/feedback' },
  { id: 'History', path: '/history' },
  { id: 'Profile', path: '/profile' },
]

export default function App() {
  const location = useLocation()
  const current = screens.find((s) => s.path === location.pathname)

  return (
    <div className="stage">
      <div className="caption">
        <strong>智能面试官</strong>
        <span className="dot-sep">·</span>
        <span>交互原型</span>
        <span className="dot-sep">·</span>
        <span>{current?.id || location.pathname}</span>
      </div>

      <ScreenSwitcher screens={screens} />

      <DeviceFrame>
        <AppRoutes />
      </DeviceFrame>
    </div>
  )
}
