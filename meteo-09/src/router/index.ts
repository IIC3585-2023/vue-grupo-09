import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import AirPollution from '../views/AirPollution.vue'
// import Map from '../views/Map.vue'

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
    // {
    //   path: '/map',
    //   name: 'map',
    //   component: Map
    // },
  ]
})

export default router
