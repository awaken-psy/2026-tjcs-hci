import { useNavigate } from 'react-router-dom'
import ScreenView from '../components/layout/ScreenView'

export default function Onboarding1View() {
  const navigate = useNavigate()

  return (
    <ScreenView>
      <div className="pad">
        <p>Onboarding 1 View (React) — 参考 Vue 端 Onboarding1View.vue 实现</p>
        <button onClick={() => navigate('/onboarding-2')}>下一步</button>
      </div>
    </ScreenView>
  )
}
