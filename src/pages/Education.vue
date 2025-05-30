<template>
  <MenuComponent>
    <template #content>
      <h1>Образование</h1>
      <div v-for="(item, index) in educationPlaces">
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
    name: 'Education',
    components:{ MenuComponent },
    data: ()=>({

    }),
    computed: {
      ...mapGetters('resume_store', { educationPlaces: 'education_places_all' }),
    },
    mounted () {
      store.dispatch('resume_store/loadEducationPlaces');
    },
  }
</script>

<style scoped>

</style>
