// TODO: make /users/:username or email api endpoints

const express = require('express')
const mongoose = require('mongoose')
mongoose.set('debug', true)

const { User, Curriculum } = require('@db')

const router = express.Router()

router.route('/:id/curricula')
  .get(async (req, res) => {
    const userId = req.params.id
    const curricula = await Curriculum.find({ createdBy: userId })
    res.send(curricula)
  })

router.route('/:id')
  .get(async (req, res) => {
    const userId = req.params.id
    const user = await User.findById(userId)
    res.send(user)
  })
  .patch(async (req, res) => {

  })
  .delete(async (req, res) => {

  })

router.route('/')
  .get(async (req, res) => {
    const users = await User.find()
    res.send(users)
  })

module.exports = router
