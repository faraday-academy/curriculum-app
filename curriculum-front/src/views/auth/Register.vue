<template>
  <AuthTemplate>
    <template #title>
      Register
    </template>
    <template #form>
      <v-text-field
        label="Username"
        v-model="username"
        :error-messages="usernameErrors()"
        required
        @input="$v.username.$touch()"
        @blur="$v.username.$touch()"
      />
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
      <p class="pa-2">Already have an account? <router-link :to="{name: 'login'}">Login here</router-link></p>
    </template>
  </AuthTemplate>
</template>

<script>
import { mapActions } from 'vuex'
import { required, minLength, maxLength, email } from 'vuelidate/lib/validators'
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
  validations: {
    username: {
      minLength: minLength(3),
      maxLength: maxLength(20),
      required
    },
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
    ...mapActions('auth', ['register']),
    usernameErrors() {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.required && errors.push('Username is required.')
      !this.$v.username.minLength && errors.push('Username must be at least 3 characters long.')
      !this.$v.username.maxLength && errors.push('Username must be at most 20 characters long.')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.required && errors.push('E-mail is required.')
      !this.$v.email.email && errors.push('Invalid e-mail.')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.required && errors.push('Password is required.')
      !this.$v.password.minLength && errors.push('Password must be at least 8 characters long.')
      !this.$v.password.maxLength && errors.push('Password must be at most 128 characters long.')
      return errors
    },
    submit() {
      // TODO: implement form validation
      const payload = {
        username: this.username,
        email: this.email,
        password: this.password
      }
      this.register(payload)
    }
  }
}
</script>
