<template>
  <v-row>
    <v-col cols="12">
      <div class="curricula-list">
        <FormSection
          v-for="(section, k) in v.sections.$each.$iter"
          :key="section.name + k"
          :k="k"
          :section="section"
          :nameErrors="nameErrors"
          :sectionUrlErrors="sectionUrlErrors"
          :addItem="addItem"
          :deleteSection="deleteSection"
        />
      </div>
    </v-col>
  </v-row>
</template>

<script setup>
import FormSection from './FormSection.vue'

defineProps({
  sections: Array,
  addItem: Function,
  deleteItem: Function,
  v: Object,
  nameErrors: Function,
  sectionUrlErrors: Function,
  deleteSection: Function
})
</script>
