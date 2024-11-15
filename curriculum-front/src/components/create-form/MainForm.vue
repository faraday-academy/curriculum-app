<template>
  <v-form class="create-form">
    <div class="page-header">
      <h1>Create Curriculum</h1>
      <v-btn color="primary" @click.prevent="submit">
        Save
      </v-btn>
    </div>
    <v-row>
      <v-col cols="3">
        <v-subheader>Name *</v-subheader>
      </v-col>
      <v-col cols="9">
        <v-text-field v-model="state.selectedCurriculum.name" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-subheader>Goal</v-subheader>
      </v-col>
      <v-col cols="9">
        <v-text-field v-model="state.selectedCurriculum.goal" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-label>Description</v-label>
        <v-textarea solo name="description" v-model="state.selectedCurriculum.description" />
      </v-col>
    </v-row>

    <FormSections />

    <v-row>
      <v-col cols="12">
        <v-btn color="secondary" class="black--text" @click="addSection">
          Add Section
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup>
import { toRefs } from 'vue'

import FormSections from './FormSections.vue'
import { useAuthStore } from '@/stores/auth'
import { useCurriculumStore } from '@/stores/curricula'

const curriculumStore = useCurriculumStore()
const authStore = useAuthStore()
const { user } = toRefs(authStore)

const { state } = toRefs(curriculumStore)

const submit = () => {
  state.value.selectedCurriculum.createdBy = user.value.id
  curriculumStore.postCurriculum()
}
</script>
