import { useNavigate, useLocation } from 'react-router-dom'

const tabs = [
  { id: 'home', label: '首页', path: '/home' },
  { id: 'history', label: '记录', path: '/history' },
  { id: 'profile', label: '我的', path: '/profile' },
]

const icons: Record<string, JSX.Element> = {
  home: (
    <svg viewBox="0 0 24 24">
      <path d="M3 12 12 3l9 9" />
      <path d="M5 10v10h14V10" />
    </svg>
  ),
  history: (
    <svg viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="8" />
      <polyline points="11 8 11 11 14 14" />
    </svg>
  ),
  profile: (
    <svg viewBox="0 0 24 24">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
    </svg>
  ),
}

export default function TabBar() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <nav className="tabbar">
      {tabs.map((tab) => (
        <a
          key={tab.id}
          className={`tab ${location.pathname === tab.path ? 'active' : ''}`}
          onClick={() => navigate(tab.path)}
        >
          {icons[tab.id]}
          {tab.label}
        </a>
      ))}

      <style jsx>{`
        .tabbar {
          flex: 0 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          padding: 8px 8px 0;
          border-top: 1px solid var(--border);
          background: color-mix(in oklch, var(--surface) 92%, transparent);
          backdrop-filter: blur(20px);
        }
        .tab {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          padding: 8px 0;
          color: var(--muted);
          font-size: 10px;
          letter-spacing: 0.02em;
          cursor: pointer;
        }
        .tab.active {
          color: var(--accent);
        }
        .tab svg {
          width: 22px;
          height: 22px;
          stroke: currentColor;
          fill: none;
          stroke-width: 1.7;
        }
        .tab.active svg {
          stroke-width: 2;
        }
      `}</style>
    </nav>
  )
}
