<template>
  <v-row class="create-curriculum-page mt-10">
    <v-col
      md="4"
      offset-md="4"
      sm="6"
      offset-sm="3"
    >
      <v-row>
        <v-col>
          <v-form
            ref="user-info-form"
            v-model="validUserForm"
            lazy-validation
          >
            <v-card>
              <v-card-title>
                User Info
              </v-card-title>
              <v-card-text>
                <v-text-field
                  v-model="username"
                  label="Username"
                  :error-messages="usernameErrors()"
                  required
                  @input="$v.username.$touch()"
                  @blur="$v.username.$touch()"
                />

                <v-text-field
                  v-model="email"
                  label="E-mail"
                  :error-messages="emailErrors()"
                  required
                  @input="$v.email.$touch()"
                  @blur="$v.email.$touch()"
                />
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="primary"
                  @click.prevent="updateUserInfo"
                  :disabled="this.username === this.user.username && this.email === this.user.email"
                >
                  Save
                </v-btn>
                <v-spacer />
                <v-btn
                  text
                  color="error"
                  @click.prevent="reset"
                >
                  Reset Form
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-form
            ref="password-form"
            v-model="validPasswordForm"
            lazy-validation
          >
            <v-card>
              <v-card-title>
                Password
              </v-card-title>
              <v-card-text>
                <v-text-field
                  v-model="currentPassword"
                  label="Current Password"                  
                  :error-messages="currentPasswordErrors('currentPassword')"
                  required
                  @input="$v.currentPassword.$touch()"
                  @blur="$v.currentPassword.$touch()"
                />

                <v-text-field
                  v-model="newPassword"
                  label="New Password"
                  :error-messages="currentPasswordErrors('newPassword')"
                  required
                  @input="$v.newPassword.$touch()"
                  @blur="$v.newPassword.$touch()"
                />
                <v-text-field
                  v-model="confirmPassword"
                  label="Confirm New Password"
                  :error-messages="currentPasswordErrors('confirmPassword')"
                  required
                  @input="$v.confirmPassword.$touch()"
                  @blur="$v.confirmPassword.$touch()"
                />
              </v-card-text>
              <v-card-actions>
                <!-- <v-btn
                  color="error"
                  class="mr-4"
                  @click="reset"
                >
                  Reset Form
                </v-btn> -->

                <v-btn
                  color="primary"
                  :disabled="!currentPassword || !newPassword"
                  @click="updatePassword"
                >
                  Update
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { required, minLength, maxLength, sameAs, email } from 'vuelidate/lib/validators'
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      validUserForm: true,
      validPasswordForm: true,
      username: '',
      email: '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  },
  validations: {
    username: {
      minLength: minLength(3),
      maxLength: maxLength(20)
    },
    email: {
      email
    },
    currentPassword: {
      minLength: minLength(8),
      maxLength: maxLength(128),
      required
    },
    newPassword: {
      minLength: minLength(8),
      maxLength: maxLength(128),
      required
    },
    confirmPassword: {
      minLength: minLength(8),
      maxLength: maxLength(128),
      sameAs: sameAs('newPassword'),
      required
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  },
  methods: {
    ...mapActions('user', ['updateUser', 'updateUserPassword']),
    currentPasswordErrors(fieldName) {
      const errors = []
      if (!this.$v[fieldName].$dirty) return errors
      !this.$v[fieldName].required && errors.push('Password is required.')
      !this.$v[fieldName].minLength && errors.push('Password must be at least 8 characters long.')
      !this.$v[fieldName].maxLength && errors.push('Password must be at most 128 characters long.')
      if (fieldName === 'confirmPassword') {
        !this.$v[fieldName].sameAs && errors.push('Passwords must match.')
      }
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Invalid email.')
      return errors
    },
    usernameErrors() {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.minLength && errors.push('Username must be at least 3 characters long.')
      !this.$v.username.maxLength && errors.push('Username must be at most 20 characters long.')
      return errors
    },
    reset() {
      this.username = this.user.username
      this.email = this.user.email 
    },
    updateUserInfo() {
      if (this.username === this.user.username && this.email === this.user.email) {
        return false
      }

      const payload = {}
      if (this.username && !this.$v.username.$error) payload.username = this.username 
      if (this.email && !this.$v.email.$error) payload.email = this.email 
      this.updateUser(payload)
    },
    updatePassword() {
      if (!this.$v.newPassword.$error && !this.$v.confirmPassword.$error) {
        const payload = {
          oldPassword: this.currentPassword,
          newPassword: this.newPassword
        }
        this.updateUserPassword(payload)
        this.currentPassword = ''
        this.newPassword = ''
      }
    }
  },
  mounted() {
    this.username = this.user.username
    this.email = this.user.email
  }
}
</script>
