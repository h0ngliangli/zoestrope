<template>
  <!--
        a search bar once clicked will expand to show a search input and 
        search results. The search results will be a list of flashcards that
        match the search query. The search results will be displayed in a
        card view with the question and answer of the flashcard displayed.
        Clicking on a flashcard will take the user to the flashcard view page
    -->
  <v-sheet class="pa-4" style="max-width: 800px">
    <!--
            class="pa-4" is a Vuetify utility class that applies padding of 4 units
            to all sides of the element.
        -->
    <v-row>
      <v-col cols="12">
        <v-text-field
          id="search-input"
          v-model="search"
          label="Search"
          append-icon="mdi-magnify"
          prepend-icon="mdi-arrow-left"
          @click:prepend="$router.go(-1)"
          @click:append="search = ''"
          @input="debouncedSearchFlashcards"
          clearable
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        v-for="flashcard in appStore.flashcards"
        :key="flashcard.id"
      >
        <!-- 不能通过这种方法传递Flashcard对象，会引起String contains an invalid character error
            解决方法一是通过pinia store. 第二种方法是通过props传递。 
        -->
        <FlashcardPreview :flashcard="flashcard" />
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { useAppStore } from "@/stores/app"

const search = ref("")
const appStore = useAppStore()

let debounceTimeout
const debounce = (func, delay) => {
  return (...args) => {
    clearTimeout(debounceTimeout)
    debounceTimeout = setTimeout(() => {
      func(...args)
    }, delay)
  }
}

const searchFlashcards = async () => {
  const kw = search.value
  if (!kw) {
    appStore.setFlashcards([])
    return
  }
  try {
    const res = await fetch(
      "http://localhost:3000/flashcard/fulltext-search?kw=" + search.value
    )
    const data = await res.json()
    appStore.setFlashcards(data)
  } catch (error) {
    console.error(error)
  }
}

const debouncedSearchFlashcards = debounce(searchFlashcards, 300)

onMounted(() => {
  // focus on the search input when the page is loaded
  document.querySelector("#search-input").focus()
})

</script>
