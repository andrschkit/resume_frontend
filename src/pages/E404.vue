<template>
  <MenuComponent>
    <template #content>
      <h1>404 NOT FOUND</h1>
      <p>Вам не сюда)))</p>
    </template>
  </MenuComponent>
</template>

<script>
  import MenuComponent from '@/components/MenuComponent.vue';
  export default {
    name: 'E404',
    components:{ MenuComponent },
    data: ()=>({

    }),
  }
</script>

<style scoped>

</style>
