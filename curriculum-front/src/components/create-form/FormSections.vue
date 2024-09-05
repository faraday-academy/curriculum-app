<template>
  <v-row>
    <v-col cols="12">
      <div class="curricula-list">
        <FormSection v-for="(section, index) in state.selectedCurriculum.sections" :key="section.name + index"
          :section_index="index" v-mode:section="section" :addItem="curriculumStore.addItem"
          :deleteSection="curriculumStore.deleteSection" />
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import { toRefs } from 'vue'

import { useCurriculumStore } from '@/stores/curricula/curriculums'
import FormSection from './FormSection.vue'

const curriculumStore = useCurriculumStore()
const { state } = toRefs(curriculumStore)
</script>
