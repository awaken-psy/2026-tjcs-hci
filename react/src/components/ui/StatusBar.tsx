export default function StatusBar() {
  return (
    <div className="statusbar">
      <span className="num">9:41</span>
      <span className="right">
        <svg viewBox="0 0 17 11" aria-hidden="true">
          <rect x="0"  y="7" width="3" height="4" rx="0.6" />
          <rect x="4"  y="5" width="3" height="6" rx="0.6" />
          <rect x="8"  y="3" width="3" height="8" rx="0.6" />
          <rect x="12" y="0" width="3" height="11" rx="0.6" />
        </svg>
        <svg viewBox="0 0 17 11" aria-hidden="true">
          <path d="M8.5 1.5C5.5 1.5 2.7 2.6 0.5 4.6L2 6.1C3.8 4.5 6.1 3.6 8.5 3.6c2.4 0 4.7 0.9 6.5 2.5l1.5-1.5c-2.2-2-5-3.1-8-3.1zM3.5 7.6L5 9.1c1-0.9 2.2-1.4 3.5-1.4 1.3 0 2.5 0.5 3.5 1.4l1.5-1.5c-1.4-1.3-3.1-2-5-2-1.9 0-3.6 0.7-5 2zM6.5 10.6l2 2 2-2c-0.5-0.5-1.2-0.8-2-0.8s-1.5 0.3-2 0.8z" />
        </svg>
        <svg className="battery" viewBox="0 0 25 11" aria-hidden="true">
          <rect x="0.5" y="0.5" width="21" height="10" rx="2.5" fill="none" stroke="currentColor" strokeOpacity="0.45" />
          <rect x="22" y="3.5" width="1.5" height="4" rx="0.4" fill="currentColor" fillOpacity="0.45" />
          <rect x="2" y="2" width="18" height="7" rx="1.4" />
        </svg>
      </span>

      <style jsx>{`
        .statusbar {
          flex: 0 0 47px;
          padding: 18px 26px 0;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 600;
          color: var(--fg);
          letter-spacing: -0.01em;
        }
        .right {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .battery {
          width: 25px;
        }
      `}</style>
    </div>
  )
}
