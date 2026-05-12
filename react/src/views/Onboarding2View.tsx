import { useNavigate } from 'react-router-dom'
import ScreenView from '../components/layout/ScreenView'

export default function Onboarding2View() {
  const navigate = useNavigate()

  return (
    <ScreenView>
      <div className="pad">
        <p>Onboarding 2 View (React) — 参考 Vue 端 Onboarding2View.vue 实现</p>
        <button onClick={() => navigate('/login')}>开始体验</button>
      </div>
    </ScreenView>
  )
}
