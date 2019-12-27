const express = require('express')
const router = express.Router()

const curricula = require('./curricula')

router.use('/curricula', curricula)

module.exports = router