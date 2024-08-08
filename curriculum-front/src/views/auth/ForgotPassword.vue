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

<script setup>
import { ref } from 'vue'
import AuthTemplate from './AuthTemplate.vue'

const email = ref('')

const submit = () => {
  const payload = {
    email: email.value
  }
  console.log(payload)
}
</script>
