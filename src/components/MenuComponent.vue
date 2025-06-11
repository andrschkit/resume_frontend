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
      <div class="user-data" :style="rail ? 'height:10vh' : 'height:21vh'">
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
          :active="item.route === activeSection"
          active-class="active-menu-item"
          class="menu-item"
          @click="$emit('scroll-to', item.route)"
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
  import moon from '@/assets/moon-svgrepo.svg'
  import sun from '@/assets/sun-svgrepo.svg'

  const theme = useTheme()
  const drawer = ref(true)
  const rail = ref(true)
  const hovered = ref(false)
  const darkMode = ref(false)
  const collapsedWidth = 80
  const expandedWidth = 240

  defineProps({
    menu: {
      type: Array,
      required: true,
    },
    activeSection: {
      type: String,
      required: true,
    },
  });
  defineEmits(['scroll-to']);

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
  border-right: 1px solid rgba(var(--v-theme-border), 0.3);
  z-index: 100;
  background: rgba(var(--v-theme-background), 0.95) !important;
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.custom-navigation.collapsed {
  width: var(--collapsed-width) !important;
}

.user-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 16px;
  transition: all 0.3s ease;
  overflow: hidden;
  height: 20vh;
}

.avatar {
  transition: all 0.3s ease;
  margin-bottom: 15px;
  border: 5px solid rgba(var(--v-theme-primary), 0.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.avatar img {
  object-fit: cover;
  width: 125px;
}

.username {
  white-space: nowrap;
  font-size: 1.4rem;
  font-weight: 600;
  color: rgba(var(--v-theme-on-background), 0.9);
  text-align: center;
}

.divider {
  margin: 15px 0;
  transition: margin 0.3s ease;
  opacity: 0.3;
}

.menu-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: left;
  padding: 5px 12px;
}

.menu-item {
  width: 100%;
  border-radius: 12px !important;
  margin: 8px 0;
  transition: all 0.3s ease;
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 16px;
}

.menu-item:hover {
  background-color: rgba(var(--v-theme-primary), 0.05);
  transform: translateX(5px);
}

.menu-icon {
  width: 26px;
  height: 26px;
  transition: all 0.3s ease;
  flex-shrink: 0;
}
.active-menu-item {
  background-color: rgba(var(--v-theme-primary), 0.1);
  border-radius: 50%;
}
.menu-icon-dark {
  filter: brightness(0) !important;
}
.menu-icon-light {
  filter: brightness(0) invert(1) !important;
}
.menu-title {
  white-space: nowrap;

  font-size: 1.1rem;
  font-weight: 500;
  color: rgba(var(--v-theme-on-background), 0.8);
}

.active-menu-item {
  background-color: rgba(var(--v-theme-primary), 0.1) !important;
  border-radius: 12px !important;
}

.active-menu-item .menu-title {
  color: rgb(var(--v-theme-primary)) !important;
  font-weight: 600;
}

.toggle-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  padding: 10px;
  border-radius: 50%;
  transition: all 0.3s ease;
  background-color: rgba(var(--v-theme-primary), 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
}

.toggle-button:hover {
  background-color: rgba(var(--v-theme-primary), 0.2);
  transform: scale(1.1);
}

.toggle-button .v-icon {
  color: rgb(var(--v-theme-primary));
  transition: transform 0.3s ease;
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
}

.mode-toggle-expand {
  flex-direction: row;
  gap: 12px;
}

.mode-toggle-collapse {
  flex-direction: column;
}

.switch-expand {
  padding: 10px !important;
}

.switch-collapse {
  padding: 0 !important;
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

/* Анимации */
.v-avatar {
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.v-avatar:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

/* Адаптивность */
@media (max-width: 960px) {
  .custom-navigation {
    border-radius: 0 20px 20px 0;
  }

  .user-data {
    padding: 15px 10px;
  }

  .menu-item {
    padding: 0 12px;
  }
}

@media (max-width: 600px) {
  .custom-navigation {
    --collapsed-width: 70px;
    --expanded-width: 200px;
  }

  .avatar {
    width: 50px !important;
    height: 50px !important;
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
