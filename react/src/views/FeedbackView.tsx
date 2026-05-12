import { useNavigate } from 'react-router-dom'
import ScreenView from '../components/layout/ScreenView'

export default function FeedbackView() {
  const navigate = useNavigate()

  return (
    <ScreenView>
      <div className="pad">
        <p>Feedback View (React) — 参考 Vue 端 FeedbackView.vue 实现</p>
        <button onClick={() => navigate('/home')}>回到首页</button>
      </div>
    </ScreenView>
  )
}
