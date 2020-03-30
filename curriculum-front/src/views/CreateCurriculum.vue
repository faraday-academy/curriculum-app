<template>
  <v-row no-gutters class="create-curriculum-page">
    <v-col
      md="6"
      offset-md="3"
      sm="8"
      offset-sm="2"
    >
      <MainForm
        :saveCurriculum="saveCurriculum"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

import MainForm from '@/components/create-form/MainForm.vue'

export default {
  name: "CreateCurriculum",
  components: {
    MainForm
  },
  methods: {
    ...mapActions(['postCurriculum']),
    ...mapMutations(['updateSnackbar']),
    saveCurriculum(petInfo, sections) {
      const newSections = sections.map((section, i) => {
        let updatedSection = { ...section }
        delete updatedSection.newResource
        delete updatedSection.newProject
        return updatedSection
      })

      const curriculum = { ...petInfo, sections: newSections }

      this.postCurriculum(curriculum)
    }
  }
}
</script>
