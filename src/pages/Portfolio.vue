<template>
  <MenuComponent>
    <template #content>
      <h1>Портфолио</h1>
    </template>
  </MenuComponent>
</template>

<script>
  import MenuComponent from '@/components/MenuComponent.vue';
  export default {
    name: 'Portfolio',
    components:{ MenuComponent },
    data: ()=>({

    }),
  }
</script>

<style scoped>

</style>
