import Home from '@/views/Home.vue'
import DisplayCurricula from '@/views/DisplayCurricula.vue'
import DisplayCurriculum from '@/views/DisplayCurriculum.vue'
import CreateCurriculum from '@/views/CreateCurriculum.vue'
import Login from '@/views/auth/Login.vue'
import Register from '@/views/auth/Register.vue'
import ForgotPassword from '@/views/auth/ForgotPassword.vue'
import ResetPassword from '@/views/auth/ResetPassword.vue'
import Verify from '@/views/auth/Verify.vue'
import Settings from '@/views/Settings.vue'

export default [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: ForgotPassword
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: ResetPassword
  },
  {
    path: '/verify',
    name: 'verify',
    component: Verify
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings
  },
  {
    path: '/curricula',
    name: 'curricula',
    component: DisplayCurricula
  },
  {
    path: '/curricula/create',
    name: 'create',
    component: CreateCurriculum
  },
  {
    path: '/curricula/:id',
    name: 'curriculum',
    component: DisplayCurriculum
  }
]
