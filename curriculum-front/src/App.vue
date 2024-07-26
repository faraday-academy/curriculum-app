<template>
  <v-app>
    <TopNav :openDrawer="openDrawer" />
    <MobileDrawer :drawer="drawer" />

    <v-content mb-8>
      <RouterView />
    </v-content>
    <v-snackbar v-model="snackbar.show" :multi-line="true" :right="true" :top="true" :timeout="6000"
      :color="snackbar.variant">
      {{ snackbar.message }}
      <v-btn light text @click="snackbar.show = false">
        Close
      </v-btn>
    </v-snackbar>
    <v-overlay :value="loading">
      <v-progress-circular :model-value="loading" :color="'#fff'" />
    </v-overlay>
  </v-app>
</template>

<script setup>
import { RouterView } from 'vue-router'

import TopNav from '@/components/TopNav.vue'
import MobileDrawer from '@/components/MobileDrawer.vue'

const drawer = ref(false)

const { snackbar, loading } = toRefs(useStore())

const openDrawer = () => {
  drawer.value = true
}
</script>
