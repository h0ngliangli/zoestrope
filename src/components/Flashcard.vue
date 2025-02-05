<template>
  <v-card>
    <v-card-title>{{ question }}</v-card-title>
    <v-card-text>
      <v-text-field
        v-if="editable"
        v-model="answer"
        label="Answer"
        outlined
      ></v-text-field>
      <div v-else>{{ answer }}</div>
      <div>{{ note }}</div>
      <v-img :src="img_url" v-if="img_url" :width="300">
        <template v-slot:placeholder>
          <v-row align="center" class="fill-height ma-0" justify="center">
            <v-progress-circular
              color="grey-lighten-5"
              indeterminate
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </v-card-text>
    <v-card-actions>
      <v-btn v-if="editable" @click="submitAnsffwer">Submit</v-btn>
      <v-btn v-if="deletable" @click="deleteCard">Delete</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref } from "vue"

const props = defineProps({
  question: String,
  answer: String,
  note: String,
  img_url: String,
  mode: {
    type: String,
    default: "readonly",
    validator: (value) => ["readonly", "editable", "deletable"].includes(value),
  },
})

const editable = ref(props.mode === "editable")
const deletable = ref(props.mode === "deletable")

const answer = ref(props.answer)

function submitAnswer() {
  // handle answer submission
}

function deleteCard() {
  // handle card deletion
}
</script>
