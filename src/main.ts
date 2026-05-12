import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './styles/index.css'

// Views
import SplashView from './views/SplashView.vue'
import Onboarding1View from './views/Onboarding1View.vue'
import Onboarding2View from './views/Onboarding2View.vue'
import LoginView from './views/LoginView.vue'
import HomeView from './views/HomeView.vue'
import JobsView from './views/JobsView.vue'
import SetupView from './views/SetupView.vue'
import InterviewView from './views/InterviewView.vue'
import FeedbackView from './views/FeedbackView.vue'
import HistoryView from './views/HistoryView.vue'
import ProfileView from './views/ProfileView.vue'

const routes = [
  { path: '/', name: 'Splash', component: SplashView },
  { path: '/onboarding-1', name: 'Onboarding1', component: Onboarding1View },
  { path: '/onboarding-2', name: 'Onboarding2', component: Onboarding2View },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/home', name: 'Home', component: HomeView },
  { path: '/jobs', name: 'Jobs', component: JobsView },
  { path: '/setup', name: 'Setup', component: SetupView },
  { path: '/interview', name: 'Interview', component: InterviewView },
  { path: '/feedback', name: 'Feedback', component: FeedbackView },
  { path: '/history', name: 'History', component: HistoryView },
  { path: '/profile', name: 'Profile', component: ProfileView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
