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

<script>
import { mapActions, mapState } from 'vuex'
import AuthTemplate from './AuthTemplate'

export default {
  name: 'verify',
  components: {
    AuthTemplate
  },
  data () {
    return {
      code: '',
      email: ''
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  },
  methods: {
    ...mapActions('auth', ['verify']),
    submit () {
      const payload = {
        email: this.email,
        code: this.code
      }
      this.verify(payload)
    }
  },
  mounted () {
    this.email = this.user.email
  }
}
</script>
