<template>
  <div class="navigation-wrapper">
    <v-navigation-drawer
      v-model="drawer"
      class="custom-navigation"
      permanent
      :width="currentWidth"
      @mouseenter="hovered = true"
      @mouseleave="hovered = false"
    >
      <div class="user-data" :style="rail ? 'height:10vh' : 'height:20vh'">
        <v-avatar class="avatar" :size="rail ? '70' : '120'">
          <img alt="Avatar" src="@/assets/avatar.jpg">
        </v-avatar>

        <transition name="fade">
          <v-list-item-title
            v-if="!rail"
            class="text-h6 username"
          >
            Щербаков Андрей
          </v-list-item-title>
        </transition>
      </div>

      <v-divider class="divider" />

      <v-list class="menu-list">
        <v-list-item
          v-for="item in menu"
          :key="item.route"
          active-class="active-menu-item"
          class="menu-item"
          :to="{ name: item.route }"
        >
          <template #prepend>
            <v-icon>
              <img alt="" class="menu-icon" :class="!darkMode? 'menu-icon-dark':'menu-icon-light'" :src="item.icon">
            </v-icon>
          </template>

          <transition name="fade">
            <v-list-item-title v-if="!rail" class="menu-title">
              {{ item.title }}
            </v-list-item-title>
          </transition>
        </v-list-item>
      </v-list>

      <div class="toggle-button" @click="toggleRail">
        <v-icon>{{ rail ? 'mdi-chevron-right' : 'mdi-chevron-left' }}</v-icon>
      </div>
      <div class="mode-toggle" :class="!rail ? 'mode-toggle-expand' : 'mode-toggle-collapse'">
        <v-switch
          v-model="darkMode"
          :class="!rail ? 'switch-expand' : 'switch-collapse'"
          hide-details
          style="padding: 10px; justify-items: center"
          @change="toggleDarkMode"
        />
        <img alt="" class="mode-icon" :src="darkMode?sun:moon">
      </div>
    </v-navigation-drawer>

    <slot name="content" />
  </div>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { useTheme } from 'vuetify'
  import addressCard from '@/assets/address-card.svg'
  import education from '@/assets/graduation-hat-alt.svg'
  import career from '@/assets/career.svg'
  import portfolio from '@/assets/folder-user.svg'
  import skills from '@/assets/skills.svg'
  import contacts from '@/assets/pen.svg'
  import moon from '@/assets/moon-svgrepo.svg'
  import sun from '@/assets/sun-svgrepo.svg'

  const theme = useTheme()
  const drawer = ref(true)
  const rail = ref(true)
  const hovered = ref(false)
  const darkMode = ref(false)
  const collapsedWidth = 80
  const expandedWidth = 240

  const menu = [
    { route: 'about', title: 'Обо мне', icon: addressCard },
    { route: 'education', title: 'Образование', icon: education },
    { route: 'career', title: 'Карьера', icon: career },
    { route: 'portfolio', title: 'Портфолио', icon: portfolio },
    { route: 'skills', title: 'Навыки', icon: skills },
    { route: 'contacts', title: 'Контакты', icon: contacts },
  ]

  const currentWidth = computed(() => {
    return rail.value ? collapsedWidth : expandedWidth
  })

  const toggleRail = () => {
    rail.value = !rail.value
    localStorage.setItem('navigationRail', rail.value)
  }

  const toggleDarkMode = () => {
    theme.global.name.value = darkMode.value ? 'customDarkTheme' : 'customLightTheme'
    localStorage.setItem('theme', theme.global.name.value)
  }

  onMounted(() => {
    // Загрузка состояния навигации
    const savedRail = localStorage.getItem('navigationRail')
    if (savedRail !== null) {
      rail.value = savedRail === 'true'
    }

    // Загрузка темы
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      darkMode.value = savedTheme === 'customDarkTheme'
      theme.global.name.value = savedTheme
    } else {
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
      darkMode.value = isDarkMode
      theme.global.name.value = isDarkMode ? 'customDarkTheme' : 'customLightTheme'
      localStorage.setItem('theme', theme.global.name.value)
    }
  })
</script>

<style scoped>
.navigation-wrapper {
  position: relative;
}

.custom-navigation {
  --collapsed-width: 80px;
  --expanded-width: 240px;
  position: fixed;
  height: 100vh;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  border-right:1px solid rgba(var(--v-theme-border), 0.3);
  z-index: 100;
}

.custom-navigation.collapsed {
  width: var(--collapsed-width) !important;
}

.user-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 16px;
  transition: all 0.3s ease;
  overflow: hidden;
  height: 17vh;
}

.avatar {
  transition: all 0.3s ease;
  margin-bottom: 12px;
}

.username {
  white-space: nowrap;
}

.divider {
  margin: 8px 0;
  transition: margin 0.3s ease;
}

.menu-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: left;
  padding: 1px 12px;
}

.menu-item {
  width: 100%;
  border-radius: 10px !important;
  margin: 10px 0;
  transition: all 0.3s ease;
  min-height: 48px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 12px;
}

.menu-icon {
  width: 24px;
  height: 24px;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.menu-title {
  white-space: nowrap;
  margin-left: 12px;
}

.active-menu-item {
  background-color: rgba(var(--v-theme-primary), 0.1);
  border-radius: 50%;
}
.menu-icon-dark {
  filter: brightness(0);
}
.menu-icon-light {
  filter: brightness(0) invert(1);
}
.active-menu-item .menu-icon-dark {
  filter:
    brightness(0)
    saturate(100%)
    invert(8%)
    sepia(100%)
    saturate(7488%)
    hue-rotate(246deg)
    brightness(98%)
    contrast(94%);
}
.active-menu-item .menu-icon-light {
  filter:
    brightness(0)
    saturate(100%)
    invert(48%)
    sepia(89%)
    saturate(1200%)
    hue-rotate(195deg)
    brightness(110%)
    contrast(90%);
}

.toggle-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.toggle-button:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.mode-toggle{
  transition: all 0.3s ease;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 7vh;
  padding: 8px;
}
.mode-toggle-expand{
  flex-direction: row;
}
.mode-toggle-collapse{
  flex-direction: column;
}
.switch-expand{
  padding: 10px !important;
}
.switch-collapse{
  padding: 0 !important;
}
.mode-icon{
  width: 28px;
  height: 28px;
}
</style>
