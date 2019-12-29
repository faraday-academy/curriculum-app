const mongoose = require('mongoose')
var timestamps = require('mongoose-timestamp')

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
    resources: [String],
    projects: [String]
  }]
})

CurriculumSchema.plugin(timestamps);
const Curriculum = mongoose.model('Curriculum', CurriculumSchema)

module.exports = Curriculum
