import { createRouter, createWebHistory } from 'vue-router'
import About from '@/pages/About.vue'
import Career from '@/pages//Career.vue'
import Contacts from '@/pages/Contacts.vue';
import Education from '@/pages/Education.vue';
import Portfolio from '@/pages/Portfolio.vue';
import Skills from '@/pages/Skills.vue';
import E404 from '@/pages/E404.vue';

const routes = [
  { path: '/', redirect: { name: 'about' } },
  {
    name: 'about',
    path: '/about',
    component: About,
  },
  {
    name: 'career',
    path: '/career',
    component: Career,
  },
  {
    name: 'contacts',
    path: '/contacts',
    component: Contacts,
  },
  {
    name: 'education',
    path: '/education',
    component: Education,
  },
  {
    name: 'portfolio',
    path: '/portfolio',
    component: Portfolio,
  },
  {
    name: 'skills',
    path: '/skills',
    component: Skills,
  },
  {
    name: 'error',
    path: '/:any(.*)',
    component: E404,
  },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
