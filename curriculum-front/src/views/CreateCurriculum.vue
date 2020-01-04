<template>
  <v-row no-gutters class="upsert-curriculum-page">
    <v-col
      md="6"
      offset-md="3"
      sm="8"
      offset-sm="2"
    >
      <div class="page-header">
        <h1>Create Curriculum</h1>
        <v-btn @click="saveCurriculum">
          Save
        </v-btn>
      </div>

      <v-form class="upsert-form">
        <v-row>
          <v-col cols="3">
            <v-subheader>Name</v-subheader>
          </v-col>
          <v-col cols="9">
            <v-text-field v-model="name" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="3">
            <v-subheader>Goal</v-subheader>
          </v-col>
          <v-col cols="9">
            <v-text-field v-model="goal" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-label>Description</v-label>
            <v-textarea
              solo
              name="description"
              v-model="description"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <div class="curricula-list">
              <v-card
                outlined
                v-for="(section, k) in sections"
                :key="section.name + k"
              >
                <v-card-title class="headline">Section #{{ k + 1 }}</v-card-title>
                
                <v-card-text>
                  <v-row no-gutters>
                    <v-col cols="3">
                      <v-subheader>Name</v-subheader>
                    </v-col>
                    <v-col cols="9">
                      <v-text-field
                        v-model="section.name"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="3">
                      <v-subheader>Goal</v-subheader>
                    </v-col>
                    <v-col cols="9">
                      <v-text-field
                        v-model="section.goal"
                      />
                    </v-col>
                  </v-row>
                  <v-card class="resources-card">
                    <v-card-text>
                      <v-row no-gutters>
                        <v-col cols="12">
                          <v-text-field
                            placeholder="Enter Resource Link"
                            v-model="section.newResource"
                            @keyup.enter="addItem('resource', k)"
                          />
                        </v-col>
                      </v-row>
                      <v-row no-gutters>
                        <v-col cols="12">
                          <p
                            v-for="(resource, m) in section.resources"
                            :key="resource + m"
                          >
                            {{ resource }}
                          </p>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                  <v-card class="projects-card">
                    <v-card-text>
                      <v-row no-gutters>
                        <v-col cols="12">
                          <v-text-field
                            placeholder="Enter Projects Link"
                            v-model="section.newProject"
                            @keyup.enter="addItem('project', k)"
                          />
                        </v-col>
                      </v-row>
                      <v-row no-gutters>
                        <v-col cols="12">
                          <p
                            v-for="(project, m) in section.projects"
                            :key="project + m"
                          >
                            {{ project }}
                          </p>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-card-text>
              </v-card>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-btn @click="addSection">
              Add Section
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: "CreateCurriculum",
  data() {
    return {
      name: '',
      goal: '',
      description: '',
      sections: [{
        name: '',
        goal: '',
        newResource: '',
        resources: [],
        newProject: '',
        projects: []
      }]
    }
  },
  methods: {
    ...mapActions(['postCurriculum']),
    saveCurriculum() {
      const { name, goal, description, sections } = this

      const newSections = sections.map((section, i) => {
        let updatedSection = { ...section }
        delete updatedSection.newResource
        delete updatedSection.newProject
        return updatedSection
      })

      const curriculum = { name, goal, description, sections: newSections }

      this.postCurriculum(curriculum)
    },
    addSection() {
      this.sections.push({
        name: '',
        goal: '',
        resources: [],
        projects: []
      })
    },
    addItem(type, i) {
      let key = `new${type[0].toUpperCase()}${type.slice(1)}`
      let item = this.sections[i][key]
      this.sections[i][`${type}s`].push(item)
      this.sections[i][key] = ''
    }
  }
}
</script>