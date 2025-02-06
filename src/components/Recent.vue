<template>
    <!-- 
        display a list of recent flashcards
     -->
     
</template>

<script setup>
    const flashcards = ref([])
    onMounted(async () => {
        try {
            const res = await fetch("http://localhost:3000/flashcard/recent")
            const data = await res.json()
            flashcards.value = data
        } catch (error) {
            console.error(error)
        }
    })
</script>