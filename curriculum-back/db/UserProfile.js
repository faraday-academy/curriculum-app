const mongoose = require('mongoose')

const UserProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    minLength: 3,
    maxLength: 30
  },
  lastName: {
    type: String,
    minLength: 3,
    maxLength: 30
  },
  bio: {
    type: String
  },
  github: {
    type: String
  },
  twitter: {
    type: String
  },
  linkedin: {
    type: String
  },
  website: {
    type: String
  }
}, { timestamps: true })

const UserProfile = mongoose.model('User', UserProfileSchema)

module.exports = UserProfile
