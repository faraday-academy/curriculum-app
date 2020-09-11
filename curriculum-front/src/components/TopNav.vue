<template>
  <v-toolbar color="info">
    <v-toolbar-title>
      <v-icon left>mdi-school</v-icon>
      <b>Curricula App</b>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn to="/" exact text>
        Home
      </v-btn>
      <v-btn to="/curricula" exact text>
        View All
      </v-btn>
      <v-btn v-if="user.token" to="/curricula/create" text>
        Create
      </v-btn>
      <v-btn v-if="!user.token" to="/login" color="secondary" class="black--text">
        Log In
      </v-btn>

      <v-menu
        v-else
        left
        bottom
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" color="secondary" class="black--text">
            <v-icon left>mdi-account-outline</v-icon>
            {{ user.username }}
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            to="/settings"
          >
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item>
          <v-list-item
            @click="logout"
          >
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('auth', ['user'])
  },
  methods: {
    ...mapActions('auth', ['logUserOut']),
    logout () {
      this.logUserOut()
    }
  }
}
</script>
