import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

import { hashPassword } from '../utils/auth.js'
import { generateToken } from '../utils/jwt.js'
import { sendEmail } from '../utils/mailgun.js'

mongoose.set('debug', true)

import models from '../../db/index.js'
const { User, Verification } = models


const router = express.Router()

router.route('/login')
  .post(async (req, res) => {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email })

      const isValid = await bcrypt.compare(password, user.password)
      if (!isValid) {
        res.status(401).send('Invalid Login Credentials')
      }

      const token = generateToken(user._id)

      let payload = {
        id: user._id,
        username: user.username,
        email: user.email,
        token
      }

      res.send(payload)
    } catch (err) {
      console.error(err)
    }
  })

router.route('/register')
  .post(async (req, res) => {
    const { username, email, password } = req.body

    try {
      if (password.length >= 8) {
        const hash = await hashPassword(password)
        const user = new User({
          username,
          email,
          password: hash
        })
        const userRes = await user.save()
        console.log(userRes)

        const code = Math.floor(Math.random() * (999999 - 100000) + 100000)
        const verification = new Verification({
          userId: userRes._id,
          code
        })
        await verification.save()

        const payload = {
          code,
          email
        }

        try {
          await sendEmail(payload)
        } catch (err) {
          console.error(err)
        }
        res.status(201).send({ username, email })
      } else {
        res.status(400).send('Invalid credentials')
      }
    } catch(err) {
      console.error(err)
      res.sendStatus(400)
    }
  })

router.route('/verify')
  .post(async (req, res) => {
    const { email, code } = req.body

    try {
      const user = await User.findOne({ email })
      const verify = await Verification.findOne({ userId: user._id })

      if (verify.code === parseInt(code)) {
        user.isVerified = true
        await user.save()
        res.send('Verified')
        return true
      } else {
        res.status(400).send('Invalid Code')
      }
    } catch (err) {
      console.error(err)
      res.status(400).send('Invalid Code')
    }
  })

router.route('/logout')

export default router
