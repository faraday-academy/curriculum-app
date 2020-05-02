const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10

mongoose.set('debug', true)

const { User } = require('@db')

const router = express.Router()

router.route('/login')
  .post(async (req, res) => {
    const { username, email, password } = req.body
    const doc = await User.find({ email })
    res.send(doc)
    // salt and hash password and compare with db
    // if valid, authenticate user with JWT token
  })

router.route('/register')
  .post(async (req, res) => {
    const { username, email, password } = req.body
    // TODO: check info is valid

    const hash = await bcrypt.hash(password, saltRounds)
    const user = new User({
      username,
      email,
      password: hash
    })
    const userRes = await user.save()
    res.send(201, { username, email })
  })
 
router.route('/logout')

module.exports = router
