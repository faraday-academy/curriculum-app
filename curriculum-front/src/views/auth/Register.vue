<template>
  <AuthTemplate>
    <template #title>
      Register
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
  name: 'register',
  components: {
    AuthTemplate
  }
}
</script>
