<template>
  <v-app>
    <!-- 
      both App.vue and layout/default.vue contain router-view. 
      App.vue is the root component. it contains the default.vue
      which means that the app's router-view includes the default.vue's
      router-view.
      if you print out $router.getRoutes() here, you will see
      {path: "/", __file: "src/layouts/default.vue"}
      所以layout中的router更像是一个sub router
    -->
    <router-view />
  </v-app>
</template>

<script setup></script>
