<template>
    <!-- add a back button -->
    <v-btn @click="$router.go(-1)">
        <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <Flashcard :flashcard="flashcard" />
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
