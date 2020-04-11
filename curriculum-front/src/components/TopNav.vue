<template>
  <v-toolbar color="info">
    <v-toolbar-title>Curricula App</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn to="/" text>
        Home
      </v-btn>
      <v-btn to="/curricula" text>
        View All
      </v-btn>
      <v-btn to="/curricula/create" text>
        Create
      </v-btn>
      <v-btn to="/login" color="secondary" class="black--text">
        Log In
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>
