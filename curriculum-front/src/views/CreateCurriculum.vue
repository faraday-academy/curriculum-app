<template>
  <v-row no-gutters class="create-curriculum-page">
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
      <MainForm
        :petInfo="petInfo"
        :nameRules="nameRules"
        :urlRules="nameRules"
        :sections="sections"
        :addSection="addSection"
        :addItem="addItem"
        :deleteItem="deleteItem"
      />
    </v-col>
    <v-snackbar
      v-model="snackbar"
      :multi-line="true"
      :right="true"
      :top="true"
      :timeout="5000"
      color="error"
    >
      {{ snackbarText }}
      <v-btn
        dark
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'
import MainForm from '@/components/CreateForm/MainForm.vue'

const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/

export default {
  name: "CreateCurriculum",
  components: {
    MainForm
  },
  data() {
    return {
      urlRules: [
        v => (v.length < 1 || urlRegex.test(v)) || 'Must be valid url',
      ],
      nameRules: [
        v => !!v || 'Name is required'
      ],
      petInfo: {
        name: '',
        goal: '',
        description: ''
      },
      sections: [{
        name: '',
        goal: '',
        newResource: {
          url: '',
          name: ''
        },
        resources: [],
        newProject: {
          url: '',
          name: ''
        },
        projects: []
      }],
      snackbarText: '',
      snackbar: false
    }
  },
  methods: {
    ...mapActions(['postCurriculum']),
    saveCurriculum() {
      if (this.$refs['pet-info-form'].validate()) {
        const { petInfo, sections } = this

        const newSections = sections.map((section, i) => {
          let updatedSection = { ...section }
          delete updatedSection.newResource
          delete updatedSection.newProject
          return updatedSection
        })

        const curriculum = { ...petInfo, sections: newSections }

        this.postCurriculum(curriculum)
      }
    },
    addSection() {
      this.sections.push({
        name: '',
        goal: '',
        newResource: {
          url: '',
          name: ''
        },
        resources: [],
        newProject: {
          url: '',
          name: ''
        },
        projects: []
      })
    },
    addItem(type, i) {
      let key = `new${type[0].toUpperCase()}${type.slice(1)}`
      const item = this.sections[i][key]

      const urlCheck = !item.url || urlRegex.test(item.url)
      const nameCheck = !!item.name

      if (nameCheck && urlCheck) {
        let obj = {
          name: item.name,
          url: item.url
        }
        this.sections[i][`${type}s`].push(obj)

        this.sections[i][key].name = ''
        this.sections[i][key].url = ''
      } else {
        const urlMessage = !urlCheck ? 'URL must be valid.' : ''
        const nameMessage = !nameCheck ? 'Must provide a name.' : ''
        this.snackbarText = `${nameMessage} ${urlMessage}`
        this.snackbar = true
      }
    },
    deleteItem(type, sectionIndex, itemIndex) {
      this.sections[sectionIndex][type].splice(itemIndex, 1)
    }
  }
}
</script>
