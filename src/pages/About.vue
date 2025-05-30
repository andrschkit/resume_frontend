<template>
  <MenuComponent>
    <template #content>
      <h1>Обо мне</h1>
      <div v-for="(item, index) in contacts">
        <p>----------------------------------</p>
        <p>{{ item }}</p>
      </div>
    </template>
  </MenuComponent>
</template>

<script>
  import MenuComponent from '@/components/MenuComponent.vue';
  import store from "@/plugins/store.js";
  import {mapGetters} from "vuex";
  export default {
    name: 'About',
    components:{ MenuComponent },
    data: ()=>({

    }),
    computed: {
      ...mapGetters('resume_store', { contacts: 'users_all' }),
    },
    mounted () {
      store.dispatch('resume_store/loadUsers');
    },
  }
</script>

<style scoped>

</style>
