<template>
  <v-footer height="60" app style="background-color: transparent" class="pa-0">
    <v-sheet
      style="max-width: 800px"
      class="border w-100 h-100 ma-auto d-flex justify-center align-center"
    >
      <router-link
        to="/"
        class="text-decoration-none d-flex align-center flex-column"
        style="color: rgba(var(--v-theme-on-surface)"
      >
        <v-icon size="40q">mdi-home</v-icon>
        <span>Home</span>
      </router-link>
    </v-sheet>
  </v-footer>
</template>

<script setup></script>
