import express from 'express'
const router = express.Router()

import authMiddleware from '../middleware/auth'

import { curricula, authCurricula } from './curricula'
import count from './count'
import auth from './auth'
import users from './users'

router.use('/curricula', curricula)
router.use('/curricula', authMiddleware, authCurricula)
router.use('/count', count)
router.use('/auth', auth)
router.use('/users', authMiddleware, users)

module.exports = router
