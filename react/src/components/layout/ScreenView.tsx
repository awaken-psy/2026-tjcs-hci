import type { ReactNode } from 'react'

export default function ScreenView({ children }: { children: ReactNode }) {
  return (
    <div className="screen-view">
      {children}
      <style jsx>{`
        .screen-view {
          flex: 1;
          overflow-y: auto;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
          display: flex;
          flex-direction: column;
        }
        .screen-view::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}
