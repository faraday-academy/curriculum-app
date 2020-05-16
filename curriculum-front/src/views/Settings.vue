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
                  required
                />

                <v-text-field
                  v-model="email"
                  label="E-mail"
                  required
                />
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="primary"
                  @click.prevent="updateUserInfo"
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
                  required
                />

                <v-text-field
                  v-model="newPassword"
                  label="New Password"
                  required
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
                  @click="updatePassword"
                >
                  Save
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
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      validUserForm: true,
      validPasswordForm: true,
      username: '',
      email: '',
      currentPassword: '',
      newPassword: ''
    }
  },
  computed: {
    ...mapState('auth', ['user'])
  },
  methods: {
    ...mapActions('user', ['updateUser']),
    reset() {
      this.username = this.user.username
      this.email = this.user.email 
    },
    updateUserInfo() {
      const payload = {}
      if (this.username) payload.username = this.username 
      if (this.email) payload.email = this.email 
      this.updateUser(payload)
    },
    updatePassword() {

    }
  },
  mounted() {
    this.username = this.user.username
    this.email = this.user.email
  }
}
</script>
