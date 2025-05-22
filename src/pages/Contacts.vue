<template>
  <MenuComponent>
    <template #content>
      <h1>Контакты</h1>
    </template>
  </MenuComponent>
</template>

<script>
  import MenuComponent from '@/components/MenuComponent.vue';
  export default {
    name: 'Contacts',
    components:{ MenuComponent },
    data: ()=>({

    }),
  }
</script>

<style scoped>

</style>
