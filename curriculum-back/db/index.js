const mongoose = require('mongoose')

if (process.env.NODE_ENV === 'production') {
  const { DB_USER, DB_PASSWORD } = process.env
  mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@mongo/curriculumapp`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
} else {
  mongoose.connect('mongodb://localhost:27017/curriculumapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}

const Curriculum = require('./Curriculum')
const User = require('./User')
const Verification = require('./Verification')

module.exports = {
  Curriculum,
  User,
  Verification
}
