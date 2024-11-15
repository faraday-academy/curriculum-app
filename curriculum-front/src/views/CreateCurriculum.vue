<template>
  <v-row no-gutters class="create-curriculum-page">
    <v-col md="6" offset-md="3" sm="8" offset-sm="2">
      <MainForm :saveCurriculum="saveCurriculum" />
    </v-col>
  </v-row>
</template>

<script setup>
import MainForm from '@/components/create-form/MainForm.vue'
</script>
