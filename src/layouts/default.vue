<template>
  <v-main :class="responsiveClass" max-width="800">
    <v-expand-transition>
      <v-alert
        v-if="alert.show"
        :type="alert.type"
        @click="alert.hideAlert"
        dismissible
        :text="alert.message"
      >
      </v-alert>
    </v-expand-transition>
    <router-view />
  </v-main>

  <AppFooter />
</template>

<script setup>
import { useAlertStore } from "@/stores/app"
import { watch } from "vue"
const alert = useAlertStore()

const responsiveClass = computed(() => {
  return {
    "w-100": true, // Full width on all screens
    "h-100": true, // Full height on all screens
    "ma-auto": true, // Center on large screens
    "pa-4": true, // Padding on all screens
  }
})

watch(
  () => alert.show,
  (newValue, oldValue) => {
    if (newValue) {
      setTimeout(() => {
        alert.hideAlert()
      }, 5000)
    }
  }
)
</script>
