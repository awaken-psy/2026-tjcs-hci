import { useNavigate } from 'react-router-dom'

export default function InterviewView() {
  const navigate = useNavigate()

  return (
    <div className="pad">
      <p>Interview View (React) — 参考 Vue 端 InterviewView.vue 实现</p>
      <button onClick={() => navigate('/feedback')}>结束面试</button>
    </div>
  )
}
