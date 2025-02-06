// Utilities
import { defineStore } from "pinia"

export const useAppStore = defineStore("app", {
  state: () => ({
    flashcards: [],
    recentFlashcards: [],
    selectedFlashcard: null,
  }),
  actions: {
    setFlashcards(flashcards) {
      this.flashcards = flashcards
    },
    selectFlashcard(flashcard) {
      this.selectedFlashcard = flashcard
    },
  },
})
