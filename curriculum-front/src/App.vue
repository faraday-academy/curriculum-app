<template>
  <v-app id="app">
    <TopNav :openDrawer="openDrawer" />
    <MobileDrawer :drawer="drawer" />

    <v-content mb-8>
      <router-view/>
    </v-content>
    <v-snackbar
      v-model="snackbar.show"
      :multi-line="true"
      :right="true"
      :top="true"
      :timeout="6000"
      :color="snackbar.variant"
    >
      {{ snackbar.message }}
      <v-btn
        light
        text
        @click="updateSnackbar({show: false})"
      >
        Close
      </v-btn>
    </v-snackbar>
    <v-overlay :value="loading">
      <rotate-loader
        :loading="loading"
        :color="'#fff'"
      />
    </v-overlay>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import TopNav from '@/components/TopNav.vue'
import MobileDrawer from '@/components/MobileDrawer.vue'

export default {
  components: {
    TopNav,
    MobileDrawer
  },
  data () {
    return {
      drawer: false
    }
  },
  computed: {
    ...mapState(['snackbar', 'loading'])
  },
  methods: {
    ...mapMutations(['updateSnackbar']),
    openDrawer () {
      this.drawer = true
    }
  }
}
</script>
