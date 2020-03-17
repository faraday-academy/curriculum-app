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
      />

      <Sections
        :showResourceForm="showResourceForm"
        :showProjectForm="showProjectForm"
        :selectedCurriculum="selectedCurriculum"
        :toggleComplete="toggleComplete"
        :saveNewItem="saveNewItem"
        :toggleForm="toggleForm"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Header from '@/components/display-curriculum/Header.vue'
import Sections from '@/components/display-curriculum/Sections.vue'

export default {
  name: 'DisplayCurriculum',
  components: {
    Header,
    Sections
  },
  data() {
    return {
      selectedCurriculum: {},
      editField: '',
      showResourceForm: false,
      showProjectForm: false
    }
  },
  computed: {
    ...mapState(['curricula'])
  },
  methods: {
    ...mapActions(['patchCurriculum', 'patchType']),
    toggleComplete(type, sectionIndex, typeIndex) {
      const { sections, _id } = this.selectedCurriculum
      const section = sections[sectionIndex]
      const payload = {
        curriculum: this.selectedCurriculum,
        type,
        sectionId: section._id,
        item: section[type][typeIndex]
      }
      this.patchType(payload)
    },
    toggleEdit(field) {
      this.editField = field
    },
    cancelEdit() {
      this.editField = ''
    },
    saveEdit(field) {
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
    toggleForm(type) {
      this[type] = !this[type]
    },
    saveNewItem(type, section) {

      this.showResourceForm = false
      this.showProjectForm = false
    }
  },
  mounted() {
    this.selectedCurriculum = this.curricula.find((curriculum) => {
      return curriculum._id === this.$route.params.id
    })
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
