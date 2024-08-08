import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// router.afterEach((to, from) => {
//   // turn off spinner
//   mutations.updateLoadingStatus(state, false)
// })

export default router
