<template>
  <v-row no-gutters class="display-curriculum-page">
    <v-col
      md="6"
      offset-md="3"
      sm="8"
      offset-sm="2"
    >
      <Header
        :editField="editField"
        :selectedCurriculum="selectedCurriculum"
        :toggleEdit="toggleEdit"
        :saveEdit="saveEdit"
        :cancelEdit="cancelEdit"
        :canEdit="canEdit"
      />

      <Sections
        :dialog="dialog"
        :selectedCurriculum="selectedCurriculum"
        :toggleComplete="toggleComplete"
        :saveItem="saveItem"
        :removeItem="removeItem"
        :toggleDialog="toggleDialog"
        :canEdit="canEdit"
      />

      <FormSection
        v-if="showSectionForm"
        :k="`${selectedCurriculum.sections.length}`"
        :nameErrors="sectionNameErrors"
        :section="$v.tempSection"
        :sectionUrlErrors="sectionUrlErrors"
        :addItem="addItem"
        :canEdit="canEdit"
      />

      <v-btn
        v-if="!showSectionForm && canEdit()"
        color="primary"
        @click="toggleSectionForm"
      >
        Add Section
      </v-btn>
      <div v-else-if="showSectionForm && canEdit()">
        <v-btn
          color="primary"
          @click="saveSection"
        >
          Save Section
        </v-btn>
        <v-btn @click="toggleSectionForm">
          Cancel
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { required, maxLength, url } from 'vuelidate/lib/validators'
import Header from '@/components/display-curriculum/Header.vue'
import Sections from '@/components/display-curriculum/Sections.vue'
import FormSection from '@/components/create-form/FormSection.vue'

export default {
  name: 'DisplayCurriculum',
  components: {
    Header,
    Sections,
    FormSection
  },
  data () {
    return {
      tempSection: {
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
      },
      showSectionForm: false,
      editField: '',
      dialog: {
        type: '',
        show: false,
        name: '',
        url: '',
        isEditing: false,
        itemIndex: null,
        sectionIndex: null
      }
    }
  },
  validations: {
    tempSection: {
      name: {
        required,
        maxLength: maxLength(30)
      },
      goal: {},
      newResource: {
        url: {
          url
        },
        name: {}
      },
      newProject: {
        url: {
          url
        },
        name: {}
      },
      resources: {},
      projects: {}
    }
  },
  computed: {
    ...mapState(['selectedCurriculum']),
    ...mapState('auth', ['user'])
  },
  methods: {
    ...mapActions([
      'getCurriculum',
      'patchCurriculum',
      'postSection',
      'patchSection',
      'patchItem',
      'postItem',
      'putItem',
      'deleteItem'
    ]),
    toggleComplete (type, sectionIndex, typeIndex) {
      const { sections, _id } = this.selectedCurriculum
      const section = sections[sectionIndex]
      const payload = {
        curriculum: this.selectedCurriculum,
        type,
        sectionId: section._id,
        item: section[type][typeIndex]
      }
      this.patchItem(payload)
    },
    toggleEdit (field) {
      this.editField = field
    },
    cancelEdit () {
      this.editField = ''
    },
    saveEdit (field) {
      const { _id } = this.selectedCurriculum

      const body = {
        [field]: this.selectedCurriculum[field]
      }
      const payload = {
        curriculumId: _id,
        body
      }
      this.patchCurriculum(payload)
      this.editField = ''
    },
    toggleDialog (type, sectionIndex, itemIndex) {
      if (this.dialog.show) {
        this.dialog.name = ''
        this.dialog.url = ''
        this.dialog.sectionIndex = null
        this.dialog.itemIndex = null
      } else if (itemIndex !== undefined) {
        this.dialog.itemIndex = itemIndex
        this.dialog.sectionIndex = sectionIndex
        this.dialog.isEditing = true

        const item = this.selectedCurriculum.sections[sectionIndex][`${type}s`][itemIndex]
        this.dialog.name = item.name
        this.dialog.url = item.url
      } else {
        this.dialog.sectionIndex = sectionIndex
        this.dialog.isEditing = false
      }
      this.dialog.show = !this.dialog.show
      this.dialog.type = type
    },
    saveItem (type) {
      // type == 'resources' or 'projects'
      const { sections, _id } = this.selectedCurriculum
      const { name, url, sectionIndex, itemIndex, isEditing } = this.dialog
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
        this.putItem(payload)
      } else {
        this.postItem(payload)
      }

      this.dialog.name = ''
      this.dialog.url = ''
      this.dialog.show = false
    },
    removeItem (type, sectionIndex, itemIndex) {
      const { sections, _id } = this.selectedCurriculum
      const section = sections[sectionIndex]

      const payload = {
        curriculumId: _id,
        sectionId: section._id,
        type,
        itemId: section[type][itemIndex]._id
      }
      this.deleteItem(payload)
    },
    addItem (type, i) {
      let key = `new${type[0].toUpperCase()}${type.slice(1)}`
      const item = this.tempSection[key]

      const urlCheck = !item.url || this.$v.tempSection[key].url.url
      const nameCheck = !!item.name

      if (nameCheck && urlCheck) {
        let obj = {
          name: item.name,
          url: item.url
        }
        this.tempSection[`${type}s`].push(obj)

        this.tempSection[key].name = ''
        this.tempSection[key].url = ''
      } else {
        const urlMessage = !urlCheck ? 'URL must be valid.' : ''
        const nameMessage = !nameCheck ? 'Must provide a name.' : ''
        const message = `${nameMessage} ${urlMessage}`
        this.updateSnackbar({ message, show: true, variant: 'error' })
      }
    },
    sectionNameErrors (i) {
      const errors = []
      if (!this.$v.tempSection.name.$dirty) return errors
      !this.$v.tempSection.name.maxLength && errors.push('Name must be at most 30 characters long.')
      !this.$v.tempSection.name.required && errors.push('Name is required.')
      return errors
    },
    sectionUrlErrors (i, type) {
      const errors = []
      if (!this.$v.tempSection[`new${type}`].url.$model.length) return errors
      !this.$v.tempSection[`new${type}`].url.url && errors.push('Must be a valid url.')
      return errors
    },
    toggleSectionForm () {
      if (this.showSectionForm) {
        this.clearSectionForm()
      }
      this.showSectionForm = !this.showSectionForm
    },
    clearSectionForm () {
      this.$v.$reset()
      this.tempSection = {
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
    },
    saveSection () {
      const { name, goal, resources, projects } = this.tempSection
      const body = {
        name,
        goal,
        resources,
        projects
      }
      const payload = {
        curriculumId: this.selectedCurriculum._id,
        body
      }
      this.postSection(payload)

      this.clearSectionForm()
      this.toggleSectionForm()
    },
    canEdit () {
      if (this.selectedCurriculum.createdBy === this.user.id) {
        return true
      }
      return false
    }
  },
  mounted () {
    this.getCurriculum(this.$route.params.id)
  }
}
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
