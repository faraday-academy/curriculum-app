<template>
  <v-row class="create-curriculum-page mt-10">
    <v-col md="4" offset-md="4" sm="6" offset-sm="3">
      <v-row>
        <v-col>
          <v-form ref="user-info-form" v-model="validUserForm" lazy-validation>
            <v-card>
              <v-card-title>
                User Info
              </v-card-title>
              <v-card-text>
                <v-text-field v-model="username" label="Username" :error-messages="usernameErrors()" required
                  @input="$v.username.$touch()" @blur="$v.username.$touch()" />

                <v-text-field v-model="email" label="E-mail" :error-messages="emailErrors()" required
                  @input="$v.email.$touch()" @blur="$v.email.$touch()" />
              </v-card-text>
              <v-card-actions>
                <v-btn color="primary" @click.prevent="updateUserInfo"
                  :disabled="this.username === this.user.username && this.email === this.user.email">
                  Save
                </v-btn>
                <v-spacer />
                <v-btn text color="error" @click.prevent="reset">
                  Reset Form
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-form ref="password-form" v-model="validPasswordForm" lazy-validation>
            <v-card>
              <v-card-title>
                Password
              </v-card-title>
              <v-card-text>
                <v-text-field v-model="currentPassword" label="Current Password"
                  :error-messages="currentPasswordErrors('currentPassword')" required
                  @input="$v.currentPassword.$touch()" @blur="$v.currentPassword.$touch()" />

                <v-text-field v-model="newPassword" label="New Password"
                  :error-messages="currentPasswordErrors('newPassword')" required @input="$v.newPassword.$touch()"
                  @blur="$v.newPassword.$touch()" />
                <v-text-field v-model="confirmPassword" label="Confirm New Password"
                  :error-messages="currentPasswordErrors('confirmPassword')" required
                  @input="$v.confirmPassword.$touch()" @blur="$v.confirmPassword.$touch()" />
              </v-card-text>
              <v-card-actions>
                <!-- <v-btn
                  color="error"
                  class="mr-4"
                  @click="reset"
                >
                  Reset Form
                </v-btn> -->

                <v-btn color="primary" :disabled="!currentPassword || !newPassword" @click="updatePassword">
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

<script setup>
import { required, minLength, maxLength, sameAs, email } from 'vuelidate/lib/validators'
import { mapState, mapActions } from 'vuex'

const { user } = toRefs(useStore())

const validUserForm = ref(true)
const validPasswordForm = ref(true)
const username = ref('')
const email = ref('')
const currentPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')

// validations: {
//   username: {
//     minLength: minLength(3),
//     maxLength: maxLength(20)
//   },
//   email: {
//     email
//   },
//   currentPassword: {
//     minLength: minLength(8),
//     maxLength: maxLength(128),
//     required
//   },
//   newPassword: {
//     minLength: minLength(8),
//     maxLength: maxLength(128),
//     required
//   },
//   confirmPassword: {
//     minLength: minLength(8),
//     maxLength: maxLength(128),
//     sameAs: sameAs('newPassword'),
//     required
//   }
// },

const usernameErrors = () => {
  const errors = []
  if (!$v.username.$dirty) return errors
  !$v.username.minLength && errors.push('Username must be at least 3 characters long.')
  !$v.username.maxLength && errors.push('Username must be at most 20 characters long.')
  return errors
}

const emailErrors = () => {
  const errors = []
  if (!$v.email.$dirty) return errors
  !$v.email.email && errors.push('Invalid email.')
  return errors
}

const currentPasswordErrors = (fieldName) => {
  const errors = []
  if (!$v[fieldName].$dirty) return errors
  !$v[fieldName].required && errors.push('Password is required.')
  !$v[fieldName].minLength && errors.push('Password must be at least 8 characters long.')
  !$v[fieldName].maxLength && errors.push('Password must be at most 128 characters long.')
  if (fieldName === 'confirmPassword') {
    !$v[fieldName].sameAs && errors.push('Passwords must match.')
  }
  return errors
}

const reset = () => {
  username.value = user.value.username
  email.value = user.value.email
}

const updateUserInfo = () => {
  if (username.value === user.value.username && email.value === user.value.email) {
    return false
  }

  const payload = {}
  if (username.value && !$v.username.$error) payload.username = username.value
  if (email.value && !$v.email.$error) payload.email = email.value
  updateUser(payload)
}

const updatePassword = () => {
  if (!$v.newPassword.$error && !$v.confirmPassword.$error) {
    const payload = {
      oldPassword: currentPassword.value,
      newPassword: newPassword.value
    }
    updateUserPassword(payload)
    currentPassword.value = ''
    newPassword.value = ''
  }
}

onMounted(() => {
  username.value = user.value.username
  email.value = user.value.email
})

// ...mapActions('user', ['updateUser', 'updateUserPassword']),
</script>
