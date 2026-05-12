import { useNavigate } from 'react-router-dom'
import ScreenView from '../components/layout/ScreenView'

export default function LoginView() {
  const navigate = useNavigate()

  return (
    <ScreenView>
      <div className="pad">
        <p>Login View (React) — 参考 Vue 端 LoginView.vue 实现</p>
        <button onClick={() => navigate('/home')}>登录</button>
      </div>
    </ScreenView>
  )
}
