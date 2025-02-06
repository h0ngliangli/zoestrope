<template>
  <v-card title="Flashcard">
    <v-card-text>
      <v-text-field id="question" v-model="flashcard.question" label="Question" outlined></v-text-field>
      <v-text-field v-model="flashcard.answer" label="Answer" outlined></v-text-field>
      <v-row>
        <v-col cols="12" sm="6">
          <v-textarea v-model="flashcard.note" label="Note" outlined></v-textarea>
        </v-col>
        <v-col cols="12" sm="6">
          <v-img
            :src="flashcard.img_url"
            width="200"
            height="200"
            alt="Paste image here..."
          >
            <template v-slot:placeholder>
              <div class="d-flex flex-column align-center fill-height justify-center">
                <v-icon size="50">mdi-image-search</v-icon>
                <div class="caption grey--text">Paste image here...</div>
              </div>
            </template>
          </v-img>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="saveFlashcard" color="primary" v-if="toSave">Save</v-btn>
      <!-- delete btn -->
      <v-btn color="error" v-if="toDelete" @click="deleteFlashcard">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref, reactive, watchEffect, watch, onMounted } from "vue"

const props = defineProps({
  flashcard: {
    type: Object,
    required: true,
    default: () => {
      return {
        question: "What is the capital of France?",
        answer: "Paris",
        note: "The capital of France is Paris",
        img_url:
          "https://storage.googleapis.com/bucket-zoetrope-3372/83724701ca4394d65c7eccd37b1325dc.jpg",
      }
    },
  },
})

console.log("Flashcard:", props.flashcard)
const flashcard = reactive(props.flashcard)
const toSave = ref(false)
onMounted(() => {
  console.log("Flashcard mounted")
  toSave.value = false
})
// watch flashcard is modified, call this
watch(() => flashcard, (newVal, oldVal) => {
  console.log("flashcard is modified:", newVal, oldVal)
  toSave.value = true
}, { deep: true })

const toDelete = computed(() => {
  return flashcard.id
})

function saveFlashcard() {
  console.log("Question:", question.value)
  console.log("Answer:", answer.value)
  // 处理添加 Flashcard 的逻辑
}

function deleteFlashcard() {
  console.log("Delete flashcard:", flashcard.id)
  // 处理删除 Flashcard 的逻辑
}
</script>
