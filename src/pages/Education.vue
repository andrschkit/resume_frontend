<template>
  <MenuComponent>
    <template #content>
      <h1>Образование</h1>
    </template>
  </MenuComponent>
</template>

<script>
  import MenuComponent from '@/components/MenuComponent.vue';
  export default {
    name: 'Education',
    components:{ MenuComponent },
    data: ()=>({

    }),
  }
</script>

<style scoped>

</style>
