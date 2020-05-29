const mongoose = require('mongoose')

const VerificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
    required: true
  },
  code: {
    type: Number,
    min: 100000,
    max: 999999,
    required: true
  },
}, { timestamps: true })

const Verification = mongoose.model('Verification', VerificationSchema)

module.exports = Verification
