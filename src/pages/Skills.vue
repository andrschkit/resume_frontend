<template>
  <MenuComponent>
    <template #content>
      <h1>Навыки</h1>
    </template>
  </MenuComponent>
</template>

<script>
  import MenuComponent from '@/components/MenuComponent.vue';
  export default {
    name: 'Skills',
    components:{ MenuComponent },
    data: ()=>({

    }),
  }
</script>

<style scoped>

</style>
