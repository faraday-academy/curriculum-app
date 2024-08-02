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
        <v-text-field v-model="$v.curriculumInfo.name.$model" :error-messages="nameErrors" required
          @input="$v.curriculumInfo.name.$touch()" @blur="$v.curriculumInfo.name.$touch()" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-subheader>Goal</v-subheader>
      </v-col>
      <v-col cols="9">
        <v-text-field v-model="curriculumInfo.goal" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-label>Description</v-label>
        <v-textarea solo name="description" v-model="curriculumInfo.description" />
      </v-col>
    </v-row>

    <FormSections :sections="sections" :addItem="addItem" :deleteItem="deleteItem" :v="$v"
      :nameErrors="sectionNameErrors" :sectionUrlErrors="sectionUrlErrors" :deleteSection="deleteSection" />

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
// import { required, maxLength, url } from 'vuelidate/lib/validators'
import { ref, computed } from 'vue'
import FormSections from './FormSections.vue'
import { useCurriculumStore } from '@/stores/curriculum'

const curriculumStore = useCurriculumStore()

const curriculumInfo = ref({
  name: '',
  goal: '',
  description: ''
})

const sections = ref([
  {
    name: '',
    goal: '',
    newResource: {
      url: '',
      name: ''
    },
    resources: [],
    newProject: {
      url: '',
      name: ''
    },
    projects: []
  }
])

const nameErrors = computed(() => {
  const errors = []
  if (!curriculumInfo.value.name.$dirty) return errors
  !curriculumInfo.value.name.maxLength && errors.push('Name must be at most 20 characters long.')
  !curriculumInfo.value.name.required && errors.push('Name is required.')
  return errors
})

const sectionNameErrors = (i) => {
  const errors = []
  if (!sections.value[i].name.$dirty) return errors
  !sections.value[i].name.maxLength && errors.push('Name must be at most 30 characters long.')
  !sections.value[i].name.required && errors.push('Name is required.')
  return errors
}

const sectionUrlErrors = (i, type) => {
  const errors = []
  if (!sections.value[i][`new${type}`].url.$model.length) return errors
  !sections.value[i][`new${type}`].url.url && errors.push('Must be a valid url.')
  return errors
}

const addSection = () => {
  sections.value.push({
    name: '',
    goal: '',
    newResource: {
      url: '',
      name: ''
    },
    resources: [],
    newProject: {
      url: '',
      name: ''
    },
    projects: []
  })
}

const deleteSection = (index) => {
  sections.value.splice(index, 1)
}

const addItem = (type, i) => {
  let key = `new${type[0].toUpperCase()}${type.slice(1)}`
  const item = sections.value[i][key]

  const urlCheck = !item.url || sections.value[i][key].url.url
  const nameCheck = !!item.name

  if (nameCheck && urlCheck) {
    let obj = {
      name: item.name,
      url: item.url
    }
    sections.value[i][`${type}s`].push(obj)

    sections.value[i][key].name = ''
    sections.value[i][key].url = ''
  } else {
    const urlMessage = !urlCheck ? 'URL must be valid.' : ''
    const nameMessage = !nameCheck ? 'Must provide a name.' : ''
    const message = `${nameMessage} ${urlMessage}`
    updateSnackbar({ message, show: true, variant: 'error' })
  }
}

const deleteItem = (type, sectionIndex, itemIndex) => {
  sections.value[sectionIndex][type].splice(itemIndex, 1)
}

const submit = () => {
  curriculumStore.saveCurriculum(curriculumInfo.value, sections.value)
}
</script>
