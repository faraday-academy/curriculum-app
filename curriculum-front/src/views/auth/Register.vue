<template>
  <AuthTemplate>
    <template #title>
      Register
    </template>
    <template #form>
      <v-text-field
        label="Username"
        v-model="username"
      />
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
      <v-btn color="primary">Submit</v-btn>
    </template>
    <template #link>
      <p class="pa-2">Already have an account? <router-link :to="{name: 'login'}">Login here</router-link></p>
    </template>
  </AuthTemplate>
</template>

<script>
import AuthTemplate from './AuthTemplate'

export default {
  name: 'register',
  components: {
    AuthTemplate
  },
  data() {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register() {

    }
  }
}
</script>
