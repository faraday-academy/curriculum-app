<template>
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
                  @click="toggleDialog('resource', i)"
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
                        class="togglable-icon"
                        @click="toggleDialog('resource', i, j)"
                      >
                        mdi-pencil-box-outline
                      </v-icon>
                      <v-icon
                        color="error lighten-1 editable-icon"
                        class="ml-1 togglable-icon"
                        @click="console.log('temp')"
                      >
                        mdi-close-box-outline
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
                  @click="toggleDialog('project', i)"
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
                        class="togglable-icon"
                        @click="toggleDialog('project', i, k)"
                      >
                        mdi-pencil-box-outline
                      </v-icon>
                      <v-icon
                        color="error lighten-1 editable-icon"
                        class="ml-1 togglable-icon"
                        @click="console.log('temp')"
                      >
                        mdi-close-box-outline
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
    <transition name="slide-fade">
      <AddItemModal
        :dialog="dialog"
        :toggleDialog="toggleDialog"
        :saveItem="saveItem"
      />
    </transition>
  </v-row>
</template>

<script>
import AddItemModal from './AddItemModal.vue'

export default {
  props: {
    dialog: Object,
    selectedCurriculum: Object,
    toggleComplete: Function,
    toggleDialog: Function,
    saveItem: Function,
    editItem: Function
  },
  components: {
    AddItemModal
  }
}
</script>
