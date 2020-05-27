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

        const code = Math.floor(Math.random() * (999999 - 100000) + 100000)
        // TODO: save code and user id in verfication table
        const payload = {
          code
        }
        await sendEmail(payload)
        res.send(201, { username, email })
      }
      res.send(400)
    } catch(err) {
      console.error(err)
      res.send(400)
    }
  })

router.route('/verify')
// TODO: verifying the code from the user email

router.route('/logout')

module.exports = router
