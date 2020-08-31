<template>
  <v-form class="create-form">
    <div class="page-header">
      <h1>Create Curriculum</h1>
      <v-btn color="primary" @click.prevent="submit">
        Save
      </v-btn>
    </div>
    <v-row>
      <v-col cols="3">
        <v-subheader>Name *</v-subheader>
      </v-col>
      <v-col cols="9">
        <v-text-field
          v-model="$v.curriculumInfo.name.$model"
          :error-messages="nameErrors"
          required
          @input="$v.curriculumInfo.name.$touch()"
          @blur="$v.curriculumInfo.name.$touch()"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-subheader>Goal</v-subheader>
      </v-col>
      <v-col cols="9">
        <v-text-field v-model="curriculumInfo.goal" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-label>Description</v-label>
        <v-textarea
          solo
          name="description"
          v-model="curriculumInfo.description"
        />
      </v-col>
    </v-row>

    <FormSections
      :sections="sections"
      :addItem="addItem"
      :deleteItem="deleteItem"
      :v="$v"
      :nameErrors="sectionNameErrors"
      :sectionUrlErrors="sectionUrlErrors"
      :deleteSection="deleteSection"
    />

    <v-row>
      <v-col cols="12">
        <v-btn color="secondary" class="black--text" @click="addSection">
          Add Section
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { required, maxLength, url } from 'vuelidate/lib/validators'
import FormSections from './FormSections.vue'

export default {
  components: {
    FormSections
  },
  props: {
    saveCurriculum: Function
  },
  data () {
    return {
      curriculumInfo: {
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
    curriculumInfo: {
      name: {
        required,
        maxLength: maxLength(30)
      },
      goal: {},
      description: {}
    },
    sections: {
      $each: {
        name: {
          required,
          maxLength: maxLength(30)
        },
        goal: {},
        newResource: {
          url: {
            url
          },
          name: {}
        },
        newProject: {
          url: {
            url
          },
          name: {}
        },
        resources: {},
        projects: {}
      }
    }
  },
  computed: {
    nameErrors () {
      const errors = []
      if (!this.$v.curriculumInfo.name.$dirty) return errors
      !this.$v.curriculumInfo.name.maxLength && errors.push('Name must be at most 20 characters long.')
      !this.$v.curriculumInfo.name.required && errors.push('Name is required.')
      return errors
    }
  },
  methods: {
    sectionNameErrors (i) {
      const errors = []
      if (!this.$v.sections.$each.$iter[i].name.$dirty) return errors
      !this.$v.sections.$each.$iter[i].name.maxLength && errors.push('Name must be at most 30 characters long.')
      !this.$v.sections.$each.$iter[i].name.required && errors.push('Name is required.')
      return errors
    },
    sectionUrlErrors (i, type) {
      const errors = []
      if (!this.$v.sections.$each.$iter[i][`new${type}`].url.$model.length) return errors
      !this.$v.sections.$each.$iter[i][`new${type}`].url.url && errors.push('Must be a valid url.')
      return errors
    },
    addSection () {
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
    deleteSection (index) {
      this.sections.splice(index, 1)
    },
    addItem (type, i) {
      let key = `new${type[0].toUpperCase()}${type.slice(1)}`
      const item = this.sections[i][key]

      const urlCheck = !item.url || this.$v.sections.$each.$iter[i][key].url.url
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
    deleteItem (type, sectionIndex, itemIndex) {
      this.sections[sectionIndex][type].splice(itemIndex, 1)
    },
    submit () {
      this.$v.$touch()
      if (!this.$v.$anyError) {
        this.saveCurriculum(this.curriculumInfo, this.sections)
      }
    }
  }
}
</script>
