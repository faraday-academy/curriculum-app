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

<script>
import FormSection from './FormSection'

export default {
  props: {
    sections: Array,
    addItem: Function,
    deleteItem: Function,
    v: Object,
    nameErrors: Function,
    sectionUrlErrors: Function,
    deleteSection: Function
  },
  components: {
    FormSection
  }
}
</script>
