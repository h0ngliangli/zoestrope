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
  <v-sheet class="pa-4" rounded elevation="6">
    <v-card class="mb-4" height="200" @mouseover="mouseoverHeader" @mouseleave="mouseleaveHeader">
      <template v-slot:image>
        <v-img src="@/assets/header.jpg" cover
        :style="{ filter: `blur(${blurStength}px)`, transition: 'filter 0.5s ease-in-out' }"
        ></v-img>
      </template>
      <v-card-title class="text-h6">美好的一天从练习开始</v-card-title>
      <v-card-actions>
        <v-btn
          variant="outlined"
          class="mx-auto"
          @click="$router.push('/flashcard/new')"
        >
          进入练习
        </v-btn>
      </v-card-actions>
    </v-card>
    <div class="text-h4 mb-4">美好的一天从练习开始</div>
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


<script setup>
import FlashcardList from "@/components/FlashcardList.vue"
import { useAppStore } from "@/stores/app"

const blurStength = ref(5)
const appStore = useAppStore()
fetch("http://localhost:3000/flashcard/recent")
  .then((res) => res.json())
  .then((data) => {
    appStore.setRecentFlashcards(data)
  })
  .catch((err) => console.error(err))

const mouseoverHeader = () => {
  blurStength.value = 0
}
const mouseleaveHeader = () => {
  blurStength.value = 5
}
</script>