<template>
  <v-navigation-drawer v-if="mobile" v-model="isDrawerOpen" app right temporary>
    <v-list dense>
      <v-list-item v-for="item in navItems" :key="item.name" :to="item.route" link>
        <template v-slot:prepend>
          <v-icon :icon="`mdi-${item.icon}`"></v-icon>
        </template>

        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, toRefs } from 'vue'
import { useDisplay } from 'vuetify'

import { useAuthStore } from '@/stores/auth'
import { useGeneralStore } from '@/stores/general'

const { mobile } = useDisplay()
const authStore = useAuthStore()
const generalStore = useGeneralStore()
const { isDrawerOpen } = toRefs(generalStore)

const navItems_ = [
  {
    title: 'Home',
    icon: 'home',
    route: '/',
  },
]
if (authStore.user.token) {
  navItems_.push(
    {
      title: 'View All',
      icon: 'view-list',
      route: '/curricula',
    },
    {
      title: 'Create',
      icon: 'plus',
      route: '/curricula/create',
    },
    {
      title: 'Settings',
      icon: 'cog',
      route: '/settings',
    },
    {
      title: 'Log Out',
      icon: 'logout',
      route: '/logout',
    },
  )
} else {
  navItems_.push(
    {
      title: 'Log In',
      icon: 'login',
      route: '/login',
    },
    {
      title: 'Register',
      icon: 'account-plus',
      route: '/register',
    },
  )
}
const navItems = ref(navItems_)
</script>
