<template>
  <v-main :class="responsiveClass" max-width="800">
    <router-view />
  </v-main>

  <AppFooter />
</template>

<script setup>
const responsiveClass = computed(() => {
  return {
    "w-100": true, // Full width on all screens
    "h-100": true, // Full height on all screens
    "ma-auto": true, // Center on large screens
    "pa-4": true, // Padding on all screens
  }
})
</script>
