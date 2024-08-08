<template>
  <v-app>
    <TopNav :openDrawer="openDrawer" />
    <MobileDrawer />

    <v-content mb-8>
      <RouterView />
    </v-content>
    <v-snackbar v-model="snackbarOptions.show" :multi-line="true" :right="true" :top="true" :timeout="6000"
      :color="snackbarOptions.variant">
      {{ snackbarOptions.message }}
      <v-btn light text @click="snackbarOptions.show = false">
        Close
      </v-btn>
    </v-snackbar>
    <v-overlay :value="isLoading">
      <v-progress-circular :model-value="loading" :color="'#fff'" />
    </v-overlay>
  </v-app>
</template>

<script setup>
import { toRefs } from 'vue'
import { RouterView } from 'vue-router'
import { useGeneralStore } from '@/stores/general'

import TopNav from '@/components/TopNav.vue'
import MobileDrawer from '@/components/MobileDrawer.vue'

const generalStore = useGeneralStore()
const { snackbarOptions, isLoading } = toRefs(generalStore)
</script>
