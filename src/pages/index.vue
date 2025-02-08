<template>
  <!-- dashboard 
      includes a search bar, a list of recent flashcards,
      and a quick action panel which includes a button to add a new flashcard

      a search bar once clicked will expand to show a search input and 
      search results. The search results will be a list of flashcards that
      match the search query. The search results will be displayed in a
      card view with the question and answer of the flashcard displayed.
      Clicking on a flashcard will take the user to the flashcard view page

   -->
  <v-sheet class="pa-4" rounded elevation="6">
    <v-card
      class="mb-4 position-relative"
      height="200"
      @mouseover="mouseoverHeader"
      @mouseleave="mouseleaveHeader"
      style="color: white"
    >
      <template v-slot:image>
        <v-img
          src="@/assets/header.jpg"
          cover
          :style="{
            filter: `blur(${blurStength}px)`,
            transition: 'filter 0.5s ease-in-out',
          }"
        ></v-img>
      </template>
      <v-card-title class="text-h6 d-flex justify-space-between">
        <span> 美好的一天从练习开始 </span>
        <v-icon @click="toggleTheme">mdi-brightness-6</v-icon>
      </v-card-title>
      <v-card-actions>
        <v-btn
          variant="elevated"
          class="mx-auto"
          color="rgb(138, 43, 227)"
          @click="$router.push('/flashcard/exec')"
        >
          进入练习
        </v-btn>
      </v-card-actions>
      <!-- 增加一个旋转的动画效果 
          首先用一个div将其设定到指定位置 .corner
          然后在div中添加一个v-img元素，
          用animation控制旋转效果 .spin
      -->
      <div class="corner">
        <v-img
          src="/logo.svg"
          class="spin"
          width="300px"
        ></v-img>
      </div>
    </v-card>
    <v-text-field
      label="Search"
      append-icon="mdi-magnify"
      @click="$router.push('/search')"
    >
    </v-text-field>
    <v-card variant="outlined" class="mt-4">
      <v-card-title class="text-h6">最近的卡片</v-card-title>
      <v-card-text>
        <FlashcardList pinia-id="recentFlashcards" />
      </v-card-text>
    </v-card>
  </v-sheet>
</template>

<script setup>
import FlashcardList from "@/components/FlashcardList.vue"
import { useAppStore } from "@/stores/app"
import { useTheme } from "vuetify"

const theme = useTheme()
const blurStength = ref(5)
const appStore = useAppStore()
fetch("http://localhost:3000/flashcard/recent")
  .then((res) => res.json())
  .then((data) => {
    appStore.setRecentFlashcards(data)
  })
  .catch((err) => console.error(err))

const mouseoverHeader = () => {
  blurStength.value = 0
}
const mouseleaveHeader = () => {
  blurStength.value = 5
}

const toggleTheme = () => {
  theme.global.name.value = theme.global.current.value.dark ? "light" : "dark"
}
</script>

<style scoped>
.corner {
  position: absolute;
  bottom: 0;
  left: 0;
  transform: translate(-50%, 50%);
}

.spin {
  animation: spin 20s linear infinite;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
