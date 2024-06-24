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

import Curriculum from './Curriculum.js'
import User from './User.js'
import Verification from './Verification.js'

export default {
  Curriculum,
  User,
  Verification
}
