<template>
  <v-container>
    <v-row>
      <v-col @click="$router.go(-1)" cols="1">
        <v-icon>
          mdi-arrow-left
        </v-icon>
      </v-col>
      <v-col>
        <Search/>

      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import Search from "@/components/Search.vue"

</script>
