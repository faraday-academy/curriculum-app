const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/curriculumapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const Curriculum = require('./Curriculum')
const User = require('./User')

module.exports = {
  Curriculum,
  User
}
