import mongoose from 'mongoose'

if (process.env.NODE_ENV === 'production') {
  mongoose.connect(`mongodb://mongo/curriculumapp`, {})
} else {
  mongoose.connect('mongodb://localhost:27017/curriculumapp', {})
}

import Curriculum from './Curriculum.js'
import User from './User.js'
import Verification from './Verification.js'

export default {
  Curriculum,
  User,
  Verification
}
