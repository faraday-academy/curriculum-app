<template>
  <v-toolbar color="info">
    <v-toolbar-title>
      <v-icon left>mdi-school</v-icon>
      <b>
        <router-link to="/" style="text-decoration: none; color: black; outline: none">
          Curricula App
        </router-link>
      </b>
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'" text="Toggle Theme" slim
      @click="toggleTheme" variant="outlined" class="mr-4" />

    <v-toolbar-items v-if="mobile">
      <v-btn @click="openDrawer()">
        Menu
      </v-btn>
    </v-toolbar-items>

    <v-toolbar-items v-else>
      <v-btn to="/" exact text>
        Home
      </v-btn>
      <v-btn to="/curricula" exact text>
        View All
      </v-btn>
      <v-btn v-if="user.token" to="/curricula/create" text>
        Create
      </v-btn>
      <v-btn v-if="!user.token" to="/login">
        Log In
      </v-btn>

      <v-menu v-else left bottom offset-y>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" color="secondary">
            <v-icon left>mdi-account-outline</v-icon>
            {{ user.username }}
          </v-btn>
        </template>

        <v-list>
          <v-list-item to="/settings">
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item>
          <v-list-item @click="logout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script setup>
import { ref, toRefs } from 'vue'
import { useDisplay } from 'vuetify'

import { useAuthStore } from '@/stores/auth'

const { mobile } = useDisplay()
const openDrawer = ref(null)

const logout = () => {
  authStore.logUserOut()
}

const authStore = useAuthStore()
const { user } = toRefs(authStore)

const props = defineProps({
  theme: {
    type: String,
    required: true,
  }
})

const emit = defineEmits(['update:theme'])

function toggleTheme() {
  const newTheme = props.theme === 'light' ? 'dark' : 'light'
  emit('update:theme', newTheme)
}
</script>
