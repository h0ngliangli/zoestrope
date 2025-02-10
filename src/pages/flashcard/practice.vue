<template>
  <v-sheet border class="w-100 h-100">
    <v-card>
      <v-card-title class="d-flex justify-space-between">
        <v-btn @click="$router.go(-1)" icon="mdi-arrow-left"> </v-btn>
        <div class="text-h6">练习</div>
        <div class="text-body-2">
          总条目100 <br />
          今日练习10
        </div>
      </v-card-title>
      <v-card-text class="text-h6">
        <div>提问：{{ flashcard.question }}</div>
        <div class="d-flex flex-wrap ga-3">
          <v-chip v-for="(tag, index) in flashcard.tags">{{ tag }}</v-chip>
        </div>
      </v-card-text>
      <v-card-text>
        <v-text-field
          @keyup.enter="checkAnswer"
          v-model="userAnswer"
          ref="eleUserAnswer"
        >
          <template v-slot:append-inner>
            <v-icon> {{ userAnswerIcon }} </v-icon>
          </template>
        </v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          variant="outlined"
          class="mx-auto"
          @click="nextQuestion"
          ref="eleNextButton"
        >
          下一题
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-container v-if="showHint">
      <v-row>
        <v-col cols="12"> 答案：{{ flashcard.answer }} </v-col>
        <v-col cols="8"> 笔记：{{ flashcard.note }} </v-col>
        <v-col cols="4">
          <v-img :src="flashcard.img_url" width="200" height="200"></v-img>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script setup>
import * as util from "@/util"
import { useAlertStore } from "@/stores/app"
const alert = useAlertStore()
const flashcard = reactive({
  question: "",
  answer: "",
  tags: [],
  note: "",
  img_url: "",
})
const eleNextButton = ref(null)
const eleUserAnswer = ref(null)
const showHint = ref(false)
const userAnswer = ref("")
const userAnswerIcon = ref("")
onMounted(() => {
  console.log("Mounted. Looking for the first question.")
  // fetch the first question
  nextQuestion()
})
const nextQuestion = async () => {
  console.log("Next question")
  try {
    const returned = await util.nextFlashcard()
    console.log("Returned", returned)
    flashcard.question = returned.question
    flashcard.answer = returned.answer
    flashcard.tags = returned.tags
    flashcard.note = returned.note
    flashcard.img_url = returned.img_url
    userAnswer.value = ""
    userAnswerIcon.value = ""
    showHint.value = false
    eleUserAnswer.value.focus()
  } catch (error) {
    alert.showAlert("error", "Failed to add flashcard")
  }
}
const checkAnswer = () => {
  console.log("Check answer", userAnswer.value)
  if (userAnswer.value === "") {
    return
  }
  if (userAnswer.value.toLowerCase() === flashcard.answer.toLowerCase()) {
    userAnswerIcon.value = "mdi-check"
  } else {
    userAnswerIcon.value = "mdi-close"
  }
  // show the hint
  showHint.value = true
  // focus on the next button. $el is the DOM element
  eleNextButton.value.$el.focus()
}
</script>
