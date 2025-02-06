<template>
  <!-- display a list of flashcards, fed via pinia store -->
    <v-container>
        <v-row>
            <v-col
            cols="12"
            sm="6"
            v-for="flashcard in flashcards"
            :key="flashcard.id"
            >
            <FlashcardPreview :flashcard="flashcard" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { useAppStore } from "@/stores/app"
const props = defineProps({
  piniaId: {
    type: String,
    required: true,
  },
})
const appStore = useAppStore()
const flashcards = computed(() => {
  return appStore.flashcards
})
</script>
