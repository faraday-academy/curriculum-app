<template>
  <v-row no-gutters class="create-curriculum-page">
    <v-col md="6" offset-md="3" sm="8" offset-sm="2">
      <MainForm :saveCurriculum="saveCurriculum" />
    </v-col>
  </v-row>
</template>

<script setup>
import { toRefs } from 'vue'

import MainForm from '@/components/create-form/MainForm.vue'

import { useAuthStore } from '@/stores/auth'
import { useCurriculumStore } from '@/stores/curricula'

const authStore = useAuthStore()
const { user } = toRefs(authStore)
const { postCurriculum } = useCurriculumStore()

const saveCurriculum = (curriculumInfo, sections) => {
  const newSections = sections.map((section) => {
    let updatedSection = { ...section }
    delete updatedSection.newResource
    delete updatedSection.newProject
    return updatedSection
  })

  const curriculum = {
    ...curriculumInfo,
    sections: newSections,
    createdBy: user.value.id
  }

  postCurriculum(curriculum)
}

// computed: {
//   ...mapState('auth', ['user'])
// },
// methods: {
//   ...mapActions(['postCurriculum']),
//   ...mapMutations(['updateSnackbar']),
// }
</script>
