<template>
  <AuthTemplate>
    <template #title>
      Login
    </template>
    <template #form>
      <v-text-field
        label="Email"
        v-model="email"
        :error-messages="emailErrors()"
        required
      />
      <v-text-field
        label="Password"
        v-model="password"
        :error-messages="passwordErrors()"
        required
      />
    </template>
    <template #actions>
      <v-btn @click="submit" color="primary">Submit</v-btn>
    </template>
    <template #link>
      <p class="pa-2 mb-n1">Forgot Password? <router-link :to="{name: 'forgot-password'}">Update password here</router-link></p>
      <p class="pa-2">Don't have an account? <router-link :to="{name: 'register'}">Register here</router-link></p>
    </template>
  </AuthTemplate>
</template>

<script setup>
// import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'
import { computed, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import AuthTemplate from './AuthTemplate.vue'

const { login } = useAuthStore()

const email = ref('')
const password = ref('')
// validations: {
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

const emailErrors = computed(() => {
  const errors = []
  if (!email.value) return errors
  !email.value.includes('@') && errors.push('Invalid email.')
  return errors
})

const passwordErrors = computed(() => {
  const errors = []
  if (!password.value) return errors
  password.value.length < 8 && errors.push('Password must be at least 8 characters long.')
  return errors
})

const submit = () => {
  const payload = {
    email: email.value,
    password: password.value
  }
  login(payload)
}
</script>
