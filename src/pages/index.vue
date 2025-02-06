<script setup>
import FlashcardList from "@/components/FlashcardList.vue"
import { useAppStore } from "@/stores/app"

const appStore = useAppStore()
fetch("http://localhost:3000/flashcard/recent")
  .then((res) => res.json())
  .then((data) => {
    appStore.setRecentFlashcards(data)
  })
  .catch((err) => console.error(err))

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
  <v-sheet class="pa-4" border rounded elevation="6">
    <div class="text-h4 mb-4">你好,</div>
    <v-text-field
      label="Search"
      append-icon="mdi-magnify"
      @click="$router.push('/search')"
    >
    </v-text-field>
    <v-card variant="outlined" class="mt-4">
      <v-card-title class="text-h6">最近的卡片</v-card-title>
      <v-card-text>
        <FlashcardList pinia-id="recentFlashcards" />
      </v-card-text>
    </v-card>
  </v-sheet>
</template>
