<template>
  <v-dialog v-model="dialogOptions.show" width="500" persistent>
    <v-card class="resources-card">
      <v-card-title>
        <span class="headline">
          {{ dialogOptions.type ? dialogOptions.type[0].toUpperCase() + dialogOptions.type.slice(1) : '' }}
        </span>
      </v-card-title>
      <v-card-text>
        <v-row no-gutters>
          <v-col cols="12">
            <v-text-field :placeholder="`Enter ${dialogOptions.type} Name`.toUpperCase()"
              v-model="dialogOptions.name" />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12">
            <v-text-field :placeholder="`Enter ${dialogOptions.type} Link`.toUpperCase()" v-model="dialogOptions.url" />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12">
            <v-btn @click="saveItem(`${dialogOptions.type}s`)" color="secondary" class="black--text mr-2">
              {{ dialogOptions.isEditing ? 'Update' : 'Create' }}
              {{ dialogOptions.type }}
            </v-btn>
            <v-btn @click="toggleDialog('')">
              Cancel
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed, defineEmits, defineProps } from 'vue'

const props = defineProps({
  saveItem: Function,
  toggleDialog: Function,
  sectionIndex: Number,
  dialog: Object
})

const emit = defineEmits(
  'update:dialog',
)

const dialogOptions = computed({
  get: () => props.dialog,
  set: (value) => {
    emit('update:dialog', value)
  }
})
</script>
