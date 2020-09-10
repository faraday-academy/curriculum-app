<template>
  <v-row no-gutters class="display-curricula-page">
    <v-col
      md="6"
      offset-md="3"
      sm="8"
      offset-sm="2"
    >
      <div class="page-header mb-5">
        <h1>Curricula</h1>
        <v-btn
          v-if="user.token"
          color="accent"
          @click="$router.push('/curricula/create')"
        >
          Create New
        </v-btn>
      </div>

      <v-tabs v-model="currentTab">
        <v-tab v-if="user.token">My Curricula</v-tab>
        <v-tab>All Curricula</v-tab>
      </v-tabs>

      <div class="curricula-list">
        <v-card
          class="curriculum-card"
          outlined
          v-for="curriculum in curricula"
          :key="curriculum._id"
        >
          <v-card-title class="headline d-flex justify-space-between">
            <router-link :to="`/curricula/${curriculum._id}`">
              {{ curriculum.name }}
            </router-link>
            <v-icon
              v-if="currentTab === 0 && user.token"
              color="error lighten-1"
              class="ml-1 togglable-icon"
              @click="toggleDeleteDialog(curriculum._id)"
            >
              mdi-trash-can-outline
            </v-icon>
          </v-card-title>

          <v-card-subtitle>
            {{ curriculum.description }}
          </v-card-subtitle>

          <v-card-text>
            <v-progress-linear
              :value="retrieveCompleted(curriculum._id)"
              color="blue-grey"
              height="25"
            >
              <template v-slot="{ value }">
                <strong>{{ value }}%</strong>
              </template>
            </v-progress-linear>
          </v-card-text>
        </v-card>
      </div>

      <v-dialog v-model="showCurriculumDelete" persistent max-width="390">
        <v-card>
          <v-card-title class="headline">Do you really want to delete this curriculum?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="showCurriculumDelete = false">
              Cancel
            </v-btn>
            <v-btn color="green darken-1" text @click="confirmDelete">Confirm</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <infinite-loading @infinite="loadCurricula"></infinite-loading>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'DisplayCurricula',
  data () {
    return {
      ratioCompleted: 35,
      currentTab: 0,
      showCurriculumDelete: false,
      selectedCurriculumId: '',
      currentPage: 0
    }
  },
  computed: {
    ...mapState(['curricula', 'completeCounts']),
    ...mapState('auth', ['user'])
  },
  watch: {
    currentTab (val) {
      if (val === 0) {
        this.getUserCurricula(this.user.id)
      } else {
        this.getCurricula()
      }
    }
  },
  methods: {
    ...mapActions([
      'getCurricula',
      'getUserCurricula',
      'countAllCompleted',
      'deleteCurriculum'
    ]),
    async loadCurricula ($state) {
      let payload = {
        currentPage: this.currentPage
      }
      if (this.user.id) {
        payload.userId = this.user.id
        await this.getUserCurricula(payload)
        $state.loaded()
      } else {
        await this.getCurricula(payload)
        $state.loaded()
      }
      $state.complete()
      this.currentPage += 1
    },
    retrieveCompleted (id) {
      // TODO: remove
      try {
        if (this.curricula) {
          const totals = this.completeCounts.find((obj) => {
            return obj.id === id
          })
          return Math.floor((totals.numberCompleted / totals.totalNumber) * 100)
        }
      } catch (err) {
        console.error(err)
      }
      return 0
    },
    toggleDeleteDialog (curriculumId) {
      // I am just saving the current curriculum id here for delete
      // probably not the best thing long term, but works for now
      this.selectedCurriculumId = curriculumId
      this.showCurriculumDelete = !this.showCurriculumDelete
    },
    confirmDelete () {
      this.deleteCurriculum(this.selectedCurriculumId)
      this.showCurriculumDelete = false
    }
  },
  mounted () {
    let payload = {
      currentPage: this.currentPage
    }
    if (this.user.id) {
      payload.userId = this.user.id
      this.getUserCurricula(payload)
    } else {
      this.getCurricula(payload)
    }
  },
  created () {
    this.countAllCompleted()
  }
}
</script>
