<template>
  <div class="app-root">
    <MenuComponent
      :active-section="activeSection"
      :is-mobile="isMobile"
      :menu="menuItems"
      :mobile-groups="mobileNavGroups"
      @navigate="navigateTo"
    >
      <template #content>
        <main class="app-main">
          <template v-if="!isMobile">
            <section
              v-for="item in menuItems"
              :id="item.route"
              :key="item.route"
              class="page-section"
            >
              <component :is="getComponent(item.route)" />
            </section>
          </template>

          <transition v-else name="section-switch" mode="out-in">
            <section
              :id="activeSection"
              :key="activeSection"
              class="page-section page-section--solo"
            >
              <component :is="getComponent(activeSection)" />
            </section>
          </transition>
        </main>
      </template>
    </MenuComponent>
  </div>
</template>

<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

import About from '@/pages/About.vue'
import Education from '@/pages/Education.vue'
import Career from '@/pages/Career.vue'
import Portfolio from '@/pages/Portfolio.vue'
import Skills from '@/pages/Skills.vue'
import Contacts from '@/pages/Contacts.vue'
import Tools from '@/pages/Tools.vue'

import MenuComponent from '@/components/MenuComponent.vue'
import { useMobileLayout } from '@/composables/useMobileLayout'
import {
  DEFAULT_SECTION,
  MENU_ITEMS,
  MOBILE_NAV_GROUPS,
  resolveSectionId,
  sectionUrl,
} from '@/config/navigation'

const { isMobile } = useMobileLayout()

const menuItems = MENU_ITEMS
const mobileNavGroups = MOBILE_NAV_GROUPS
const activeSection = ref('')
const scrollTimeout = ref(null)
const isProgrammaticScroll = ref(false)

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
  if (isMobile.value) return

  clearTimeout(scrollTimeout.value)
  scrollTimeout.value = setTimeout(() => {
    const sections = menuItems.map((item) => document.getElementById(item.route))
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

const navigateTo = (id, { replace = false } = {}) => {
  const sectionId = resolveSectionId(id)

  isProgrammaticScroll.value = true
  activeSection.value = sectionId

  const url = sectionUrl(sectionId)
  if (replace) {
    history.replaceState(null, '', url)
  } else {
    history.pushState(null, '', url)
  }

  if (isMobile.value) {
    window.scrollTo({ top: 0, behavior: 'instant' })
    setTimeout(() => {
      isProgrammaticScroll.value = false
    }, 50)
    return
  }

  scrollToElement(sectionId)
  setTimeout(() => {
    isProgrammaticScroll.value = false
  }, 800)
}

const onPopState = () => {
  const id = resolveSectionId(location.hash.slice(1))

  isProgrammaticScroll.value = true
  activeSection.value = id

  if (isMobile.value) {
    window.scrollTo({ top: 0, behavior: 'instant' })
  } else {
    scrollToElement(id, 'auto')
  }

  setTimeout(() => {
    isProgrammaticScroll.value = false
  }, 50)
}

const syncScrollListener = () => {
  window.removeEventListener('scroll', updateActiveSection)

  if (!isMobile.value) {
    window.addEventListener('scroll', updateActiveSection)
    updateActiveSection()
  }
}

watch(isMobile, async (mobile, wasMobile) => {
  if (mobile === wasMobile) return

  if (mobile) {
    window.scrollTo({ top: 0, behavior: 'instant' })
  } else {
    await nextTick()
    scrollToElement(activeSection.value, 'auto')
  }

  syncScrollListener()
})

onMounted(() => {
  const initialId = resolveSectionId(location.hash.slice(1))
  activeSection.value = initialId
  history.replaceState(null, '', sectionUrl(initialId))

  if (isMobile.value) {
    window.scrollTo({ top: 0, behavior: 'instant' })
  } else {
    requestAnimationFrame(() => scrollToElement(initialId, 'auto'))
  }

  window.addEventListener('popstate', onPopState)
  syncScrollListener()
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

.page-section--solo {
  border-bottom: none;
  min-height: calc(100vh - var(--mobile-chrome-offset, 0px));
}

.section-switch-enter-active,
.section-switch-leave-active {
  transition: opacity 0.12s ease;
}

.section-switch-enter-from,
.section-switch-leave-to {
  opacity: 0;
}

@media (max-width: 959px) {
  .page-section {
    padding: var(--page-mobile-gutter, 0.9rem);
  }
}
</style>
