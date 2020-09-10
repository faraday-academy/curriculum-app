const mongoose = require('mongoose')

if (process.env.NODE_ENV === 'production') {
  const username = process.env.MONGO_INITDB_ROOT_USERNAME
  const password = process.env.MONGO_INITDB_ROOT_PASSWORD
  mongoose.connect(`mongodb://${username}:${password}@mongo/curriculumapp`, {
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
