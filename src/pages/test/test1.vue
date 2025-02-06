<template>
    <v-container>
        <v-row>
            <v-col v-for="(card, index) in cards" :key="index"
            cols="12" sm="6" md="4" lg="3" >
                <v-card max-width="300" >
                    <v-card-title>{{ card.title }}</v-card-title>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
const cards = [
    { title: "a", },
    { title: "b", },
    { title: "c", },
    { title: "d", },
    { title: "e", },
    { title: "f", },
    { title: "g", },
    { title: "h", },
    { title: "i", },
    { title: "j", },
    { title: "k", },
    { title: "l", },
]
</script>