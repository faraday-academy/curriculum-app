<template>
  <v-form class="create-form" ref="pet-info-form">
    <div class="page-header">
      <h1>Create Curriculum</h1>
      <v-btn @click.prevent="saveCurriculum(petInfo, sections)">
        Save
      </v-btn>
    </div>
    <v-row>
      <v-col cols="3">
        <v-subheader>Name *</v-subheader>
      </v-col>
      <v-col cols="9">
        <v-text-field
          v-model="$v.petInfo.name.$model"
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

    <FormSections
      :sections="sections"
      :addItem="addItem"
      :deleteItem="deleteItem"
      :v="$v"
    />

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
import { required, url } from 'vuelidate/lib/validators'
import FormSections from './FormSections.vue'

export default {
  components: {
    FormSections
  },
  props: {
    saveCurriculum: Function
  },
  data() {
    return {
      name: '',
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
      }]
    }
  },
  validations: {
    petInfo: {
      name: {
        required
      }
    },
    sections: {
      $each: {
        name: {
          required
        }
      }
    }
    // url: {
    //   url
    // }
  },
  methods: {
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
        const message = `${nameMessage} ${urlMessage}`
        this.updateSnackbar({ message, show: true, variant: 'error' })
      }
    },
    deleteItem(type, sectionIndex, itemIndex) {
      this.sections[sectionIndex][type].splice(itemIndex, 1)
    }
  }
}
</script>
