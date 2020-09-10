// TODO: make /users/:username or email api endpoints

const express = require('express')
const mongoose = require('mongoose')

const { User, Curriculum } = require('@db')
const bcrypt = require('bcrypt')
const { hashPassword } = require('../utils/auth')

const router = express.Router()

if (process.env.NODE_ENV !== 'production') {
  mongoose.set('debug', true)
}

router.route('/:id/curricula')
  .get(async (req, res) => {
    const userId = req.params.id

    const curricula = await Curriculum.paginate({ createdBy: userId }, {
      page: parseInt(req.query.page) || 1,
      limit: 5
    })
    res.send(curricula)
  })

router.route('/:id/update-password')
  .post(async (req, res) => {
    const { oldPassword, newPassword } = req.body

    if (newPassword.length >= 8) {
      res.send(400)
    }
    
    const id = req.params.id
    const user = await User.findById(id)

    const isValid = await bcrypt.compare(oldPassword, user.password)
    if (!isValid) {
      res.status(400).send('Invalid Password')
    }

    user.password =  await hashPassword(newPassword)
    await user.save()

    res.send(200)
  })  

router.route('/:id')
  .get(async (req, res) => {
    const userId = req.params.id
    const user = await User.findById(userId)
    res.send(user)
  })
  .patch(async (req, res) => {
    const userId = req.params.id
    const { username, email } = req.body

    const user = await User.findById(userId)

    if (email) user.email = email
    if (username) user.username = username

    await user.save()

    res.send(201)
  })
  .delete(async (req, res) => {

  })

router.route('/')
  .get(async (req, res) => {
    const users = await User.find()
    res.send(users)
  })

module.exports = router
