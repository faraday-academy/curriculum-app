<template>
  <v-row>
    <v-col>
      <h1
        class="hover-icon-container"
        v-if="editField !== 'name'"
      >
        {{ selectedCurriculum.name }}
        <v-icon
          color="gray lighten-1 editable-icon"
          class="togglable-icon"
          @click="toggleEdit('name')"
        >
          mdi-pencil-box-outline
        </v-icon>
      </h1>
      <v-text-field
        v-else
        v-model="selectedCurriculum.name"
      >
        <template v-slot:append-outer>
          <v-btn
            small
            outlined
            color="primary"
            class="mr-1"
            @click="saveEdit('name')"
          >
            Save
          </v-btn>
          <v-btn outlined small @click="cancelEdit">
            Cancel
          </v-btn>
        </template>
      </v-text-field>

      <p
        class="hover-icon-container"
        v-if="editField !== 'goal'"
      >
        Goal: {{ selectedCurriculum.goal }}
        <v-icon
          color="gray lighten-1 editable-icon"
          class="togglable-icon"
          @click="toggleEdit('goal')"
        >
          mdi-pencil-box-outline
        </v-icon>
      </p>
      <v-text-field
        v-else
        v-model="selectedCurriculum.goal"
      >
        <template v-slot:append-outer>
          <v-btn
            small
            outlined
            color="primary"
            class="mr-1"
            @click="saveEdit('goal')"
          >
            Save
          </v-btn>
          <v-btn outlined small @click="cancelEdit">
            Cancel
          </v-btn>
        </template>
      </v-text-field>

      <p
        class="hover-icon-container"
        v-if="editField !== 'description'"
      >
        {{ selectedCurriculum.description }}
        <v-icon
          color="gray lighten-1 editable-icon"
          class="togglable-icon"
          @click="toggleEdit('description')"
        >
          mdi-pencil-box-outline
        </v-icon>
      </p>
      <v-text-field
        v-else
        v-model="selectedCurriculum.description"
      >
        <template v-slot:append-outer>
          <v-btn
            small
            outlined
            color="primary"
            class="mr-1"
            @click="saveEdit('description')"
          >
            Save
          </v-btn>
          <v-btn outlined small @click="cancelEdit">
            Cancel
          </v-btn>
        </template>
      </v-text-field>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    editField: String,
    selectedCurriculum: Object,
    toggleEdit: Function,
    saveEdit: Function,
    cancelEdit: Function
  }  
}
</script>
