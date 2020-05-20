<template>
  <AuthTemplate>
    <template #title>
      Reset Password
    </template>
    <template #form>
      <v-text-field
        label="Code"
        v-model="code"
      />
      <v-text-field
        label="New Password"
        v-model="password"
      />
      <v-text-field
        label="Confirm Password"
        v-model="confirmPassword"
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
  name: 'reset-password',
  components: {
    AuthTemplate
  },
  data() {
    return {
      code: '',
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    ...mapActions('auth', ['login']),
    submit() {
      const payload = {
        password: this.password
      }
      this.login(payload)
    }
  }
}
</script>
