<template>
  <div class="layout-wrapper" :style="{ '--nav-width': isMobile ? '0px' : `${currentWidth}px` }">
    <aside
      v-if="!isMobile"
      class="side-nav custom-navigation"
      :class="{ collapsed: rail }"
      :style="{ width: `${currentWidth}px` }"
    >
      <div class="user-data" :class="{ 'user-data--rail': rail }">
        <div class="avatar" :class="{ 'avatar--small': rail }">
          <img alt="Avatar" src="@/assets/avatar.jpg" />
        </div>

        <transition name="fade">
          <div v-if="!rail" class="user-titles">
            <p class="username">Щербаков Андрей</p>
            <p class="user-role">Руководитель IT-проектов</p>
          </div>
        </transition>
      </div>

      <hr class="divider" />

      <nav class="menu-list">
        <button
          v-for="item in menu"
          :key="item.route"
          type="button"
          class="menu-item"
          :class="{ 'active-menu-item': item.route === activeSection }"
          @click="emit('navigate', item.route)"
        >
          <span class="menu-icon-wrap">
            <img
              alt=""
              class="menu-icon"
              :class="darkMode ? 'menu-icon-light' : 'menu-icon-dark'"
              :src="item.icon"
            />
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
        <MdiIcon
          class="mode-icon"
          :icon="darkMode ? 'mdi-weather-sunny' : 'mdi-weather-night'"
        />
      </div>
    </aside>

    <template v-if="isMobile">
      <header class="mobile-header">
        <p class="mobile-header-title">{{ activeMenuTitle }}</p>

        <button
          type="button"
          class="mobile-header-btn mobile-header-btn--theme"
          :aria-label="darkMode ? 'Светлая тема' : 'Тёмная тема'"
          @click="toggleDarkMode"
        >
          <MdiIcon
            class="mode-icon mode-icon--compact"
            :icon="darkMode ? 'mdi-weather-sunny' : 'mdi-weather-night'"
          />
        </button>
      </header>

      <nav
        v-if="showSubNav"
        class="mobile-subnav"
        aria-label="Подразделы"
        :style="{ top: 'var(--mobile-header-height)' }"
      >
        <button
          v-for="item in subNavItems"
          :key="item.route"
          type="button"
          class="mobile-subnav-item"
          :class="{ 'mobile-subnav-item--active': item.route === activeSection }"
          @click="emit('navigate', item.route)"
        >
          {{ item.title }}
        </button>
      </nav>

      <nav class="mobile-bottom-nav" aria-label="Основная навигация">
        <button
          v-for="group in mobileGroups"
          :key="group.id"
          type="button"
          class="mobile-bottom-nav-item"
          :class="{ 'mobile-bottom-nav-item--active': group.id === activeMobileGroup.id }"
          :aria-current="group.id === activeMobileGroup.id ? 'page' : undefined"
          @click="onBottomTabClick(group)"
        >
          <img
            alt=""
            class="mobile-bottom-nav-icon"
            :class="darkMode ? 'menu-icon-light' : 'menu-icon-dark'"
            :src="group.icon"
          />
          <span class="mobile-bottom-nav-label">{{ group.title }}</span>
        </button>
      </nav>
    </template>

    <div
      :class="{ 'content-desktop': !isMobile, 'content-mobile': isMobile }"
      :style="isMobile ? mobileContentVars : undefined"
    >
      <slot name="content" />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

import { getGroupForRoute } from '@/config/navigation'
import { applyTheme, getInitialTheme, isDarkTheme } from '@/plugins/theme'
import MdiIcon from '@/components/MdiIcon.vue'

const rail = ref(true)
const darkMode = ref(false)
const collapsedWidth = 80
const expandedWidth = 240

const props = defineProps({
  menu: {
    type: Array,
    required: true,
  },
  mobileGroups: {
    type: Array,
    required: true,
  },
  activeSection: {
    type: String,
    required: true,
  },
  isMobile: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['navigate'])

const activeMobileGroup = computed(() => getGroupForRoute(props.activeSection))

const subNavItems = computed(() =>
  props.menu.filter((item) => activeMobileGroup.value.routes.includes(item.route)),
)

const showSubNav = computed(() => props.isMobile && subNavItems.value.length > 1)

const activeMenuTitle = computed(() => {
  const active = props.menu.find((item) => item.route === props.activeSection)
  return active?.title ?? 'Резюме'
})

const mobileContentVars = computed(() => {
  const headerHeight = 'var(--mobile-header-height)'
  const subnavHeight = showSubNav.value ? 'var(--mobile-subnav-height)' : '0px'
  const bottomHeight = 'var(--mobile-bottom-nav-height)'

  return {
    '--mobile-subnav-offset': subnavHeight,
    '--mobile-chrome-offset': `calc(${headerHeight} + ${subnavHeight} + ${bottomHeight} + env(safe-area-inset-bottom, 0px))`,
    paddingTop: `calc(${headerHeight} + ${subnavHeight})`,
    paddingBottom: `calc(${bottomHeight} + env(safe-area-inset-bottom, 0px))`,
  }
})

const currentWidth = computed(() => (rail.value ? collapsedWidth : expandedWidth))

const onBottomTabClick = (group) => {
  emit('navigate', group.defaultRoute)
}

const toggleRail = () => {
  rail.value = !rail.value
  localStorage.setItem('navigationRail', String(rail.value))
}

const setTheme = (themeName) => {
  applyTheme(themeName)
  darkMode.value = isDarkTheme(themeName)
  localStorage.setItem('theme', themeName)
}

const toggleDarkMode = () => {
  setTheme(darkMode.value ? 'customLightTheme' : 'customDarkTheme')
}

onMounted(() => {
  const savedRail = localStorage.getItem('navigationRail')
  if (savedRail !== null) {
    rail.value = savedRail === 'true'
  }

  setTheme(getInitialTheme())
})
</script>

<style scoped>
.layout-wrapper {
  --mobile-header-height: 48px;
  --mobile-subnav-height: 44px;
  --mobile-bottom-nav-height: 60px;
  position: relative;
  min-height: 100vh;
}

.side-nav {
  --user-block-height: 22vh;
  --user-block-height-rail: 10vh;
  --user-data-min-height: 200px;
  --user-data-min-height-rail: 100px;
  --user-data-padding-top: 20px;
  --avatar-size: 130px;
  --avatar-size-rail: 70px;
  --avatar-border: 5px;
  --avatar-margin-bottom: 15px;
  --username-size: 1.4rem;
  --user-role-size: 0.8rem;
  --menu-item-min-height: 50px;
  --menu-item-margin: 8px;
  --menu-item-padding-x: 16px;
  --menu-item-gap: 12px;
  --menu-icon-size: 26px;
  --menu-title-size: 1.1rem;
  --divider-margin-y: 15px;
  --mode-toggle-bottom: 12vh;
  --menu-list-padding-bottom: calc(var(--mode-toggle-bottom) + var(--toggle-btn-size) + 12px);
  --toggle-btn-size: 40px;
  --toggle-btn-offset: 20px;
  --theme-track-width: 44px;
  --theme-track-height: 24px;
  --theme-thumb-size: 20px;
  --mode-icon-size: 28px;

  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  z-index: 100;
  display: flex;
  flex-direction: column;
  overflow: hidden;
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
  min-height: 100vh;
  font-size: 0.9375rem;
}

.content-mobile :deep(.page-section) {
  padding: var(--page-mobile-gutter);
}

.content-mobile :deep(.page-section > [class$='-container']) {
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
  flex-shrink: 0;
  padding-top: var(--user-data-padding-top);
  height: var(--user-block-height);
  min-height: var(--user-data-min-height);
  transition: all 0.3s ease;
  overflow: hidden;
}

.user-data--rail {
  height: var(--user-block-height-rail);
  min-height: var(--user-data-min-height-rail);
}

.avatar {
  width: var(--avatar-size);
  height: var(--avatar-size);
  min-width: var(--avatar-size);
  min-height: var(--avatar-size);
  border-radius: 50%;
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  margin-bottom: var(--avatar-margin-bottom);
  border: var(--avatar-border) solid rgba(var(--v-theme-primary), 0.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.avatar--small {
  width: var(--avatar-size-rail);
  height: var(--avatar-size-rail);
  min-width: var(--avatar-size-rail);
  min-height: var(--avatar-size-rail);
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
  font-size: var(--username-size);
  font-weight: 600;
  color: rgba(var(--v-theme-on-background), 0.9);
  margin: 0;
}

.user-role {
  margin: 0.35rem 0 0;
  font-size: var(--user-role-size);
  font-weight: 400;
  line-height: 1.3;
  color: rgba(var(--v-theme-on-background), 0.65);
  max-width: 200px;
}

.divider {
  flex-shrink: 0;
  margin: var(--divider-margin-y) 16px;
  border: none;
  border-top: 1px solid rgba(var(--v-theme-border), 0.3);
}

.menu-list {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 5px 12px var(--menu-list-padding-bottom);
  flex: 1;
  min-height: 0;
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-width: thin;
}

.menu-item {
  width: 100%;
  border: none;
  background: transparent;
  border-radius: 12px;
  margin: var(--menu-item-margin) 0;
  transition: all 0.3s ease;
  min-height: var(--menu-item-min-height);
  display: flex;
  align-items: center;
  gap: var(--menu-item-gap);
  padding: 0 var(--menu-item-padding-x);
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
  width: var(--menu-icon-size);
  height: var(--menu-icon-size);
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
  font-size: var(--menu-title-size);
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
  bottom: var(--toggle-btn-offset);
  right: var(--toggle-btn-offset);
  cursor: pointer;
  padding: 10px;
  border: none;
  border-radius: 50%;
  transition: all 0.3s ease;
  background-color: rgba(var(--v-theme-primary), 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--toggle-btn-size);
  height: var(--toggle-btn-size);
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
  bottom: var(--mode-toggle-bottom);
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
  width: var(--theme-track-width);
  height: var(--theme-track-height);
  border-radius: calc(var(--theme-track-height) / 2);
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
  width: var(--theme-thumb-size);
  height: var(--theme-thumb-size);
  border-radius: 50%;
  background: #fff;
  transition: transform 0.2s ease;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
}

.theme-toggle-track--on .theme-toggle-thumb {
  transform: translateX(calc(var(--theme-track-width) - var(--theme-thumb-size) - 4px));
}

.mode-icon {
  font-size: var(--mode-icon-size);
  color: rgba(var(--v-theme-on-background), 0.85);
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
  min-height: var(--mobile-header-height);
  padding: 0 12px;
  background: rgba(var(--v-theme-background), 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(var(--v-theme-border), 0.3);
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

.mobile-header-btn {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 10px;
  background: transparent;
  cursor: pointer;
  transition: background-color 0.2s ease;
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
  font-size: 22px;
}

.mobile-subnav {
  position: fixed;
  left: 0;
  right: 0;
  z-index: 109;
  display: flex;
  gap: 8px;
  min-height: var(--mobile-subnav-height);
  padding: 6px 12px;
  background: rgba(var(--v-theme-background), 0.97);
  border-bottom: 1px solid rgba(var(--v-theme-border), 0.25);
}

.mobile-subnav-item {
  flex: 1;
  min-height: 32px;
  border: 1px solid rgba(var(--v-theme-border), 0.45);
  border-radius: 8px;
  background: transparent;
  font: inherit;
  font-size: 0.8rem;
  font-weight: 500;
  color: rgba(var(--v-theme-on-background), 0.75);
  cursor: pointer;
  transition:
    background-color 0.12s ease,
    border-color 0.12s ease,
    color 0.12s ease;
}

.mobile-subnav-item--active {
  border-color: rgba(var(--v-theme-primary), 0.5);
  background: rgba(var(--v-theme-primary), 0.1);
  color: rgb(var(--v-theme-primary));
  font-weight: 600;
}

.mobile-bottom-nav {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 110;
  display: flex;
  align-items: stretch;
  min-height: var(--mobile-bottom-nav-height);
  padding-bottom: env(safe-area-inset-bottom, 0px);
  background: rgba(var(--v-theme-background), 0.98);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(var(--v-theme-border), 0.3);
  box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.06);
}

.mobile-bottom-nav-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  min-width: 0;
  padding: 6px 4px;
  border: none;
  background: transparent;
  cursor: pointer;
  font: inherit;
  transition: color 0.12s ease;
}

.mobile-bottom-nav-icon {
  width: 22px;
  height: 22px;
}

.mobile-bottom-nav-label {
  font-size: 0.65rem;
  font-weight: 500;
  line-height: 1.1;
  color: rgba(var(--v-theme-on-background), 0.65);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.mobile-bottom-nav-item--active .mobile-bottom-nav-label {
  color: rgb(var(--v-theme-primary));
  font-weight: 600;
}

.mobile-bottom-nav-item--active .mobile-bottom-nav-icon {
  opacity: 1;
}

@media (max-height: 940px) {
  .side-nav {
    --user-block-height: 22vh;
    --user-block-height-rail: 9vh;
    --user-data-min-height: 170px;
    --user-data-min-height-rail: 88px;
    --user-data-padding-top: 14px;
    --avatar-size: 110px;
    --avatar-size-rail: 62px;
    --avatar-border: 4px;
    --avatar-margin-bottom: 10px;
    --username-size: 1.25rem;
    --user-role-size: 0.75rem;
    --menu-item-min-height: 44px;
    --menu-item-margin: 6px;
    --menu-icon-size: 24px;
    --menu-title-size: 1rem;
    --divider-margin-y: 10px;
    --mode-toggle-bottom: 80px;
    --menu-list-padding-bottom: 128px;
  }
}

@media (max-height: 800px) {
  .side-nav {
    --user-block-height: 21vh;
    --user-block-height-rail: 8vh;
    --user-data-min-height: 140px;
    --user-data-min-height-rail: 72px;
    --user-data-padding-top: 10px;
    --avatar-size: 88px;
    --avatar-size-rail: 52px;
    --avatar-border: 3px;
    --avatar-margin-bottom: 8px;
    --username-size: 1.1rem;
    --user-role-size: 0.7rem;
    --menu-item-min-height: 38px;
    --menu-item-margin: 4px;
    --menu-item-padding-x: 12px;
    --menu-item-gap: 10px;
    --menu-icon-size: 22px;
    --menu-title-size: 0.95rem;
    --divider-margin-y: 8px;
    --mode-toggle-bottom: 68px;
    --toggle-btn-size: 36px;
    --toggle-btn-offset: 14px;
    --theme-track-width: 40px;
    --theme-track-height: 22px;
    --theme-thumb-size: 18px;
    --mode-icon-size: 24px;
    --menu-list-padding-bottom: 112px;
  }
}

@media (max-height: 700px) {
  .side-nav {
    --user-block-height: 21vh;
    --user-block-height-rail: 7vh;
    --user-data-min-height: 115px;
    --user-data-min-height-rail: 60px;
    --user-data-padding-top: 8px;
    --avatar-size: 72px;
    --avatar-size-rail: 44px;
    --avatar-margin-bottom: 6px;
    --username-size: 1rem;
    --user-role-size: 0.65rem;
    --menu-item-min-height: 34px;
    --menu-item-margin: 3px;
    --menu-icon-size: 20px;
    --menu-title-size: 0.875rem;
    --divider-margin-y: 6px;
    --mode-toggle-bottom: 60px;
    --toggle-btn-size: 32px;
    --mode-icon-size: 22px;
    --menu-list-padding-bottom: 100px;
  }
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

  .mobile-bottom-nav-label {
    font-size: 0.6rem;
  }
}
</style>
