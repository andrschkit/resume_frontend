import { createRouter, createWebHistory } from 'vue-router'
import About from '@/pages/About.vue'
import E404 from '@/pages/E404.vue'

const routes = [
  {
    path: '/',
    redirect: to => ({
      path: '/resume',
      hash: to.hash || '#about',
    }),
  },
  {
    name: 'resume',
    path: '/resume',
    component: About,
  },
  {
    name: 'error',
    path: '/:pathMatch(.*)*',
    component: E404,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('app:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('app:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('app:dynamic-reload')
})

export default router
