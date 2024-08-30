<template>
  <v-card class="section-card">
    <v-card-title class="headline d-flex justify-space-between">
      Section #{{ parseInt(k) + 1 }}
      <v-icon left @click="deleteSection(k)">mdi-close</v-icon>
    </v-card-title>

    <v-card-text>
      <v-row no-gutters>
        <v-col cols="3">
          <v-subheader>Name *</v-subheader>
        </v-col>
        <v-col cols="9">
          <v-text-field v-model="section_.name.$model" :error-messages="nameErrors(parseInt(section_index))" required
            @input="section.name.$touch()" @blur="section_.name.$touch()" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="3">
          <v-subheader>Goal</v-subheader>
        </v-col>
        <v-col cols="9">
          <v-text-field v-model="section_.goal.$model" />
        </v-col>
      </v-row>
      <v-card class="resources-card my-2" outlined>
        <v-card-text>
          <v-row no-gutters>
            <v-col cols="12">
              <v-text-field placeholder="Enter Resource Name" v-model="section_.newResource.name.$model"
                @keyup.enter="addItem('resource', section_index)" />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12">
              <v-text-field placeholder="Enter Resource Link"
                :error-messages="sectionUrlErrors(parseInt(k), 'Resource')" v-model="section_.newResource.url.$model"
                @keyup.enter="addItem('resource', section_index)" @input="section_.newResource.url.$touch()"
                @blur="section_.newResource.url.$touch()" />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12">
              <v-btn @click="addItem('resource', section_index)" color="secondary" class="black--text">
                Save Resource
              </v-btn>
            </v-col>
          </v-row>
          <v-row v-if="section_.resources.$model.length">
            <v-col cols="12">
              <v-card tile>
                <v-card-text>
                  <v-list-item v-for="(resource, resource_index) in section_.resources.$model"
                    :key="resource + resource_index">
                    <v-list-item-content>
                      <v-list-item-title>{{ resource.name }}</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn icon>
                        <v-icon color="gray lighten-1" @click="deleteItem('resources', key, resource_index)">
                          mdi-close
                        </v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                  <v-divider v-if="resource_index + 1 < section_.resources.length" :key="resource_index" />
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-card class="projects-card my-2" outlined>
        <v-card-text>
          <v-row no-gutters>
            <v-col cols="12">
              <v-text-field placeholder="Enter Projects Name" v-model="section_.newProject.name.$model" />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12">
              <v-text-field placeholder="Enter Projects Link" v-model="section_.newProject.url.$model"
                :error-messages="sectionUrlErrors(parseInt(k), 'Project')"
                @keyup.enter="addItem('project', section_index)" @input="section_.newProject.url.$touch()"
                @blur="section_.newProject.url.$touch()" />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12">
              <v-btn @click="addItem('project', section_index)" color="secondary" class="black--text">
                Save Project
              </v-btn>
            </v-col>
          </v-row>
          <v-row v-if="section_.projects.$model.length">
            <v-col cols="12">
              <v-card tile>
                <v-card-text>
                  <v-list-item v-for="(project, project_index) in section_.projects.$model"
                    :key="project + project_index">
                    <v-list-item-content>
                      <v-list-item-title>{{ project.name }}</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-btn icon>
                        <v-icon color="gray lighten-1" @click="deleteItem('projects', section_index, project_index)">
                          mdi-close
                        </v-icon>
                      </v-btn>
                    </v-list-item-action>
                  </v-list-item>
                  <v-divider v-if="project_index + 1 < section_.projects.length" :key="project_index" />
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  section_index: Number,
  section: Object,
  sectionUrlErrors: Function,
  nameErrors: Function,
  addItem: Function,
  deleteSection: Function
})

const emit = defineEmits(['update:section'])

const section_ = computed({
  get: () => props.section,
  set: (value) => emit('update:section', value)
})
</script>
