<template>
  <MenuComponent>
    <template #content>
      <h1>Обо мне</h1>
    </template>
  </MenuComponent>
</template>

<script>
  import MenuComponent from '@/components/MenuComponent.vue';
  export default {
    name: 'About',
    components:{ MenuComponent },
    data: ()=>({

    }),
  }
</script>

<style scoped>

</style>
