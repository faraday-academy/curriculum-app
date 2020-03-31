const express = require('express')
const mongoose = require('mongoose')
mongoose.set('debug', true)

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
    const currRes = await curriculum.save()
    res.send(201, currRes)
  })

router.route('/:id/sections/:sectionId/:type/:typeId')
  .get(async function (req, res) {
    // this function is only for testing purposes
    const { id, sectionId, type, typeId } = req.params
    const doc = await Curriculum.findById(id)

    const section = doc.sections.id(sectionId)
    const item = section[type].id(typeId)

    res.send(item)
  })
  .put(async function (req, res) {
    const { id, sectionId, type, typeId } = req.params
    const { name, url } = req.body
  })
  .patch(async function (req, res) {
    try {
      const { id, sectionId, type, typeId } = req.params
      const { isCompleted, name, url } = req.body
      const doc = await Curriculum.findById(id)

      const section = doc.sections.id(sectionId)
      let item = section[type].id(typeId)

      item.isCompleted = isCompleted
      item.name = name
      item.url = url

      await doc.save()

      res.send(item)
    } catch(err) {
      res.status(500).send(err)
    }
  })
  .delete(async function (req, res) {
    const { id, sectionId, type, typeId } = req.params

    try {
      // const doc = await Curriculum.findById(id)
      // const section = await doc.sections.id(sectionId)
      // let item = await section[type].id(typeId)
      // await item.remove()
      // const doc = await Curriculum.findById(id) 
      // const section = await doc.sections.id(sectionId)
      // section[type].id(typeId).remove()
      // await section[type].remove({ _id: typeId })
      let result = await Curriculum.updateOne(
        { _id: id, 'sections._id': sectionId },
        { $pull: 
          {[`sections.$.${type}`]:
            {'_id': typeId}
          }
        }
      )
      res.send(result)
    } catch (err) {
      throw new Error(err)
    }
  })

router.route('/:id/sections/:sectionId/:type')
  .get(async function (req, res) {
    try {
      const { id, sectionId, type } = req.params

      const doc = await Curriculum.findById(id)

      const section = doc.sections.id(sectionId)
      let item = section[type]

      res.send(item)
    } catch(err) {
      res.status(500).send(err)
    }
  })
  .post(async function (req, res) {
    try {
      const { id, sectionId, type } = req.params
      const { name, link } = req.body

      const doc = await Curriculum.findById(id)

      const section = doc.sections.id(sectionId)
      let items = section[type]
      const itemId = mongoose.Types.ObjectId()

      items.push({
        _id: itemId,
        name,
        link,
        isCompleted: false
      })

      await doc.save()

      const item = section[type].id(itemId)

      res.send(item)
    } catch(err) {
      res.status(500).send(err)
    }
  })
  .patch(async function (req, res) {
    // try {
    //   const { id, sectionId, type, typeId } = req.params
    //   const { isCompleted, name, url } = req.body
    //   const doc = await Curriculum.findById(id)

    //   const section = doc.sections.id(sectionId)
    //   let item = section[type].id(typeId)

    //   item.isCompleted = isCompleted
    //   item.name = name
    //   item.url = url

    //   await doc.save()

    //   res.send(item)
    // } catch(err) {
    //   res.status(500).send(err)
    // }
  })

router.route('/:id/sections/:sectionId')
  .patch(async function (req, res) {
    try {
      const { id, sectionId, type, typeId } = req.params
      const { isCompleted, name, url } = req.body
      const doc = await Curriculum.findById(id)

      const section = doc.sections.id(sectionId)
      let item = section[type].id(typeId)

      item.isCompleted = isCompleted
      item.name = name
      item.url = url

      await doc.save()

      res.send(item)
    } catch(err) {
      res.status(500).send(err)
    }
  })
  .delete(async function (req, res) {
    const { id, sectionId, type, typeId } = req.params

    try {
      // const doc = await Curriculum.findById(id)
      // const section = await doc.sections.id(sectionId)
      // let item = await section[type].id(typeId)
      // await item.remove()
      // const doc = await Curriculum.findById(id) 
      // const section = await doc.sections.id(sectionId)
      // section[type].id(typeId).remove()
      // await section[type].remove({ _id: typeId })
      let result = await Curriculum.updateOne(
        { _id: id, 'sections._id': sectionId },
        { $pull: 
          {[`sections.$.${type}`]:
            {'_id': typeId}
          }
        }
      )
      res.send(result)
    } catch (err) {
      throw new Error(err)
    }
  })

router.route('/:id/sections')
  .post(async function (req, res) {
    const { id, sectionId, type, typeId } = req.params
    const { name, url } = req.body
  })

router.route('/:id')
  .get(async function (req, res) {
    const curriculum = await Curriculum.findById(req.params.id)
    res.send(curriculum)
  })
  .patch(async function (req, res) {
    try {
      await Curriculum.updateOne({ _id: req.params.id }, { ...req.body })
      res.send('Success')
    } catch(err) {
      
    }
  })
  .delete(async function (req, res) {
    await Curriculum.deleteOne({ _id: req.params.id })
    res.send('Success')
  })

module.exports = router
