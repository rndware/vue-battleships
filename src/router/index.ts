import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import IntroView from '@/views/IntroView.vue'

const isProd = import.meta.env.MODE === 'production'

// use hash history in production for gh-pages compatibility
const router = createRouter({
  history: isProd
    ? createWebHashHistory(import.meta.env.BASE_URL)
    : createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'intro',
      component: IntroView, // Eagerly loaded
    },
    {
      path: '/game',
      name: 'game',
      component: () => import('../views/GameView.vue'),
    },
    {
      path: '/error',
      name: 'error',
      component: () => import('../views/ErrorView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
    },
  ],
})

export default router
