const express = require('express')
const router = express.Router()

const curricula = require('./curricula')
const count = require('./count')
const auth = require('./auth')

router.use('/curricula', curricula)
router.use('/count', count)
router.use('/auth', auth)

module.exports = router
