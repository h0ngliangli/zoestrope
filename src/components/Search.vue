<template>
  <!--
        a search bar once clicked will expand to show a search input and 
        search results. The search results will be a list of flashcards that
        match the search query. The search results will be displayed in a
        card view with the question and answer of the flashcard displayed.
        Clicking on a flashcard will take the user to the flashcard view page
    -->
  <v-sheet class="pa-4" :class="responsiveClass">
    <!--
            class="pa-4" is a Vuetify utility class that applies padding of 4 units
            to all sides of the element.
        -->
    <v-row>
      <v-col cols="12">
        <v-text-field
          v-model="search"
          label="Search"
          append-icon="mdi-magnify"
          @click:append="search = ''"
          @input="searchFlashcards"
          clearable
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card
          v-for="flashcard in flashcards"
          :key="flashcard.id"
          @click="goToFlashcard(flashcard.id)"
        >
          <v-card-title>{{ flashcard.question }}</v-card-title>
          <v-card-text>{{ flashcard.answer }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script setup>
import { ref, computed } from "vue"
import { useRouter } from "vue-router"
const router = useRouter()
const search = ref("")
const flashcards = ref([
  { id: 1, question: "What is the capital of France?", answer: "Paris" },
  { id: 2, question: "What is the capital of Spain?", answer: "Madrid" },
  { id: 3, question: "What is the capital of Italy?", answer: "Rome" },
  { id: 4, question: "What is the capital of Germany?", answer: "Berlin" },
])
const lastSearchTime = ref(new Date().getTime())
const waitingTime = 500 // milliseconds
const searchFlashcards = async () => {
  try {
    // TODO: add a waiting time before making the request
    const currentTime = new Date().getTime()
    if (currentTime - lastSearchTime.value < waitingTime) {
      return
    }
    const res = await fetch(
      "http://localhost:3000/flashcard/search?kw=" + search.value
    )
    const data = await res.json()
    flashcards.value = data
  } catch (error) {
    console.error(error)
  }
}
</script>
