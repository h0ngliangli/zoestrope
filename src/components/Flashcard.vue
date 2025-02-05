<template>
  <v-card title="Flashcard">
    <v-card-text>
      <v-text-field v-model="question" label="Question" outlined></v-text-field>
      <v-text-field v-model="answer" label="Answer" outlined></v-text-field>
      <v-row>
        <v-col cols="12" md="6">
          <v-textarea v-model="note" label="Note" outlined></v-textarea>
        </v-col>
        <v-col cols="12" md="6">
          <v-img
            :src="img_url"
            width="300"
            height="300"
            alt="Paste image here..."
          >
            <template v-slot:placeholder>
              <div class="d-flex flex-column align-center fill-height justify-center border">
                <v-icon size="50">mdi-image-search</v-icon>
                <div class="caption grey--text">Paste image here...</div>
              </div>
            </template>
          </v-img>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="addFlashcard" color="primary">Add Flashcard</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref } from "vue"

const question = ref("aaa") // 初始化 question 变量
const answer = ref("test") // 初始化 answer 变量
const note = ref("note") // 初始化 note 变量
const test_img_url = ref(
  "https://storage.googleapis.com/bucket-zoetrope-3372/83724701ca4394d65c7eccd37b1325dc.jpg"
) // 初始化 img_url 变量
const img_url = ref("") // 初始化 img_url 变量

function addFlashcard() {
  console.log("Question:", question.value)
  console.log("Answer:", answer.value)
  // 处理添加 Flashcard 的逻辑
}
</script>
