<template>
  <v-app id="app">
    <TopNav />
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
import TopNav from './components/TopNav.vue'

export default {
  components: {
    TopNav
  },
  data () {
    return {
      loading: false
    }
  },
  computed: {
    ...mapState(['snackbar'])
  },
  methods: {
    ...mapMutations(['updateSnackbar'])
  }
}
</script>
