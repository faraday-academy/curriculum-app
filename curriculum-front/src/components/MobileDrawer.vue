<template>
  <v-navigation-drawer
    v-if="$vuetify.breakpoint.xsOnly"
    v-model="drawer"
    app
    right
    temporary
  >
    <v-list dense>
      <v-list-item
        v-for="item in navItems"
        :key="item.name"
        link
      >
        <v-list-item-icon>
          <v-icon>mdi-{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    drawer: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      navItems: [
        {
          name: 'Home',
          icon: 'home'
        },
        {
          name: 'View All',
          icon: 'magnify'
        }
      ]
    }
  }
}
</script>
