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
  <!-- <div style="position: fixed; bottom:0; width:100%; height: 40px" class="border ma-auto" >
    <div style="width: 100%; max-width: 800px;" class="ma-auto border">
      home
    </div>
  </div> -->
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
    "pb-10": true, // 为footer留出空间
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
