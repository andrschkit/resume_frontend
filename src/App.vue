<template>
  <div class="app-root">
    <MenuComponent :active-section="activeSection" :menu="menuItems" @scroll-to="scrollTo">
      <template #content>
        <main class="app-main">
          <section
            v-for="(item, index) in menuItems"
            :id="item.route"
            :key="index"
            class="page-section"
          >
            <component :is="getComponent(item.route)" />
          </section>
        </main>
      </template>
    </MenuComponent>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

import About from '@/pages/About.vue'
import Education from '@/pages/Education.vue'
import Career from '@/pages/Career.vue'
import Portfolio from '@/pages/Portfolio.vue'
import Skills from '@/pages/Skills.vue'
import Contacts from '@/pages/Contacts.vue'
import Tools from '@/pages/Tools.vue'

import MenuComponent from '@/components/MenuComponent.vue'

import addressCard from '@/assets/address-card.svg'
import educationIcon from '@/assets/graduation-hat-alt.svg'
import careerIcon from '@/assets/career.svg'
import portfolioIcon from '@/assets/folder-user.svg'
import skillsIcon from '@/assets/skills.svg'
import contactsIcon from '@/assets/pen.svg'
import toolsIcon from '@/assets/tools.svg'

const BASE_PATH = '/resume'
const DEFAULT_SECTION = 'about'
const activeSection = ref('')
const scrollTimeout = ref(null)
const isProgrammaticScroll = ref(false)

const sectionUrl = (id) => `${BASE_PATH}#${id}`

const menuItems = ref([
  { route: 'about', title: 'Обо мне', icon: addressCard },
  { route: 'education', title: 'Образование', icon: educationIcon },
  { route: 'career', title: 'Карьера', icon: careerIcon },
  { route: 'portfolio', title: 'Портфолио', icon: portfolioIcon },
  { route: 'skills', title: 'Навыки', icon: skillsIcon },
  { route: 'contacts', title: 'Контакты', icon: contactsIcon },
  { route: 'tools', title: 'Инструменты', icon: toolsIcon },
])

const getComponent = (routeName) => {
  switch (routeName) {
    case 'about':
      return About
    case 'education':
      return Education
    case 'career':
      return Career
    case 'portfolio':
      return Portfolio
    case 'skills':
      return Skills
    case 'contacts':
      return Contacts
    case 'tools':
      return Tools
    default:
      return null
  }
}

const updateActiveSection = () => {
  clearTimeout(scrollTimeout.value)
  scrollTimeout.value = setTimeout(() => {
    const sections = menuItems.value.map((item) => document.getElementById(item.route))
    const scrollPosition = window.scrollY + 600

    for (const section of sections) {
      if (!section) continue
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        if (activeSection.value !== section.id) {
          activeSection.value = section.id
          if (
            !isProgrammaticScroll.value &&
            location.pathname + location.hash !== sectionUrl(section.id)
          ) {
            history.replaceState(null, '', sectionUrl(section.id))
          }
        }
        break
      }
    }
  }, 5)
}

const scrollToElement = (id, behavior = 'smooth') => {
  const element = document.getElementById(id)
  if (!element) return

  const y = element.getBoundingClientRect().top + window.pageYOffset
  window.scrollTo({ top: y, behavior })
}

const scrollTo = (id) => {
  isProgrammaticScroll.value = true
  history.pushState(null, '', sectionUrl(id))
  activeSection.value = id
  scrollToElement(id)
  setTimeout(() => {
    isProgrammaticScroll.value = false
  }, 800)
}

const onPopState = () => {
  const id = location.hash.slice(1) || DEFAULT_SECTION

  isProgrammaticScroll.value = true
  activeSection.value = id
  scrollToElement(id, 'auto')
  setTimeout(() => {
    isProgrammaticScroll.value = false
  }, 50)
}

onMounted(() => {
  const initialId = location.hash.slice(1) || DEFAULT_SECTION
  activeSection.value = initialId
  history.replaceState(null, '', sectionUrl(initialId))

  requestAnimationFrame(() => scrollToElement(initialId, 'auto'))

  window.addEventListener('popstate', onPopState)
  window.addEventListener('scroll', updateActiveSection)
  updateActiveSection()
})

onBeforeUnmount(() => {
  window.removeEventListener('popstate', onPopState)
  window.removeEventListener('scroll', updateActiveSection)
  clearTimeout(scrollTimeout.value)
})
</script>

<style scoped>
.app-root {
  min-height: 100vh;
}

.app-main {
  min-height: 100vh;
}

.page-section {
  padding: 24px;
  border-bottom: 1px solid rgba(var(--v-theme-border), 0.4);
}

@media (max-width: 959px) {
  .page-section {
    padding: var(--page-mobile-gutter, 0.9rem);
  }
}
</style>
