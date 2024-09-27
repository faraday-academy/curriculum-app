<template>
  <AuthTemplate>
    <template #title>
      Register
    </template>
    <template #form>
      <v-text-field label="Username" v-model="username" required variant="outlined" />
      <v-text-field label="Email" v-model="email" required variant="outlined" />
      <v-text-field label="Password" v-model="password" required variant="outlined" />
    </template>
    <template #actions>
      <v-btn @click="submit" color="primary" variant="outlined">Submit</v-btn>
    </template>
    <template #link>
      <p class="mb-1 mt-4">Already have an account? <router-link :to="{ name: 'login' }">Login here</router-link></p>
    </template>
  </AuthTemplate>
</template>

<script setup>
// import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'
import { ref } from 'vue'

import { useAuthStore } from '@/stores/auth'
import AuthTemplate from './AuthTemplate.vue'

const { register } = useAuthStore()

const username = ref('')
const email = ref('')
const password = ref('')

// validations: {
//   username: {
//     minLength: minLength(3),
//     maxLength: maxLength(20),
//     required
//   },
//   email: {
//     email,
//     required
//   },
//   password: {
//     minLength: minLength(8),
//     maxLength: maxLength(128),
//     required
//   }
// },

// function usernameErrors() {
//   const errors = []
//   if (!$v.username.$dirty) return errors
//   !$v.username.required && errors.push('Username is required.')
//   !$v.username.minLength && errors.push('Username must be at least 3 characters long.')
//   !$v.username.maxLength && errors.push('Username must be at most 20 characters long.')
//   return errors
// }

// function emailErrors() {
//   const errors = []
//   if (!$v.email.$dirty) return errors
//   !$v.email.required && errors.push('E-mail is required.')
//   !$v.email.email && errors.push('Invalid e-mail.')
//   return errors
// }

// function passwordErrors() {
//   const errors = []
//   if (!$v.password.$dirty) return errors
//   !$v.password.required && errors.push('Password is required.')
//   !$v.password.minLength && errors.push('Password must be at least 8 characters long.')
//   !$v.password.maxLength && errors.push('Password must be at most 128 characters long.')
//   return errors
// }

function submit() {
  // TODO: implement form validation
  const payload = {
    username: username.value,
    email: email.value,
    password: password.value,
  }
  register(payload)
}
</script>
