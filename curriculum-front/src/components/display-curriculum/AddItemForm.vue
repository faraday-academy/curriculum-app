<template>
  <v-card class="resources-card">
    <v-card-text>
      <v-row no-gutters>
        <v-col cols="12">
          <v-text-field
            placeholder="Enter Resource Name"
          />
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12">
          <v-text-field
            placeholder="Enter Resource Link"
          />
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12">
          <v-btn @click="saveNewItem(type)" color="secondary" class="black--text">
            Save Resource
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    type: String,
    saveNewItem: Function
  }
}
</script>
