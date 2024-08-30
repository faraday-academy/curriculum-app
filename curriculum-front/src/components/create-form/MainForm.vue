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
        <v-text-field v-model="state.selectedCurriculum.name" :error-messages="nameErrors" />
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
import { computed, toRefs } from 'vue'
import FormSections from './FormSections.vue'
import { useCurriculumStore } from '@/stores/curricula/curriculums'

const curriculumStore = useCurriculumStore()

const { state } = toRefs(curriculumStore)

const nameErrors = computed(() => {
  const errors = []
  if (!state.value.selectedCurriculum.value.name.$dirty) return errors
  !state.value.selectedCurriculum.value.name.maxLength && errors.push('Name must be at most 20 characters long.')
  !state.value.selectedCurriculum.value.name.required && errors.push('Name is required.')
  return errors
})

// const sectionNameErrors = (i) => {
//   const errors = []
//   if (!sections.value[i].name.$dirty) return errors
//   !sections.value[i].name.maxLength && errors.push('Name must be at most 30 characters long.')
//   !sections.value[i].name.required && errors.push('Name is required.')
//   return errors
// }

// const sectionUrlErrors = (i, type) => {
//   const errors = []
//   if (!sections.value[i][`new${type}`].url.$model.length) return errors
//   !sections.value[i][`new${type}`].url.url && errors.push('Must be a valid url.')
//   return errors
// }

const submit = () => {
  curriculumStore.patchCurriculum()
}
</script>
