<template>
  <v-form class="create-form" ref="pet-info-form">
    <v-row>
      <v-col cols="3">
        <v-subheader>Name *</v-subheader>
      </v-col>
      <v-col cols="9">
        <v-text-field
          v-model="petInfo.name"
          :rules="nameRules"
          required
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-subheader>Goal</v-subheader>
      </v-col>
      <v-col cols="9">
        <v-text-field v-model="petInfo.goal" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-label>Description</v-label>
        <v-textarea
          solo
          name="description"
          v-model="petInfo.description"
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
            class="section-card"
          >
            <v-card-title class="headline">Section #{{ k + 1 }}</v-card-title>
            
            <v-card-text>
              <v-row no-gutters>
                <v-col cols="3">
                  <v-subheader>Name *</v-subheader>
                </v-col>
                <v-col cols="9">
                  <v-text-field
                    v-model="section.name"
                    :rules="nameRules"
                    required
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
                        placeholder="Enter Resource Name"
                        v-model="section.newResource.name"
                      />
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col cols="12">
                      <v-text-field
                        :rules="urlRules"
                        placeholder="Enter Resource Link"
                        v-model="section.newResource.url"
                        @keyup.enter="addItem('resource', k)"
                      />
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col cols="12">
                      <v-btn @click="addItem('resource', k)">Save Resource</v-btn>
                    </v-col>
                  </v-row>
                  <v-row v-if="section.resources.length">
                    <v-col cols="12">
                      <v-card tile>
                        <template v-for="(resource, m) in section.resources">
                          <v-list-item
                            :key="resource + m"
                          >
                            <v-list-item-content>
                              <v-list-item-title>{{ resource.name }}</v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action>
                              <v-btn icon>
                                <v-icon color="gray lighten-1" @click="deleteItem('resources', k, m)">
                                  mdi-close
                                </v-icon>
                              </v-btn>
                            </v-list-item-action>
                          </v-list-item>
                          <v-divider
                            v-if="m + 1 < section.resources.length"
                            :key="m"
                          />
                        </template>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
              <v-card class="projects-card">
                <v-card-text>
                  <v-row no-gutters>
                    <v-col cols="12">
                      <v-text-field
                        placeholder="Enter Projects Name"
                        v-model="section.newProject.name"
                      />
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col cols="12">
                      <v-text-field
                        placeholder="Enter Projects Link"
                        v-model="section.newProject.url"
                        @keyup.enter="addItem('project', k)"
                      />
                    </v-col>
                  </v-row>
                  <v-row no-gutters>
                    <v-col cols="12">
                      <v-btn @click="addItem('project', k)">Save Project</v-btn>
                    </v-col>
                  </v-row>
                  <v-row v-if="section.projects.length">
                    <v-col cols="12">
                      <v-card tile>
                        <template v-for="(project, m) in section.projects">
                          <v-list-item
                            :key="project + m"
                          >
                            <v-list-item-content>
                              <v-list-item-title>{{ project.name }}</v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action>
                              <v-btn icon>
                                <v-icon color="gray lighten-1" @click="deleteItem('projects', k, m)">
                                  mdi-close
                                </v-icon>
                              </v-btn>
                            </v-list-item-action>
                          </v-list-item>
                          <v-divider
                            v-if="m + 1 < section.projects.length"
                            :key="m"
                          />
                        </template>
                      </v-card>
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
</template>

<script>
export default {
  props: {
    petInfo: Object,
    nameRules: Array,
    urlRules: Array,
    sections: Array,
    addSection: Function,
    addItem: Function,
    deleteItem: Function
  }
}
</script>
