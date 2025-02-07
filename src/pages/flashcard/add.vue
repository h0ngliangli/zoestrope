<template>
  <v-sheet class="pa-4" border rounded elevation="6">
    <div class="text-h4 mb-4">添加新卡片</div>
    <v-form @submit="addFlashcard">
      <v-text-field v-model="question" label="问题" required></v-text-field>
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
                  <v-btn icon="mdi-image-search" @click="attachImage"> </v-btn>
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
  </v-sheet>
</template>

<script setup>
const question = ref("")
const answer = ref("")
const tags = ref("")
const note = ref("")
const img_url = ref("")
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
      question.value = ""
      answer.value = ""
      tags.value = ""
      note.value = ""
      
    } else {
      console.error("Failed to add flashcard:", response.statusText)
    }
  } catch (error) {
    console.error("Failed to add flashcard:", error)
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
