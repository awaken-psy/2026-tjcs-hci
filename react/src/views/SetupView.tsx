import { useNavigate } from 'react-router-dom'
import ScreenView from '../components/layout/ScreenView'

export default function SetupView() {
  const navigate = useNavigate()

  return (
    <ScreenView>
      <div className="pad">
        <p>Setup View (React) — 参考 Vue 端 SetupView.vue 实现</p>
        <button onClick={() => navigate('/interview')}>开始面试</button>
      </div>
    </ScreenView>
  )
}
