<template>
  <AuthTemplate>
    <template #title>
      Login
    </template>
    <template #form>
      <v-text-field
        label="Email"
        v-model="email"
      />
      <v-text-field
        label="Password"
        v-model="password"
      />
    </template>
    <template #actions>
      <v-btn @click="submit" color="primary">Submit</v-btn>
    </template>
    <template #link>
      <p class="pa-2">Don't have an account? <router-link :to="{name: 'register'}">Register here</router-link></p>
    </template>
  </AuthTemplate>
</template>

<script>
import { mapActions } from 'vuex'
import AuthTemplate from './AuthTemplate'

export default {
  name: 'login',
  components: {
    AuthTemplate
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions('auth', ['login']),
    submit() {
      const payload = {
        email: this.email,
        password: this.password
      }
      this.login(payload)
    }
  }
}
</script>
