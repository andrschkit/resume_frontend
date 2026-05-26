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

    <nav v-if="isMobile" class="mobile-navigation">
      <button
        v-for="item in menu"
        :key="item.route"
        type="button"
        class="mobile-nav-btn"
        :class="{ 'mobile-nav-btn--active': item.route === activeSection }"
        @click="$emit('scroll-to', item.route)"
      >
        <img
          alt=""
          class="mobile-menu-icon"
          :class="darkMode ? 'menu-icon-light' : 'menu-icon-dark'"
          :src="item.icon"
        >
        <span>{{ item.title }}</span>
      </button>

      <button type="button" class="mobile-nav-btn" @click="toggleDarkMode">
        <img alt="" class="mode-icon" :src="darkMode ? sun : moon">
        <span>{{ darkMode ? 'Светлая' : 'Тёмная' }}</span>
      </button>
    </nav>
  </div>
</template>

<script setup>
  import { computed, onMounted, onUnmounted, ref } from 'vue'
  import { applyTheme, getInitialTheme, isDarkTheme } from '@/plugins/theme'
  import MdiIcon from '@/components/MdiIcon.vue'
  import moon from '@/assets/moon-svgrepo.svg'
  import sun from '@/assets/sun-svgrepo.svg'

  const rail = ref(true)
  const darkMode = ref(false)
  const isMobile = ref(false)
  const collapsedWidth = 80
  const expandedWidth = 240

  const checkMobile = () => {
    isMobile.value = window.innerWidth < 960
  }

  defineProps({
    menu: {
      type: Array,
      required: true,
    },
    activeSection: {
      type: String,
      required: true,
    },
  })
  defineEmits(['scroll-to'])

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

  onMounted(() => {
    checkMobile()
    window.addEventListener('resize', checkMobile)

    const savedRail = localStorage.getItem('navigationRail')
    if (savedRail !== null) {
      rail.value = savedRail === 'true'
    }

    setTheme(getInitialTheme())
  })

  onUnmounted(() => {
    window.removeEventListener('resize', checkMobile)
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
  padding-bottom: 70px;
  min-height: 100vh;
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
  overflow-y: auto;
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

.mobile-navigation {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  overflow-x: auto;
  background: rgba(var(--v-theme-background), 0.95);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(var(--v-theme-border), 0.3);
  min-height: 56px;
}

.mobile-nav-btn {
  flex: 1 0 auto;
  min-width: 72px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 8px 6px;
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 0.7rem;
  color: rgba(var(--v-theme-on-background), 0.8);
}

.mobile-nav-btn--active {
  color: rgb(var(--v-theme-primary));
}

.mobile-menu-icon {
  width: 24px;
  height: 24px;
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
