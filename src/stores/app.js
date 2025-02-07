// Utilities
import { defineStore } from "pinia"

export const useAlertStore = defineStore("alert", {
  state: () => ({
    show: false,
    message: "",
    type: "info", // 可以是 'info', 'success', 'warning', 'error'
  }),
  actions: {
    showAlert(type = "info", message) {
      this.message = message
      this.type = type
      this.show = true
    },
    hideAlert() {
      this.show = false
    },
  },
})

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
    setRecentFlashcards(flashcards) {
      this.recentFlashcards = flashcards
    },
  },
})
