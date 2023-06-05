import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AirPollution from '../views/AirPollution.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/air-pollution',
      name: 'air-pollution',
      component: AirPollution
    },
  ]
})

export default router
