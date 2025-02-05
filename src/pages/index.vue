<script setup lang="ts">
import Search from '@/components/Search.vue';

</script>

<template>
  <!-- dashboard 
      includes a search bar, a list of recent flashcards,
      and a quick action panel which includes a button to add a new flashcard

      a search bar once clicked will expand to show a search input and 
      search results. The search results will be a list of flashcards that
      match the search query. The search results will be displayed in a
      card view with the question and answer of the flashcard displayed.
      Clicking on a flashcard will take the user to the flashcard view page

   -->
   <Search />
</template>