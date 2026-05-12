import { Routes, Route } from 'react-router-dom'
import SplashView from './views/SplashView'
import Onboarding1View from './views/Onboarding1View'
import Onboarding2View from './views/Onboarding2View'
import LoginView from './views/LoginView'
import HomeView from './views/HomeView'
import JobsView from './views/JobsView'
import SetupView from './views/SetupView'
import InterviewView from './views/InterviewView'
import FeedbackView from './views/FeedbackView'
import HistoryView from './views/HistoryView'
import ProfileView from './views/ProfileView'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SplashView />} />
      <Route path="/onboarding-1" element={<Onboarding1View />} />
      <Route path="/onboarding-2" element={<Onboarding2View />} />
      <Route path="/login" element={<LoginView />} />
      <Route path="/home" element={<HomeView />} />
      <Route path="/jobs" element={<JobsView />} />
      <Route path="/setup" element={<SetupView />} />
      <Route path="/interview" element={<InterviewView />} />
      <Route path="/feedback" element={<FeedbackView />} />
      <Route path="/history" element={<HistoryView />} />
      <Route path="/profile" element={<ProfileView />} />
    </Routes>
  )
}
