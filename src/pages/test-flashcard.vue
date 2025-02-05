<template>
  <v-sheet class="pa-4" :class="responsiveClass">
    <Flashcard question="Hi" answer="y" mode="editable" note="a note" img_url="https://storage.googleapis.com/bucket-zoetrope-3372/83724701ca4394d65c7eccd37b1325dc.jpg"/>
  </v-sheet>
</template>

<script setup>
import { computed } from 'vue';

const responsiveClass = computed(() => {
  return {
    'w-100': true, // Full width on all screens
    'h-100': true, // Full height on all screens
    'ma-auto': true, // Center on large screens
    'max-width-600': true, // Fixed max width on large screens
  };
});
</script>

<style scoped>
@media (min-width: 600px) {
  .max-width-600 {
    max-width: 600px;
  }
}
</style>