import mongoose from 'mongoose'

if (process.env.NODE_ENV === 'production') {
  mongoose.connect(`mongodb://mongo/curriculumapp`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
} else {
  mongoose.connect('mongodb://localhost:27017/curriculumapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}

import Curriculum from './Curriculum'
import User from './User'
import Verification from './Verification'

module.exports = {
  Curriculum,
  User,
  Verification
}
