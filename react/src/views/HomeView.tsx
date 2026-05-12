import { useNavigate } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout'

export default function HomeView() {
  const navigate = useNavigate()

  return (
    <AppLayout>
      <div className="pad">
        <p>Home View (React) — 参考 Vue 端 HomeView.vue 实现</p>
        <button onClick={() => navigate('/jobs')}>开始新面试</button>
      </div>
    </AppLayout>
  )
}
