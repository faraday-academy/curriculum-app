import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import DisplayCurricula from './views/DisplayCurricula.vue'
import DisplayCurriculum from './views/DisplayCurriculum.vue'
import CreateCurriculum from './views/CreateCurriculum.vue'
import Login from './views/auth/Login.vue'
import Register from './views/auth/Register.vue'
import Settings from './views/Settings.vue'

Vue.use(Router)

export default new Router({
  routes: [
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
})
