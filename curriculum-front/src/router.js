import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import DisplayCurriculum from './views/DisplayCurriculum.vue'
import UpsertCurriculum from './views/UpsertCurriculum.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/curriculum',
      name: 'curriculum',
      component: DisplayCurriculum
    },
    {
      path: '/curriculum/upsert',
      name: 'upsert',
      component: UpsertCurriculum
    }
  ]
})
