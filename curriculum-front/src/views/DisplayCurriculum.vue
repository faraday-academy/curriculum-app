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
          <h1 class="hover-icon-container">
            {{ selectedCurriculum.name }}
            <v-icon color="gray lighten-1 editable-icon">
              mdi-pencil-box-outline
            </v-icon>
          </h1>
          <p class="hover-icon-container">
            {{ selectedCurriculum.description }}
            <v-icon color="gray lighten-1 editable-icon">
              mdi-pencil-box-outline
            </v-icon>
          </p>
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
                  <v-subheader>Resources</v-subheader>

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
                        <v-list-item-title>
                          <router-link to="/">
                            {{ resource.name }}
                          </router-link>
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
                  <v-subheader>Projects</v-subheader>

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
                        <v-list-item-title>
                          <router-link to="/">
                            {{ project.name }}
                          </router-link>
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
      selectedCurriculum: {}
    }
  },
  computed: {
    ...mapState(['curricula'])
  },
  methods: {
    ...mapActions(['patchCurriculum']),
    toggleComplete(type, sectionIndex, typeIndex) {
      // this.selectedCurriculum.sections[sectionIndex][type][typeIndex]
      const { sections, _id } = this.selectedCurriculum
      const payload = {
        body: sections,
        curriculumId: _id
      }
      this.patchCurriculum(payload)
    }
  },
  mounted() {
    this.selectedCurriculum = this.curricula.find((curriculum) => {
      return curriculum._id === this.$route.params.id
    })
  }
}
</script>
