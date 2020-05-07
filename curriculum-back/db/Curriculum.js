const mongoose = require('mongoose')

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
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
}, { timestamps: true })

const Curriculum = mongoose.model('Curriculum', CurriculumSchema)

module.exports = Curriculum
