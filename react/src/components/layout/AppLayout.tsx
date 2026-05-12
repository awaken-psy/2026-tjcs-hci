import { useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import StatusBar from '../ui/StatusBar'
import TabBar from '../ui/TabBar'

export default function AppLayout({ children }: { children: ReactNode }) {
  const location = useLocation()
  const showTabBar = ['/home', '/history', '/profile'].includes(location.pathname)

  return (
    <div className="screen-view">
      <StatusBar />
      <main className="content">{children}</main>
      {showTabBar && <TabBar />}

      <style jsx>{`
        .screen-view {
          display: flex;
          flex-direction: column;
          min-height: 100%;
          flex: 1;
        }
        .content {
          flex: 1 1 auto;
          overflow-y: auto;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          position: relative;
        }
        .content::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
