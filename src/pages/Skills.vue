<template>
  <MenuComponent>
    <template #content>
      <h1>Навыки</h1>
      <p>----------------------------------</p>
      <h3>Основные</h3>
      <div v-for="(item, index) in mainSkills">
        <p>----------------------------------</p>
        <p>{{ item }}</p>
      </div>
      <p>----------------------------------</p>
      <h3>Фронт</h3>
      <div v-for="(item, index) in frontSkills">
        <p>----------------------------------</p>
        <p>{{ item }}</p>
      </div>
      <p>----------------------------------</p>
      <h3>Бэк</h3>
      <div v-for="(item, index) in backSkills">
        <p>----------------------------------</p>
        <p>{{ item }}</p>
      </div>
    </template>
  </MenuComponent>
</template>

<script>
  import MenuComponent from '@/components/MenuComponent.vue';
  import store from '@/plugins/store.js';
  import { mapGetters } from 'vuex';
  export default {
    name: 'Skills',
    components:{ MenuComponent },
    data: ()=>({

    }),
    computed: {
      ...mapGetters('resume_store', { mainSkills: 'main_skills_all',
                                      frontSkills: 'frontend_skills_all',
                                      backSkills: 'backend_skills_all',
      }),
    },
    mounted () {
      store.dispatch('resume_store/loadMainSkills');
      store.dispatch('resume_store/loadFrontendSkills');
      store.dispatch('resume_store/loadBackendSkills');
    },
  }
</script>

<style scoped>

</style>
