<template>
    <!--id: {{ $route.params.id }}-->
    <!-- add a back button -->
    <v-btn @click="$router.go(-1)">
        <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <Flashcard :flashcard="flashcard" />
   <div>
    <h1>{{ flashcard.question }}</h1>
    <p>{{ flashcard.answer }}</p>
    <div>
      <v-chip v-for="tag in flashcard.tags" :key="tag" class="mr-2">
        {{ tag }}
      </v-chip>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from "@/stores/app"
import { computed } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const flashcardStore = useAppStore()

const flashcard = computed(() => {
  return flashcardStore.selectedFlashcard
})
</script>
