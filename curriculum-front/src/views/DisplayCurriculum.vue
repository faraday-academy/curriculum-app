<template>
  <v-row no-gutters class="display-curriculum-page">
    <v-col md="6" offset-md="3" sm="8" offset-sm="2">
      <Header :editField="editField" :selectedCurriculum="selectedCurriculum" :toggleEdit="toggleEdit"
        :saveEdit="saveEdit" :cancelEdit="cancelEdit" :canEdit="canEdit" />

      <Sections :dialog="dialog" :selectedCurriculum="selectedCurriculum" :toggleComplete="toggleComplete"
        :saveItem="saveItem" :removeItem="removeItem" :toggleDialog="toggleDialog" :canEdit="canEdit" />

      <FormSection v-if="showSectionForm" :k="`${selectedCurriculum.sections.length}`" :nameErrors="sectionNameErrors"
        :section="$v.tempSection" :sectionUrlErrors="sectionUrlErrors" :addItem="addItem" :canEdit="canEdit" />

      <v-btn v-if="!showSectionForm && canEdit()" color="primary" @click="toggleSectionForm">
        Add Section
      </v-btn>
      <div v-else-if="showSectionForm && canEdit()">
        <v-btn color="primary" @click="saveSection">
          Save Section
        </v-btn>
        <v-btn @click="toggleSectionForm">
          Cancel
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
// import { required, maxLength, url } from 'vuelidate/lib/validators'
import { onMounted, ref, toRefs } from 'vue'
import { useRoute } from 'vue-router'

import { useAuthStore } from '@/stores/auth'
import { useCurriculumStore } from '@/stores/curricula'
import { useGeneralStore } from '@/stores/general'

import Header from '@/components/display-curriculum/Header.vue'
import Sections from '@/components/display-curriculum/Sections.vue'
import FormSection from '@/components/create-form/FormSection.vue'

const authStore = useAuthStore()
const curriculumStore = useCurriculumStore()
const generalStore = useGeneralStore()
const route = useRoute()

const { user } = toRefs(authStore)
const { selectedCurriculum } = toRefs(curriculumStore.state)

const tempSection = ref({
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
const showSectionForm = ref(false)
const editField = ref('')
const dialog = ref({
  show: false,
  name: '',
  url: '',
  sectionIndex: null,
  itemIndex: null,
  type: '',
  isEditing: false
})

const toggleComplete = (type, sectionIndex, typeIndex) => {
  const { sections } = selectedCurriculum.value
  const section = sections[sectionIndex]
  const payload = {
    curriculum: selectedCurriculum.value,
    type,
    sectionId: section._id,
    item: section[type][typeIndex]
  }
  curriculumStore.patchItem(payload)
}

const toggleEdit = (field) => {
  editField.value = field
}

const cancelEdit = () => {
  editField.value = ''
}

const saveEdit = (field) => {
  const { _id } = selectedCurriculum.value

  const body = {
    [field]: selectedCurriculum.value[field]
  }
  const payload = {
    curriculumId: _id,
    body
  }
  curriculumStore.patchCurriculum(payload)
  editField.value = ''
}

const toggleDialog = (type, sectionIndex, itemIndex) => {
  if (dialog.value.show) {
    dialog.value.name = ''
    dialog.value.url = ''
    dialog.value.sectionIndex = null
    dialog.value.itemIndex = null
  } else if (itemIndex !== undefined) {
    dialog.value.itemIndex = itemIndex
    dialog.value.sectionIndex = sectionIndex
    dialog.value.isEditing = true

    const item = selectedCurriculum.value.sections[sectionIndex][`${type}s`][itemIndex]
    dialog.value.name = item.name
    dialog.value.url = item.url
  } else {
    dialog.value.sectionIndex = sectionIndex
    dialog.value.isEditing = false
  }
  dialog.value.show = !dialog.value.show
  dialog.value.type = type
}

const saveItem = (type) => {
  // type == 'resources' or 'projects'
  const { sections, _id } = selectedCurriculum.value
  const { name, url, sectionIndex, itemIndex, isEditing } = dialog.value
  const section = sections[sectionIndex]

  let body = {
    name
  }
  if (url) body.url = url
  let payload = {
    curriculumId: _id,
    sectionId: section._id,
    type,
    body
  }

  if (isEditing) {
    payload.itemId = section[type][itemIndex]._id
    curriculumStore.putItem(payload)
  } else {
    curriculumStore.postItem(payload)
  }

  dialog.value.name = ''
  dialog.value.url = ''
  dialog.value.show = false
}

const removeItem = (type, sectionIndex, itemIndex) => {
  const { sections, _id } = selectedCurriculum.value
  const section = sections[sectionIndex]

  const payload = {
    curriculumId: _id,
    sectionId: section._id,
    type,
    itemId: section[type][itemIndex]._id
  }
  curriculumStore.deleteItem(payload)
}

const addItem = (type) => {
  let key = `new${type[0].toUpperCase()}${type.slice(1)}`
  const item = tempSection.value[key]

  const urlCheck = !item.url || tempSection.value.$v[key].url
  const nameCheck = !!item.name

  if (nameCheck && urlCheck) {
    let obj = {
      name: item.name,
      url: item.url
    }
    tempSection.value[`${type}s`].push(obj)

    tempSection.value[key].name = ''
    tempSection.value[key].url = ''
  } else {
    const urlMessage = !urlCheck ? 'URL must be valid.' : ''
    const nameMessage = !nameCheck ? 'Must provide a name.' : ''
    const message = `${nameMessage} ${urlMessage}`
    generalStore.updateSnackbar({ message, show: true, variant: 'error' })
  }
}

const sectionNameErrors = () => {
  const errors = []
  if (!tempSection.value.$v.name.$dirty) return errors
  !tempSection.value.$v.name.maxLength && errors.push('Name must be at most 30 characters long.')
  !tempSection.value.$v.name.required && errors.push('Name is required.')
  return errors
}

const sectionUrlErrors = (i, type) => {
  const errors = []
  if (!tempSection.value.$v[`new${type}`].url.$model.length) return errors
  !tempSection.value.$v[`new${type}`].url.url && errors.push('Must be a valid url.')
  return errors
}

const toggleSectionForm = () => {
  if (showSectionForm.value) {
    clearSectionForm()
  }
  showSectionForm.value = !showSectionForm.value
}

const clearSectionForm = () => {
  tempSection.value.$reset()
  tempSection.value = {
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
}

const saveSection = () => {
  const { name, goal, resources, projects } = tempSection.value
  const body = {
    name,
    goal,
    resources,
    projects
  }
  const payload = {
    curriculumId: selectedCurriculum.value._id,
    body
  }
  curriculumStore.postSection(payload)

  clearSectionForm()
  toggleSectionForm()
}

const canEdit = () => {
  if (selectedCurriculum.value.createdBy === user.value.id) {
    return true
  }
  return false
}

onMounted(() => {
  curriculumStore.getCurriculum(route.params.id)
})
</script>

<style lang="sass" scoped>
.slide-fade-enter-active
  transition: all .3s ease

.slide-fade-leave-active
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)

.slide-fade-enter, .slide-fade-leave-to
  transform: translateX(10px)
  opacity: 0
</style>
