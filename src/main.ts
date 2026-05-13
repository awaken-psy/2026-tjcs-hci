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
import SmsCodeView from './views/SmsCodeView.vue'
import NotificationsView from './views/NotificationsView.vue'
import ResumeView from './views/ResumeView.vue'
import GrowthView from './views/GrowthView.vue'
import SettingsView from './views/SettingsView.vue'
import AboutView from './views/AboutView.vue'
import JobDetailView from './views/JobDetailView.vue'
import PreInterviewView from './views/PreInterviewView.vue'
import DetailedFeedbackView from './views/DetailedFeedbackView.vue'
import BookmarkView from './views/BookmarkView.vue'
import QuestionDetailView from './views/QuestionDetailView.vue'
import ResumeEditView from './views/ResumeEditView.vue'
import StudyPlanView from './views/StudyPlanView.vue'
import LeaderboardView from './views/LeaderboardView.vue'
import CommunityView from './views/CommunityView.vue'
import PostExperienceView from './views/PostExperienceView.vue'
import ExperienceDetailView from './views/ExperienceDetailView.vue'

const routes = [
  { path: '/', name: 'Splash', component: SplashView },
  { path: '/onboarding-1', name: 'Onboarding1', component: Onboarding1View },
  { path: '/onboarding-2', name: 'Onboarding2', component: Onboarding2View },
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/sms-code', name: 'SmsCode', component: SmsCodeView },
  { path: '/home', name: 'Home', component: HomeView },
  { path: '/notifications', name: 'Notifications', component: NotificationsView },
  { path: '/jobs', name: 'Jobs', component: JobsView },
  { path: '/setup', name: 'Setup', component: SetupView },
  { path: '/interview', name: 'Interview', component: InterviewView },
  { path: '/feedback', name: 'Feedback', component: FeedbackView },
  { path: '/history', name: 'History', component: HistoryView },
  { path: '/profile', name: 'Profile', component: ProfileView },
  { path: '/resume', name: 'Resume', component: ResumeView },
  { path: '/growth', name: 'Growth', component: GrowthView },
  { path: '/settings', name: 'Settings', component: SettingsView },
  { path: '/about', name: 'About', component: AboutView },
  { path: '/job-detail', name: 'JobDetail', component: JobDetailView },
  { path: '/pre-interview', name: 'PreInterview', component: PreInterviewView },
  { path: '/detailed-feedback', name: 'DetailedFeedback', component: DetailedFeedbackView },
  { path: '/bookmarks', name: 'Bookmarks', component: BookmarkView },
  { path: '/question-detail/:id', name: 'QuestionDetail', component: QuestionDetailView },
  { path: '/resume/edit', name: 'ResumeEdit', component: ResumeEditView },
  { path: '/study-plan', name: 'StudyPlan', component: StudyPlanView },
  { path: '/leaderboard', name: 'Leaderboard', component: LeaderboardView },
  { path: '/community', name: 'Community', component: CommunityView },
  { path: '/post-experience', name: 'PostExperience', component: PostExperienceView },
  { path: '/community/:id', name: 'ExperienceDetail', component: ExperienceDetailView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
