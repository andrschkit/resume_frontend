<template>
  <div
    class="layout-wrapper"
    :style="{ '--nav-width': isMobile ? '0px' : `${currentWidth}px` }"
  >
    <aside
      v-if="!isMobile"
      class="side-nav custom-navigation"
      :class="{ collapsed: rail }"
      :style="{ width: `${currentWidth}px` }"
    >
      <div class="user-data" :style="rail ? 'height:10vh' : 'height:21vh'">
        <div class="avatar" :class="{ 'avatar--small': rail }">
          <img alt="Avatar" src="@/assets/avatar.jpg">
        </div>

        <transition name="fade">
          <div v-if="!rail" class="user-titles">
            <p class="username">Щербаков Андрей</p>
            <p class="user-role">Руководитель IT-проектов</p>
          </div>
        </transition>
      </div>

      <hr class="divider">

      <nav class="menu-list">
        <button
          v-for="item in menu"
          :key="item.route"
          type="button"
          class="menu-item"
          :class="{ 'active-menu-item': item.route === activeSection }"
          @click="$emit('scroll-to', item.route)"
        >
          <span class="menu-icon-wrap">
            <img
              alt=""
              class="menu-icon"
              :class="darkMode ? 'menu-icon-light' : 'menu-icon-dark'"
              :src="item.icon"
            >
          </span>

          <transition name="fade">
            <span v-if="!rail" class="menu-title">{{ item.title }}</span>
          </transition>
        </button>
      </nav>

      <button type="button" class="toggle-button" aria-label="Свернуть меню" @click="toggleRail">
        <MdiIcon :icon="rail ? 'mdi-chevron-right' : 'mdi-chevron-left'" />
      </button>

      <div class="mode-toggle" :class="!rail ? 'mode-toggle-expand' : 'mode-toggle-collapse'">
        <button
          type="button"
          class="theme-toggle"
          :aria-label="darkMode ? 'Светлая тема' : 'Тёмная тема'"
          @click="toggleDarkMode"
        >
          <span class="theme-toggle-track" :class="{ 'theme-toggle-track--on': darkMode }">
            <span class="theme-toggle-thumb" />
          </span>
        </button>
        <img alt="" class="mode-icon" :src="darkMode ? sun : moon">
      </div>
    </aside>

    <div :class="{ 'content-desktop': !isMobile, 'content-mobile': isMobile }">
      <slot name="content" />
    </div>

    <template v-if="isMobile">
      <header class="mobile-header">
        <button
          ref="mobileMenuToggleRef"
          type="button"
          class="mobile-header-btn"
          :aria-expanded="mobileMenuOpen"
          aria-controls="mobile-drawer"
          :aria-label="mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'"
          @click="toggleMobileMenu"
        >
          <MdiIcon :icon="mobileMenuOpen ? 'mdi-close' : 'mdi-menu'" />
        </button>

        <p class="mobile-header-title">{{ activeMenuTitle }}</p>

        <button
          type="button"
          class="mobile-header-btn mobile-header-btn--theme"
          :aria-label="darkMode ? 'Светлая тема' : 'Тёмная тема'"
          @click="toggleDarkMode"
        >
          <img alt="" class="mode-icon mode-icon--compact" :src="darkMode ? sun : moon">
        </button>
      </header>

      <transition name="drawer-backdrop">
        <button
          v-if="mobileMenuOpen"
          type="button"
          class="mobile-drawer-backdrop"
          aria-label="Закрыть меню"
          @click="closeMobileMenu"
        />
      </transition>

      <nav
        id="mobile-drawer"
        ref="mobileDrawerRef"
        class="mobile-drawer"
        :class="{ 'mobile-drawer--open': mobileMenuOpen }"
        role="dialog"
        aria-label="Навигация по разделам"
        :aria-modal="mobileMenuOpen ? 'true' : undefined"
        :inert="!mobileMenuOpen"
      >
        <div class="mobile-drawer-user">
          <div class="mobile-drawer-avatar">
            <img alt="Avatar" src="@/assets/avatar.jpg">
          </div>
          <div>
            <p class="mobile-drawer-name">Щербаков Андрей</p>
            <p class="mobile-drawer-role">Руководитель IT-проектов</p>
          </div>
        </div>

        <hr class="divider mobile-drawer-divider">

        <div class="mobile-drawer-menu">
          <button
            v-for="item in menu"
            :key="item.route"
            type="button"
            class="mobile-drawer-item"
            :class="{ 'mobile-drawer-item--active': item.route === activeSection }"
            @click="onMobileNavClick(item.route)"
          >
            <span class="menu-icon-wrap">
              <img
                alt=""
                class="menu-icon menu-icon--mobile"
                :class="darkMode ? 'menu-icon-light' : 'menu-icon-dark'"
                :src="item.icon"
              >
            </span>
            <span class="mobile-drawer-item-title">{{ item.title }}</span>
          </button>
        </div>
      </nav>
    </template>
  </div>
</template>

<script setup>
  import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
  import { applyTheme, getInitialTheme, isDarkTheme } from '@/plugins/theme'
  import MdiIcon from '@/components/MdiIcon.vue'
  import moon from '@/assets/moon-svgrepo.svg'
  import sun from '@/assets/sun-svgrepo.svg'

  const rail = ref(true)
  const darkMode = ref(false)
  const isMobile = ref(false)
  const mobileMenuOpen = ref(false)
  const mobileMenuToggleRef = ref(null)
  const mobileDrawerRef = ref(null)
  const collapsedWidth = 80
  const expandedWidth = 240

  const props = defineProps({
    menu: {
      type: Array,
      required: true,
    },
    activeSection: {
      type: String,
      required: true,
    },
  })
  const emit = defineEmits(['scroll-to'])

  const checkMobile = () => {
    const wasMobile = isMobile.value
    isMobile.value = window.innerWidth < 960

    if (wasMobile && !isMobile.value) {
      closeMobileMenu()
    }
  }

  const activeMenuTitle = computed(() => {
    const active = props.menu.find(item => item.route === props.activeSection)
    return active?.title ?? 'Резюме'
  })

  const currentWidth = computed(() => (rail.value ? collapsedWidth : expandedWidth))

  const toggleRail = () => {
    rail.value = !rail.value
    localStorage.setItem('navigationRail', String(rail.value))
  }

  const setTheme = themeName => {
    applyTheme(themeName)
    darkMode.value = isDarkTheme(themeName)
    localStorage.setItem('theme', themeName)
  }

  const toggleDarkMode = () => {
    setTheme(darkMode.value ? 'customLightTheme' : 'customDarkTheme')
  }

  const setBodyScrollLock = locked => {
    document.body.style.overflow = locked ? 'hidden' : ''
  }

  const closeMobileMenu = () => {
    if (!mobileMenuOpen.value) return

    mobileMenuToggleRef.value?.focus()
    mobileMenuOpen.value = false
    setBodyScrollLock(false)
  }

  const openMobileMenu = async () => {
    mobileMenuOpen.value = true
    setBodyScrollLock(true)

    await nextTick()

    const activeItem = mobileDrawerRef.value?.querySelector('.mobile-drawer-item--active')
    const firstItem = mobileDrawerRef.value?.querySelector('.mobile-drawer-item')
    ;(activeItem ?? firstItem)?.focus()
  }

  const toggleMobileMenu = () => {
    if (mobileMenuOpen.value) {
      closeMobileMenu()
    } else {
      openMobileMenu()
    }
  }

  const onMobileNavClick = route => {
    emit('scroll-to', route)
    closeMobileMenu()
  }

  const onEscapeKey = event => {
    if (event.key === 'Escape' && mobileMenuOpen.value) {
      closeMobileMenu()
    }
  }

  onMounted(() => {
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const savedRail = localStorage.getItem('navigationRail')
    if (savedRail !== null) {
      rail.value = savedRail === 'true'
    }

    setTheme(getInitialTheme())
    window.addEventListener('keydown', onEscapeKey)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', checkMobile)
    window.removeEventListener('keydown', onEscapeKey)
    setBodyScrollLock(false)
  })
</script>

<style scoped>
.layout-wrapper {
  position: relative;
  min-height: 100vh;
}

.side-nav {
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  z-index: 100;
  display: flex;
  flex-direction: column;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-right: 1px solid rgba(var(--v-theme-border), 0.3);
  background: rgba(var(--v-theme-background), 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.content-desktop {
  margin-left: var(--nav-width, 80px);
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 100vh;
}

.content-mobile {
  --page-mobile-gutter: 0.9rem;
  padding-top: 52px;
  min-height: 100vh;
  font-size: 0.9375rem;
}

.content-mobile :deep(.page-section) {
  padding: var(--page-mobile-gutter);
}

.content-mobile :deep(.page-section > [class$="-container"]) {
  padding: 0;
}

.content-mobile :deep(.page-header) {
  margin-bottom: 1.25rem;
  padding: 0.75rem 0 1rem;
}

.content-mobile :deep(.page-header__title) {
  font-size: clamp(1.45rem, 5vw, 1.7rem);
}

.content-mobile :deep(.page-header__subtitle) {
  font-size: 0.9rem;
  line-height: 1.5;
}

.content-mobile :deep(.page-header--hero .page-header__title) {
  font-size: clamp(1.75rem, 8vw, 2.5rem);
}

.content-mobile :deep(.page-header--hero .page-header__subtitle) {
  font-size: clamp(1rem, 3.5vw, 1.2rem);
}

.user-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  transition: all 0.3s ease;
  overflow: hidden;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  margin-bottom: 15px;
  border: 5px solid rgba(var(--v-theme-primary), 0.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.avatar--small {
  width: 70px;
  height: 70px;
}

.avatar:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.avatar img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.user-titles {
  text-align: center;
}

.username {
  white-space: nowrap;
  font-size: 1.4rem;
  font-weight: 600;
  color: rgba(var(--v-theme-on-background), 0.9);
  margin: 0;
}

.user-role {
  margin: 0.35rem 0 0;
  font-size: 0.8rem;
  font-weight: 400;
  line-height: 1.3;
  color: rgba(var(--v-theme-on-background), 0.65);
  max-width: 200px;
}

.divider {
  margin: 15px 16px;
  border: none;
  border-top: 1px solid rgba(var(--v-theme-border), 0.3);
}

.menu-list {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 5px 12px;
  flex: 1;
  overflow: hidden;
}

.menu-item {
  width: 100%;
  border: none;
  background: transparent;
  border-radius: 12px;
  margin: 8px 0;
  transition: all 0.3s ease;
  min-height: 50px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 16px;
  cursor: pointer;
  text-align: left;
  font: inherit;
}

.menu-item:hover {
  background-color: rgba(var(--v-theme-primary), 0.05);
  transform: translateX(5px);
}

.menu-icon-wrap {
  display: inline-flex;
  flex-shrink: 0;
}

.menu-icon {
  width: 26px;
  height: 26px;
  transition: all 0.3s ease;
}

.menu-icon-dark {
  filter: brightness(0);
}

.menu-icon-light {
  filter: brightness(0) invert(1);
}

.menu-title {
  white-space: nowrap;
  font-size: 1.1rem;
  font-weight: 500;
  color: rgba(var(--v-theme-on-background), 0.8);
}

.active-menu-item {
  background-color: rgba(var(--v-theme-primary), 0.1);
}

.active-menu-item .menu-title {
  color: rgb(var(--v-theme-primary));
  font-weight: 600;
}

.toggle-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  padding: 10px;
  border: none;
  border-radius: 50%;
  transition: all 0.3s ease;
  background-color: rgba(var(--v-theme-primary), 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: rgb(var(--v-theme-primary));
}

.toggle-button:hover {
  background-color: rgba(var(--v-theme-primary), 0.2);
  transform: scale(1.1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.mode-toggle {
  transition: all 0.3s ease;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 12vh;
  padding: 8px;
  gap: 12px;
}

.mode-toggle-expand {
  flex-direction: row;
}

.mode-toggle-collapse {
  flex-direction: column;
  gap: 8px;
}

.theme-toggle {
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
}

.theme-toggle-track {
  display: block;
  width: 44px;
  height: 24px;
  border-radius: 12px;
  background: rgba(var(--v-theme-border), 0.5);
  position: relative;
  transition: background 0.2s ease;
}

.theme-toggle-track--on {
  background: rgba(var(--v-theme-primary), 0.6);
}

.theme-toggle-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #fff;
  transition: transform 0.2s ease;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}

.theme-toggle-track--on .theme-toggle-thumb {
  transform: translateX(20px);
}

.mode-icon {
  width: 28px;
  height: 28px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  transition: transform 0.3s ease;
}

.mode-icon:hover {
  transform: scale(1.1);
}

.mobile-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 110;
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 52px;
  padding: 0 8px 0 4px;
  background: rgba(var(--v-theme-background), 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(var(--v-theme-border), 0.3);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
}

.mobile-header-btn {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 10px;
  background: transparent;
  color: rgb(var(--v-theme-primary));
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.mobile-header-btn:hover,
.mobile-header-btn:focus-visible {
  background-color: rgba(var(--v-theme-primary), 0.08);
}

.mobile-header-title {
  flex: 1;
  min-width: 0;
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.2;
  color: rgba(var(--v-theme-on-background), 0.9);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mobile-header-btn--theme {
  margin-left: auto;
}

.mode-icon--compact {
  width: 22px;
  height: 22px;
}

.mobile-drawer-backdrop {
  position: fixed;
  inset: 0;
  z-index: 115;
  border: none;
  padding: 0;
  background: rgba(0, 0, 0, 0.45);
  cursor: pointer;
}

.drawer-backdrop-enter-active,
.drawer-backdrop-leave-active {
  transition: opacity 0.25s ease;
}

.drawer-backdrop-enter-from,
.drawer-backdrop-leave-to {
  opacity: 0;
}

.mobile-drawer {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 120;
  width: min(85vw, 300px);
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 12px 12px 24px;
  background: rgba(var(--v-theme-background), 0.98);
  backdrop-filter: blur(12px);
  border-right: 1px solid rgba(var(--v-theme-border), 0.3);
  box-shadow: 8px 0 24px rgba(0, 0, 0, 0.12);
  transform: translateX(-105%);
  transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.mobile-drawer--open {
  transform: translateX(0);
}

.mobile-drawer-user {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 4px 4px;
}

.mobile-drawer-avatar {
  width: 52px;
  height: 52px;
  flex-shrink: 0;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid rgba(var(--v-theme-primary), 0.12);
}

.mobile-drawer-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mobile-drawer-name {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.25;
  color: rgba(var(--v-theme-on-background), 0.9);
}

.mobile-drawer-role {
  margin: 4px 0 0;
  font-size: 0.75rem;
  line-height: 1.3;
  color: rgba(var(--v-theme-on-background), 0.65);
}

.mobile-drawer-divider {
  margin: 12px 0;
}

.mobile-drawer-menu {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.mobile-drawer-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 44px;
  padding: 0 12px;
  border: none;
  border-radius: 10px;
  background: transparent;
  cursor: pointer;
  text-align: left;
  font: inherit;
  transition: background-color 0.2s ease;
}

.mobile-drawer-item:hover,
.mobile-drawer-item:focus-visible {
  background-color: rgba(var(--v-theme-primary), 0.06);
}

.mobile-drawer-item--active {
  background-color: rgba(var(--v-theme-primary), 0.1);
}

.mobile-drawer-item-title {
  font-size: 0.95rem;
  font-weight: 500;
  color: rgba(var(--v-theme-on-background), 0.85);
}

.mobile-drawer-item--active .mobile-drawer-item-title {
  color: rgb(var(--v-theme-primary));
  font-weight: 600;
}

.menu-icon--mobile {
  width: 22px;
  height: 22px;
}

@media (max-width: 960px) {
  .side-nav {
    display: none;
  }
}

@media (max-width: 600px) {
  .avatar--small {
    width: 50px;
    height: 50px;
  }

  .menu-icon {
    width: 22px;
    height: 22px;
  }

  .menu-title {
    font-size: 1rem;
  }

  .toggle-button {
    width: 36px;
    height: 36px;
    padding: 8px;
    bottom: 15px;
    right: 15px;
  }
}
</style>
