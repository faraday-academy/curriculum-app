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
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
      />
      <v-text-field
        label="Password"
        v-model="password"
        :error-messages="passwordErrors()"
        required
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
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

<script>
import { mapActions } from 'vuex'
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'
import AuthTemplate from './AuthTemplate'

export default {
  name: 'login',
  components: {
    AuthTemplate
  },
  data () {
    return {
      email: '',
      password: ''
    }
  },
  validations: {
    email: {
      email,
      required
    },
    password: {
      minLength: minLength(8),
      maxLength: maxLength(128),
      required
    }
  },
  methods: {
    ...mapActions('auth', ['login']),
    emailErrors () {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.required && errors.push('E-mail is required.')
      !this.$v.email.email && errors.push('Invalid email.')
      return errors
    },
    passwordErrors () {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password is required.')
      !this.$v.password.minLength && errors.push('Password must be at least 8 characters long.')
      !this.$v.password.maxLength && errors.push('Password must be at most 128 characters long.')
      return errors
    },
    submit () {
      const payload = {
        email: this.email,
        password: this.password
      }
      this.login(payload)
    }
  }
}
</script>
