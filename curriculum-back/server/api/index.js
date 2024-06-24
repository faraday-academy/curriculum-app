import express from 'express'
const router = express.Router()

import authMiddleware from '../middleware/auth.js'

import models from './curricula.js'
import count from './count.js'
import auth from './auth.js'
import users from './users.js'

const { curricula, authCurricula } = models

router.use('/curricula', curricula)
router.use('/curricula', authMiddleware, authCurricula)
router.use('/count', count)
router.use('/auth', auth)
router.use('/users', authMiddleware, users)

export default router
