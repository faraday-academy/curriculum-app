<template>
  <v-sheet
    height="400px"
    class="overflow-hidden"
    style="position: relative;"
  >
    <v-container class="fill-height">
      <v-row
        align="center"
        justify="center"
        no-gutters
      >
        <v-col class="text-center">
          <h1 class="display-3 mb-6">Curricula App</h1>
          <h3 class="display-1 mb-6">
            Create, share, and track your learning curricula.<br>
            All for free!
          </h3>
          <v-btn
            v-if="!user.username"
            light
            large
            outlined
            to="/register"
            color="primary"
          >
            Sign Up
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('auth', ['user'])
  }
}
</script>
