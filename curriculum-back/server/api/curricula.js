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
  .get(async function (req, res) {
    const curriculum = await Curriculum.findById(req.params.id)
    res.send(curriculum)
  })
  .patch(async function (req, res) {
    await Curriculum.updateOne({ _id: req.params.id }, { ...req.body })
    res.send('Success')
  })
  .delete(async function (req, res) {
    await Curriculum.deleteOne({ _id: req.params.id })
    res.send('Success')
  })

module.exports = router
