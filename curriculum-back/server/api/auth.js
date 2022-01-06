const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const {
  auth: { hashPassword },
  jwt: { generateToken },
  mailgun: { sendEmail }
} = require('../utils')

mongoose.set('debug', true)

const { User, Verification } = require('@db')

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
    console.log(req.body)

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

        await sendEmail(payload)
        res.send(201, { username, email })
      } else {
        res.send('Invalid credentials').status(400)
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
      res.status(400).send('Invalid Code')
    }
  })

router.route('/logout')

module.exports = router
