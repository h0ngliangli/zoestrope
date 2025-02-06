<template>
    <v-sheet class="pa-4" :class="responsiveClass">
        <v-row>
            <v-col cols="12" class="mb-2" sm="6" md="4" lg="3"  v-for="flashcard in flashcards" :key="flashcard.id" >
                <FlashcardPreview :flashcard="flashcard"/>
            </v-col>
        </v-row>
    </v-sheet>
</template>

<script setup>
import { ref } from 'vue';
import FlashcardPreview from '@/components/FlashcardPreview.vue';
const flashcards = ref([
    {id: 1, question: "What is the capital of France?", answer: "Paris", tags: ["geography"]},
    {id: 2, question: "What is the capital of Spain?", answer: "Madrid", tags: ["geography"]},
    {id: 3, question: "What is the capital of Italy?", answer: "Rome", tags: ["geography"]},
    {id: 4, question: "What is the capital of Germany?", answer: "Berlin", tags: ["geography"]},
    {id: 5, question: "What is the capital of the United Kingdom?", answer: "London", tags: ["geography"]},
    {id: 6, question: "What is the capital of the United States?", answer: "Washington, D.C.", tags: ["geography"]},
    {id: 7, question: "What is the capital of Canada?", answer: "Ottawa", tags: ["geography"]},
    {id: 8, question: "What is the capital of Australia?", answer: "Canberra", tags: ["geography"]},
    {id: 9, question: "What is the capital of Japan?", answer: "Tokyo", tags: ["geography"]},
    {id: 10, question: "What is the capital of South Korea?", answer: "Seoul", tags: ["geography"]},
    {id: 11, question: "What is the capital of China?", answer: "Beijing", tags: ["geography"]},
])
const responsiveClass = {
    'w-100': true,
    'h-100': true,
    'ma-auto': true,
    'max-width-600': true,

}
</script>

<style scoped>

</style>