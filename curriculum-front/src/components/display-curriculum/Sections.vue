<template>
  <v-row>
    <v-col>
      <v-expansion-panels multiple>
        <v-expansion-panel
          v-for="(section, i) in selectedCurriculum.sections"
          :key="i"
        >
          <v-expansion-panel-header>
            <div class="d-flex align-center justify-space-between">
              <span class="section-header-text">
                Section {{ i + 1 }} - {{ section.name }}
              </span>
              <span>
                <v-icon
                  v-if="canEdit()"
                  color="gray lighten-1"
                  @click.stop="openEditSectionDialog(i)"
                >
                  mdi-pencil-box-outline
                </v-icon>
                <v-icon
                  v-if="canEdit()"
                  color="error lighten-1"
                  @click.stop="toggleConfirmDelete(i)"
                >
                  mdi-close-box-outline
                </v-icon>
              </span>
            </div>
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
                  v-if="canEdit()"
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
                    v-if="canEdit()"
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
                        v-if="canEdit()"
                        color="gray lighten-1"
                        class="togglable-icon"
                        @click="toggleDialog('resource', i, j)"
                      >
                        mdi-pencil-box-outline
                      </v-icon>
                      <v-icon
                        v-if="canEdit()"
                        color="error lighten-1"
                        class="ml-1 togglable-icon"
                        @click="removeItem('resources', i, j)"
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
                  v-if="canEdit()"
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
                        v-if="canEdit()"
                        color="gray lighten-1"
                        class="togglable-icon"
                        @click="toggleDialog('project', i, k)"
                      >
                        mdi-pencil-box-outline
                      </v-icon>
                      <v-icon
                        v-if="canEdit()"
                        color="error lighten-1"
                        class="ml-1 togglable-icon"
                        @click.stop="removeItem('projects', i, j)"
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
      <AddItemDialog
        :dialog="dialog"
        :toggleDialog="toggleDialog"
        :saveItem="saveItem"
      />
    </transition>
    <v-dialog v-model="showDeleteDialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Do you really want to delete this section?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="showDeleteDialog = false">Cancel</v-btn>
          <v-btn color="green darken-1" text @click="confirmDelete">Confirm</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showEditSectionDialog" persistent max-width="400">
      <v-card>
        <v-card-title class="headline">Edit Section Information</v-card-title>
        <v-card-text>
          <v-row no-gutters>
            <v-col cols="12">
              <v-text-field
                placeholder="Section Name"
                v-model="sectionEditing.name"
              />
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="12">
              <v-text-field
                placeholder="Section Goal"
                v-model="sectionEditing.goal"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="showEditSectionDialog = false">Cancel</v-btn>
          <v-btn color="green darken-1" text @click="updateSection">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import AddItemDialog from './AddItemDialog.vue'
import { mapActions } from 'vuex'

export default {
  props: {
    dialog: Object,
    selectedCurriculum: Object,
    toggleComplete: Function,
    toggleDialog: Function,
    saveItem: Function,
    editItem: Function,
    removeItem: Function,
    canEdit: Function
  },
  data () {
    return {
      showDeleteDialog: false,
      showEditSectionDialog: false,
      selectedIndex: null,
      sectionEditing: {}
    }
  },
  components: {
    AddItemDialog
  },
  methods: {
    ...mapActions(['deleteSection', 'patchSection']),
    toggleConfirmDelete (index) {
      this.selectedIndex = index
      this.showDeleteDialog = !this.showDeleteDialog
    },
    openEditSectionDialog (index) {
      this.selectedIndex = index
      this.sectionEditing = this.selectedCurriculum.sections[index]
      this.showEditSectionDialog = !this.showEditSectionDialog
    },
    closeEditSectionDialog (index) {
      this.sectionEditing = {}
      this.showEditSectionDialog = false
    },
    confirmDelete () {
      const section = this.selectedCurriculum.sections[this.selectedIndex]
      const payload = {
        curriculumId: this.selectedCurriculum._id,
        sectionId: section._id
      }
      this.deleteSection(payload)
      this.toggleConfirmDelete()
    },
    updateSection () {
      const payload = {
        curriculumId: this.selectedCurriculum._id,
        section: this.sectionEditing
      }
      this.patchSection(payload)
      this.closeEditSectionDialog()
    }
  }
}
</script>
