<template>
  <v-row no-gutters class="display-curriculum-page">
    <v-col
      md="6"
      offset-md="3"
      sm="8"
      offset-sm="2"
    >
      <v-row>
        <v-col>
          <h1
            class="hover-icon-container"
            v-if="editField !== 'name'"
          >
            {{ selectedCurriculum.name }}
            <v-icon
              color="gray lighten-1 editable-icon"
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
            v-if="editField !== 'description'"
          >
            {{ selectedCurriculum.description }}
            <v-icon
              color="gray lighten-1 editable-icon"
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
      <v-row>
        <v-col>
          <v-expansion-panels multiple>
            <v-expansion-panel
              v-for="(section, i) in selectedCurriculum.sections"
              :key="i"
            >
              <v-expansion-panel-header>
                Section {{ i + 1 }} - {{ section.name }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-list
                  subheader
                  two-line
                  flat
                >
                  <v-subheader>
                    Resources
                    <v-icon
                      color="success lighten-1"
                      class="ml-1"
                      @click="toggleEdit('name')"
                    >
                      mdi-plus-box-outline
                    </v-icon>
                  </v-subheader>

                  <v-list-item-group
                    multiple
                  >
                    <v-list-item
                      v-for="(resource, j) in section.resources"
                      :key="resource + j"
                    >
                      <v-checkbox
                        color="primary"
                        v-model="resource.isCompleted"
                        @change="toggleComplete('resources', i, j)"
                      />

                      <v-list-item-content>
                        <v-list-item-title class="hover-icon-container">
                          <router-link to="/">
                            {{ resource.name }}
                          </router-link>
                          <v-icon
                            color="gray lighten-1 editable-icon"
                            @click="toggleEdit('name')"
                          >
                            mdi-pencil-box-outline
                          </v-icon>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
                <v-list
                  subheader
                  two-line
                  flat
                >
                  <v-subheader>
                    Projects
                    <v-icon
                      color="success lighten-1"
                      class="ml-1"
                      @click="toggleEdit('name')"
                    >
                      mdi-plus-box-outline
                    </v-icon>
                  </v-subheader>

                  <v-list-item-group
                    multiple
                  >
                    <v-list-item
                      v-for="(project, k) in section.projects"
                      :key="project + k"
                    >
                      <v-checkbox
                        color="primary"
                        v-model="project.isCompleted"
                        @change="toggleComplete('projects', i, k)"
                      />

                      <v-list-item-content>
                        <v-list-item-title class="hover-icon-container">
                          <router-link to="/">
                            {{ project.name }}
                          </router-link>
                          <v-icon
                            color="gray lighten-1 editable-icon"
                            @click="toggleEdit('name')"
                          >
                            mdi-pencil-box-outline
                          </v-icon>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'DisplayCurriculum',
  data() {
    return {
      selectedCurriculum: {},
      editField: ''
    }
  },
  computed: {
    ...mapState(['curricula'])
  },
  methods: {
    ...mapActions(['patchCurriculum', 'patchType']),
    toggleComplete(type, sectionIndex, typeIndex) {
      const { sections, _id } = this.selectedCurriculum
      const section = sections[sectionIndex]
      const payload = {
        curriculum: this.selectedCurriculum,
        type,
        sectionId: section._id,
        item: section[type][typeIndex]
      }
      this.patchType(payload)
    },
    toggleEdit(field) {
      this.editField = field
    },
    cancelEdit() {
      this.editField = ''
    },
    saveEdit(field) {
      const { _id } = this.selectedCurriculum

      const body = {
        [field]: this.selectedCurriculum[field]
      }
      const payload = {
        curriculumId: _id,
        body
      }
      this.patchCurriculum(payload)
      this.editField = ''
    }
  },
  mounted() {
    this.selectedCurriculum = this.curricula.find((curriculum) => {
      return curriculum._id === this.$route.params.id
    })
  }
}
</script>
