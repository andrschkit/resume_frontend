<template>
  <v-bottom-navigation
    v-model="activeItem"
    color="primary"
    grow
  >
    <v-btn
      v-for="item in menu"
      :key="item.route"
      @click="$emit('scroll-to', item.route)"
    >
      <v-icon>
        <img class="mobile-icon" :class="darkMode ? 'icon-light' : 'icon-dark'" :src="item.icon">
      </v-icon>
      <span>{{ item.title }}</span>
    </v-btn>
  </v-bottom-navigation>
</template>

<script setup>
  import { ref } from 'vue';

  defineProps({
    menu: Array,
    darkMode: Boolean,
  })

  const activeItem = ref(0)
  defineEmits(['scroll-to'])
</script>

<style scoped>
.mobile-icon {
  width: 24px;
  height: 24px;
}
.icon-dark {
  filter: brightness(0);
}
.icon-light {
  filter: brightness(0) invert(1);
}
</style>
