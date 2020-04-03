const express = require('express')
const router = express.Router()

const curricula = require('./curricula')
const count = require('./count')

router.use('/curricula', curricula)
router.use('/count', count)

module.exports = router
