import { useNavigate, useLocation } from 'react-router-dom'
import type { ScreenInfo } from '@/types'

export default function ScreenSwitcher({ screens }: { screens: ScreenInfo[] }) {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="screen-switcher">
      {screens.map((s) => (
        <button
          key={s.path}
          className={`switcher-btn ${location.pathname === s.path ? 'active' : ''}`}
          onClick={() => navigate(s.path)}
        >
          {s.id}
        </button>
      ))}

      <style jsx>{`
        .screen-switcher {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          justify-content: center;
          max-width: 420px;
        }
        .switcher-btn {
          padding: 5px 10px;
          border: 1px solid var(--border);
          background: var(--surface);
          color: var(--muted);
          border-radius: 6px;
          font-size: 11px;
          font-family: var(--font-mono);
          cursor: pointer;
          transition: all 0.15s;
        }
        .switcher-btn:hover {
          border-color: var(--accent);
          color: var(--fg);
        }
        .switcher-btn.active {
          background: var(--accent);
          color: #fff;
          border-color: var(--accent);
        }
      `}</style>
    </div>
  )
}
