<template>
  <v-row no-gutters class="display-curricula-page">
    <v-col md="6" offset-md="3" sm="8" offset-sm="2">
      <div class="page-header mb-5">
        <h1>Curricula</h1>
        <v-btn v-if="user.token" color="accent" @click="$router.push('/curricula/create')">
          Create New
        </v-btn>
      </div>

      <v-tabs v-model="currentTab">
        <v-tab v-if="user.token">My Curricula</v-tab>
        <v-tab>All Curricula</v-tab>
      </v-tabs>

      <div class="curricula-list">
        <v-card class="curriculum-card" outlined v-for="curriculum in curricula" :key="curriculum._id">
          <v-card-title class="headline d-flex justify-space-between">
            <router-link :to="`/curricula/${curriculum._id}`">
              {{ curriculum.name }}
            </router-link>
            <v-icon v-if="currentTab === 0 && user.token" color="error lighten-1" class="ml-1 togglable-icon"
              @click="toggleDeleteDialog(curriculum._id)">
              mdi-trash-can-outline
            </v-icon>
          </v-card-title>

          <v-card-subtitle>
            {{ curriculum.description }}
          </v-card-subtitle>

          <v-card-text>
            <v-progress-linear :value="retrieveCompleted(curriculum._id)" color="blue-grey" height="25">
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
      <infinite-loading :identifier="infiniteId" @infinite="loadCurricula" />
    </v-col>
  </v-row>
</template>

<script setup>
import { toRefs, ref, onMounted } from 'vue'

import { useAuthStore } from '@/stores/auth'
import { useCurriculumStore } from '@/stores/curriculum'

const authStore = useAuthStore()
const curriculumStore = useCurriculumStore()

const { user } = toRefs(authStore)
const { curricula, completeCounts, curriculaMeta } = toRefs(curriculumStore)

const { countAllCompleted, deleteCurriculum } = curriculumStore

const currentPage = ref(1)
const currentTab = ref(0)
const infiniteId = ref(+new Date())
const selectedCurriculumId = ref(null)
const showCurriculumDelete = ref(false)

const loadCurricula = async ($state) => {
  let payload = {
    currentPage: currentPage.value
  }
  if (currentTab.value === 0 && user.value.id) {
    payload.userId = user.value.id
  }
  await curriculumStore.getCurricula(payload)

  if (curriculaMeta.value.hasNextPage) {
    $state.loaded()
    currentPage.value += 1
  } else {
    $state.complete()
  }
}

const retrieveCompleted = (id) => {
  try {
    if (curricula.value) {
      const totals = completeCounts.value.find((obj) => {
        return obj.id === id
      })
      return Math.floor((totals.numberCompleted / totals.totalNumber) * 100)
    }
  } catch (err) {
    console.error(err)
  }
  return 0
}

const toggleDeleteDialog = (curriculumId) => {
  selectedCurriculumId.value = curriculumId
  showCurriculumDelete.value = !showCurriculumDelete.value
}

const confirmDelete = () => {
  deleteCurriculum(selectedCurriculumId.value)
  showCurriculumDelete.value = false
}

onMounted(() => {
  countAllCompleted()
})
</script>
