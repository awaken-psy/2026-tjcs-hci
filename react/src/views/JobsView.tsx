import { useNavigate } from 'react-router-dom'
import ScreenView from '../components/layout/ScreenView'

export default function JobsView() {
  const navigate = useNavigate()

  return (
    <ScreenView>
      <div className="pad">
        <p>Jobs View (React) — 参考 Vue 端 JobsView.vue 实现</p>
        <button onClick={() => navigate('/setup')}>确认选择</button>
      </div>
    </ScreenView>
  )
}
