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
                      <v-text-field />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="3">
                      <v-subheader>Goal</v-subheader>
                    </v-col>
                    <v-col cols="9">
                      <v-text-field />
                    </v-col>
                  </v-row>
                  <v-card class="resources-card">
                    <v-card-text>
                      <v-row no-gutters>
                        <v-col cols="12">
                          <v-text-field
                            placeholder="Enter Resource Link"
                          />
                        </v-col>
                      </v-row>
                      <v-row no-gutters>
                        <v-col cols="12">
                          <p>List of resources</p>
                          <p>List of resources</p>
                          <p>List of resources</p>
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
                          />
                        </v-col>
                      </v-row>
                      <v-row no-gutters>
                        <v-col cols="12">
                          <p>List of projects</p>
                          <p>List of projects</p>
                          <p>List of projects</p>
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
        resources: [],
        project: []
      }]
    }
  },
  methods: {
    ...mapActions(['postCurriculum']),
    saveCurriculum() {
      const { name, goal, description } = this

      const curriculum = { name, goal, description }

      this.postCurriculum(curriculum)
    },
    addSection() {
      this.sections.push({
        name: '',
        goal: '',
        resources: [],
        project: []
      })
    }
  }
}
</script>