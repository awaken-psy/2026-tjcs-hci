import { useNavigate } from 'react-router-dom'
import ScreenView from '../components/layout/ScreenView'

export default function SplashView() {
  const navigate = useNavigate()

  return (
    <ScreenView>
      <div className="splash-wrap" onClick={() => navigate('/onboarding-1')}>
        <div className="splash-logo">
          <svg viewBox="0 0 24 24" className="logo-icon">
            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
            <line x1="12" y1="19" x2="12" y2="22" />
          </svg>
        </div>
        <h1 className="splash-title">智能面试官</h1>
        <p className="splash-sub">AI 模拟面试陪练助手<br />让每一次练习都算数</p>
        <p className="meta hint">点击任意处开始 →</p>
      </div>

      <style jsx>{`
        .splash-wrap {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 24px;
          padding: 40px 32px;
          text-align: center;
        }
        .splash-logo {
          width: 88px;
          height: 88px;
          border-radius: 24px;
          background: var(--accent);
          display: grid;
          place-items: center;
          color: #fff;
        }
        .logo-icon {
          width: 44px;
          height: 44px;
          stroke: currentColor;
          fill: none;
          stroke-width: 1.8;
        }
        .splash-title {
          font-family: var(--font-display);
          font-size: 28px;
          font-weight: 700;
          letter-spacing: -0.02em;
          margin: 0;
        }
        .splash-sub {
          font-size: 14px;
          color: var(--muted);
          line-height: 1.5;
          margin: 0;
          max-width: 24ch;
        }
        .meta {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--muted);
        }
        .hint {
          margin-top: auto;
          padding-top: 40px;
        }
      `}</style>
    </ScreenView>
  )
}
