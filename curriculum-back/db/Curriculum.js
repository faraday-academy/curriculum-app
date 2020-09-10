const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const CurriculumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  goal: {
    type: String
  },
  description: {
    type: String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  sections: [{
    name: {
      type: String,
      required: true
    },
    goal: {
      type: String
    },
    resources: [{
      isCompleted: {
        type: Boolean,
        default: false
      },
      name: {
        type: String,
        required: true
      },
      url: {
        type: String
      }
    }],
    projects: [{
      isCompleted: {
        type: Boolean,
        default: false
      },
      name: {
        type: String,
        required: true
      },
      url: {
        type: String
      }
    }]
  }]
}, { timestamps: true })

CurriculumSchema.plugin(mongoosePaginate)
const Curriculum = mongoose.model('Curriculum', CurriculumSchema)

module.exports = Curriculum
