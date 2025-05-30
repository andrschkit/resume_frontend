<template>
  <MenuComponent>
    <template #content>
      <h1>Портфолио</h1>
      <div v-for="(item, index) in products">
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
    name: 'Portfolio',
    components:{ MenuComponent },
    data: ()=>({

    }),
    computed: {
      ...mapGetters('resume_store', { products: 'products_all' }),
    },
    mounted () {
      store.dispatch('resume_store/loadProducts');
    },
  }
</script>

<style scoped>

</style>
