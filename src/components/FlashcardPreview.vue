<template>
  <!-- 
        the component to display a flashcard preview 
        it has properties of a flashcard object
  -->
  <v-card
    class="mx-auto pa-4"
    width="300"
    max-height="400"
    variant="outlined"
    @click="goToFlashcard()"
  >
    <template v-slot:title>
        <v-img
        :src="flashcard.img_url"
        width="300"
        height="200"
        alt="Flashcard image"
        v-if="flashcard.img_url"
        ></v-img>
        <div class="text-body-1">{{ flashcard.question }}</div>
    </template>
    <v-card-subtitle>
      <v-chip v-for="tag in flashcard.tags" :key="tag" class="mr-2">
        {{ tag }}
      </v-chip>
    </v-card-subtitle>
  </v-card>
</template>

<script setup>
import { defineProps, onBeforeMount, onErrorCaptured } from "vue"
import { useRouter } from "vue-router"
import { useAppStore } from "@/stores/app"

const router = useRouter()
const appStore = useAppStore()

const props = defineProps({
  flashcard: {
    type: Object,
    required: true,
    default: () => {
      // 默认值是一个函数，返回一个新的对象或数组，以避免多个组件实例共享同一个引用。
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

const goToFlashcard = () => {
  appStore.selectFlashcard(props.flashcard)
  router.push("/flashcard/" + props.flashcard.id)
}
</script>
