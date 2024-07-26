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

<script setup>
import { ref } from 'vue'

import { useAuthStore } from '@/stores/auth'
import AuthTemplate from './AuthTemplate.vue'

const { login } = useAuthStore()

const code = ref('')
const password = ref('')
const confirmPassword = ref('')

const submit = () => {
  const payload = {
    code: code.value,
    password: password.value,
    confirmPassword: confirmPassword.value
  }
  login(payload)
}
</script>
