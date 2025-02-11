<template>
  <v-card class="mx-auto" title="添加卡片">
    <template v-slot:prepend>
      <v-btn icon="mdi-arrow-left" @click="$router.go(-1)"> </v-btn>
    </template>
    <v-card-actions>
      <v-form @submit.prevent="addFlashcard" class="w-100">
        <v-text-field v-model="question" label="问题" required ref="eleQuestion"></v-text-field>
        <v-text-field v-model="answer" label="答案" required></v-text-field>
        <v-text-field
          v-model="tags"
          label="标签"
          placeholder="以空格分隔"
        ></v-text-field>
        <v-row>
          <v-col>
            <v-textarea v-model="note" label="笔记"> </v-textarea>
          </v-col>
          <v-col>
            <v-sheet rounded class="d-flex flex-column align-center">
              <v-img width="200" height="200" class="mx-auto" :src="img_url">
                <template v-slot:placeholder>
                  <div
                    class="border w-100 h-100 d-flex flex-column align-center justify-center"
                  >
                    <div class="caption grey--text">粘贴图片在这里...</div>
                    <v-btn icon="mdi-image-search" @click="attachImage">
                    </v-btn>
                  </div>
                </template>
              </v-img>
              <v-btn
                icon="mdi-close"
                @click="() => (img_url = '')"
                v-if="img_url"
              >
              </v-btn>
            </v-sheet>
          </v-col>
        </v-row>
        <v-btn type="submit" color="primary">添加</v-btn>
      </v-form>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { useAlertStore } from "@/stores/app"
import * as util from "@/util"
import { onMounted, ref } from "vue"
const eleQuestion = ref(null)
const alert = useAlertStore()
const question = ref("")
const answer = ref("")
const tags = ref("")
const note = ref("")
const img_url = ref("")
const id = ref("")

onMounted(() => {
  eleQuestion.value.focus()
})

const addFlashcard = async () => {
  console.log("Add flashcard")
  const flashcard = {
    question: question.value,
    answer: answer.value,
    tags: tags.value.split(" "),
    note: note.value,
  }
  console.log("Flashcard:", flashcard)
  // Send the flashcard data to the server
  try {
    const response = await fetch("http://localhost:3000/flashcard/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(flashcard),
    })
    if (response.ok) {
      console.log("Flashcard added successfully")
      // 这么写是错的
      // const id = await response.json().id 应该：
      const id = (await response.json()).id
      console.log("Flashcard ID:", id)
      // Clear the form fields
      question.value = ""
      answer.value = ""
      tags.value = ""
      note.value = ""
      await submitImage(id)
      alert.showAlert("success", "Flashcard added successfully")
      eleQuestion.value.focus()
    } else {
      console.error("Failed to add flashcard:", response.statusText)
      alert.showAlert("error", "Failed to add flashcard")
    }
  } catch (error) {
    console.error("Failed to add flashcard:", error)
  }
}

async function submitImage(id) {
  if (!id) {
    console.error("id is required to submit image")
    return
  }
  if (!img_url.value) {
    console.log("No image to submit")
    return
  }

  const imgBlob = await util.blobUrlToBlob(img_url.value)
  if (!imgBlob) {
    console.error("Failed to fetch image blob from ", img_url.value)
    return
  }
  const formData = new FormData()
  formData.append("img", imgBlob, "image.png")
  formData.append("id", id)
  const response = await fetch("http://localhost:3000/flashcard/attach-img", {
    method: "POST",
    body: formData,
  })
  if (response.ok) {
    console.log("Image attached successfully")
  } else {
    console.error("Failed to attach image:", response.statusText)
    alert.showAlert("error", "Failed to attach image")
  }
}

async function attachImage() {
  console.log("Attach image")
  try {
    const clipboardItems = await navigator.clipboard.read()
    console.log("Clipboard items:", clipboardItems)
    for (const item of clipboardItems) {
      const imageTypes = ["image/png", "image/jpeg", "image/gif", "image/webp"]
      for (const type of imageTypes) {
        if (item.types.includes(type)) {
          const blob = await item.getType(type)
          const imageUrl = URL.createObjectURL(blob)
          img_url.value = imageUrl
          return
        }
      }
    }
    console.warn("No image data found in clipboard.")
  } catch (error) {
    console.error("Failed to read clipboard data:", error)
  }
}
</script>
