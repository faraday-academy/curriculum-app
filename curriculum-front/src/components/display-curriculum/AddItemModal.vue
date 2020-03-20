<template>
  <v-dialog
    v-model="dialog.show"
    width="500"
    persistent
  >
    <v-card class="resources-card">
      <v-card-title>
        <span class="headline">
          {{ dialog.type ? dialog.type[0].toUpperCase() + dialog.type.slice(1) : '' }}
        </span>
      </v-card-title>
      <v-card-text>
        <v-row no-gutters>
          <v-col cols="12">
            <v-text-field
              :placeholder="`Enter ${dialog.type} Name`.toUpperCase()"
              v-model="dialog.name"
            />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12">
            <v-text-field
              :placeholder="`Enter ${dialog.type} Link`.toUpperCase()"
              v-model="dialog.link"
            />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12">
            <v-btn
              @click="saveNewItem(`${dialog.type}s`, sectionIndex)"
              color="secondary"
              class="black--text mr-2"
            >
              Save {{ dialog.type }}
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

<script>
export default {
  props: {
    saveNewItem: Function,
    toggleDialog: Function,
    sectionIndex: Number,
    dialog: Object
  }
}
</script>
