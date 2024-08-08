<template>
  <AuthTemplate>
    <template #title>
      Verify E-mail
    </template>
    <template #form>
      <v-text-field
        label="E-mail"
        v-model="email"
      />
      <v-text-field
        label="Code"
        v-model="code"
      />
    </template>
    <template #actions>
      <v-btn @click="submit" color="primary">Verify</v-btn>
    </template>
    <template #link>
      <p class="pa-2">Don't have an account? <router-link :to="{name: 'register'}">Register here</router-link></p>
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
