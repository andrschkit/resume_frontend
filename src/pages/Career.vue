<template>
  <MenuComponent>
    <template #content>
      <h1>Карьера</h1>
      <div v-for="(item, index) in work_places">
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
    name: 'Career',
    components:{ MenuComponent },
    data: ()=>({

    }),
    computed: {
      ...mapGetters('resume_store', { work_places: 'work_places_all' }),
    },
    mounted () {
      store.dispatch('resume_store/loadWorkPlaces');
    },
  }
</script>

<style scoped>

</style>
