<template>
  <AuthTemplate>
    <template #title>
      Forgot Password
    </template>
    <template #form>
      <v-text-field
        label="Email"
        v-model="email"
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
  name: 'forgot-password',
  components: {
    AuthTemplate
  },
  data() {
    return {
      email: '',
    }
  },
  methods: {
    ...mapActions('auth', ['']),
    submit() {
      const payload = {
        email: this.email
      }
    }
  }
}
</script>
