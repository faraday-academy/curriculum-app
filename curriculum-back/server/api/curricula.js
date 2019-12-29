const express = require('express')
const mongoose = require('mongoose')

const { Curriculum } = require('@db')

const router = express.Router()

router.route('/')
  .get(async function (req, res) {
    const curricula = await Curriculum.find()
    res.send(curricula)
  })
  .post(async function (req, res) {
    const { name, goal, description, sections } = req.body
    const curriculum = new Curriculum({
      name,
      goal,
      description,
      sections
    })
    await curriculum.save()
    res.send(201, "Success")
  })

router.route('/:id')
  .get(function (req, res) {
    res.send(req.params)
  })
  .patch(function (req, res) {
    res.send('Got a POST request')
  })
  .delete(function (req, res) {
    res.send('Got a DELETE request')
  })

module.exports = router
