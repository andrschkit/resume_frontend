<template>
  <div class="navigation-wrapper">
    <v-navigation-drawer
      v-model="drawer"
      class="custom-navigation"
      :class="{ 'collapsed': rail }"
      permanent
      :width="currentWidth"
      @mouseenter="hovered = true"
      @mouseleave="hovered = false"
    >
      <div class="user-data">
        <v-avatar class="avatar" :size="rail ? '48' : '80'">
          <img alt="Avatar" src="https://randomuser.me/api/portraits/men/86.jpg">
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
              <img alt="" class="menu-icon" :src="item.icon">
            </v-icon>
          </template>

          <transition name="fade">
            <v-list-item-title v-if="!rail" class="menu-title">
              {{ item.title }}
            </v-list-item-title>
          </transition>
        </v-list-item>
      </v-list>

      <div class="toggle-button" @click="rail = !rail">
        <v-icon>{{ rail ? 'mdi-chevron-right' : 'mdi-chevron-left' }}</v-icon>
      </div>
    </v-navigation-drawer>

    <slot name="content" />
  </div>
</template>

<script>
  import addressCard from '@/assets/address-card.svg'
  import education from '@/assets/graduation-hat-alt.svg'
  import career from '@/assets/career.svg'
  import portfolio from '@/assets/folder-user.svg'
  import skills from '@/assets/skills.svg'
  import contacts from '@/assets/pen.svg'

  export default {
    data: () => ({
      drawer: true,
      rail: false,
      hovered: false,
      collapsedWidth: 72,
      expandedWidth: 240,
      menu: [
        { route: 'about', title: 'Обо мне', icon: addressCard },
        { route: 'education', title: 'Образование', icon: education },
        { route: 'career', title: 'Карьера', icon: career },
        { route: 'portfolio', title: 'Портфолио', icon: portfolio },
        { route: 'skills', title: 'Навыки', icon: skills },
        { route: 'contacts', title: 'Контакты', icon: contacts },
      ],
    }),
    computed: {
      currentWidth () {
        return this.rail ? this.collapsedWidth : this.expandedWidth;
      },
    },
  }
</script>

<style scoped>
.navigation-wrapper {
  position: relative;
}

.custom-navigation {
  --collapsed-width: 72px;
  --expanded-width: 240px;
  position: fixed;
  height: 100vh;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  z-index: 100;
}

.custom-navigation.collapsed {
  width: var(--collapsed-width) !important;
}

.user-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 16px;
  transition: all 0.3s ease;
  overflow: hidden;
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
  padding: 0 8px;
}

.menu-item {
  border-radius: 8px;
  margin: 4px 0;
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
}

.active-menu-item .menu-icon {
  filter: brightness(0) saturate(100%) invert(40%) sepia(98%) saturate(7488%) hue-rotate(246deg) brightness(98%) contrast(94%);
}

.toggle-button {
  position: absolute;
  bottom: 20px;
  right: 12px;
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
</style>
