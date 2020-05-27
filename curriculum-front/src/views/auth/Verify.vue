<template>
  <AuthTemplate>
    <template #title>
      Verify E-mail
    </template>
    <template #form>
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

<script>
import { mapActions } from 'vuex'
import AuthTemplate from './AuthTemplate'

export default {
  name: 'verify',
  components: {
    AuthTemplate
  },
  data() {
    return {
      code: '',
    }
  },
  methods: {
    ...mapActions('auth', ['']),
    submit() {
      const payload = {
        code: this.code
      }
    }
  }
}
</script>
