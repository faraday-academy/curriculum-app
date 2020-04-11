<template>
  <AuthTemplate>
    <template #title>
      Login
    </template>
    <template #form>
      Form
    </template>
    <template #actions>
      <v-btn>Submit</v-btn>
    </template>
  </AuthTemplate>
</template>

<script>
import AuthTemplate from './AuthTemplate'

export default {
  name: 'login',
  components: {
    AuthTemplate
  }
}
</script>
