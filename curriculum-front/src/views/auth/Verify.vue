<template>
  <AuthTemplate>
    <template #title>
      Verify E-mail
    </template>
    <template #form>
      <v-text-field label="Email" v-model="email" :error-messages="emailErrors" required variant="outlined" />
      <v-text-field label="Code" v-model="code" :error-messages="emailErrors" required variant="outlined" />
    </template>
    <template #actions>
      <v-btn @click="submit" color="primary" variant="outlined">Verify</v-btn>
    </template>
    <template #link>
      <p class="mb-1 mt-4">Don't have an account? <router-link :to="{ name: 'register' }">Register here</router-link>
      </p>
    </template>
  </AuthTemplate>
</template>

<script setup>
import { ref, toRefs } from 'vue'

import { useAuthStore } from '@/stores/auth'
import AuthTemplate from './AuthTemplate.vue'

const authStore = useAuthStore()
const { user } = toRefs(authStore)

const code = ref('')
const email = ref(user.value.email)

const submit = () => {
  const payload = {
    email: email.value,
    code: code.value
  }
  authStore.verify(payload)
}
</script>
