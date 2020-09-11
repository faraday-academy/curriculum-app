const express = require('express')
const mongoose = require('mongoose')
mongoose.set('debug', true)

const { Curriculum, User } = require('@db')
const {
  jwt: { decodeToken }
} = require('../utils')

const router = express.Router()
const authRouter = express.Router()

function checkIfAuthorizedUser(req, curriculum) {
  // this function takes in the whole request object and one
  // curriculum object from the database and returns a boolean
  // based off of whether the user has permission to perform crud
  // operation on Mongo object
  const token = req.header('authorization').split(' ')[1]
  const decodedToken = decodeToken(token)

  return decodedToken.data.userId === curriculum.createdBy.toString()
}

router.route('/')
  .get(async function (req, res) {
    const curricula = await Curriculum.paginate({}, {
      page: parseInt(req.query.page) || 1,
      limit: 5
    })
    res.send(curricula)
  })
authRouter.route('/')
  .post(async function (req, res) {
    const { name, goal, description, sections, createdBy } = req.body
    const curriculum = new Curriculum({
      name,
      goal,
      description,
      sections,
      createdBy
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
authRouter.route('/:id/sections/:sectionId/:type/:typeId')
  .patch(async function (req, res) {
    try {
      const { id, sectionId, type, typeId } = req.params
      const { isCompleted, name, url } = req.body

      const doc = await Curriculum.findById(id)

      if (checkIfAuthorizedUser(req, doc)) {
        const section = doc.sections.id(sectionId)
        let item = section[type].id(typeId)

        item.isCompleted = isCompleted
        item.name = name
        item.url = url

        await doc.save()

        res.send(item)
      } else {
        res.status(403).send('Unauthorized')
      }
    } catch(err) {
      res.status(500).send(err)
    }
  })
  .delete(async function (req, res) {
    const { id, sectionId, type, typeId } = req.params

    try {
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
    console.log(req.params)
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
authRouter.route('/:id/sections/:sectionId/:type')  
  .post(async function (req, res) {
    try {
      const { id, sectionId, type } = req.params
      const { name, link } = req.body

      const doc = await Curriculum.findById(id)

      if (checkIfAuthorizedUser(req, doc)) {
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
      } else {
        res.status(403).send('Unauthorized')
      }

      const item = section[type].id(itemId)

      res.send(item)
    } catch(err) {
      res.status(500).send(err)
    }
  })

router.route('/:id/sections/:sectionId')
  .get(async function(req, res) {
    const { id, sectionId } = req.params
    const doc = await Curriculum.findById(id)
    const section = doc.sections.id(sectionId)

    res.send(section)
  })
authRouter.route('/:id/sections/:sectionId')
  .patch(async function (req, res) {
    try {
      const { id, sectionId } = req.params
      const { name, goal } = req.body
      const doc = await Curriculum.findById(id)

      if (checkIfAuthorizedUser(req, doc)) {
        let docSection = doc.sections.id(sectionId)
        docSection.name = name
        docSection.goal = goal

        await doc.save()

        res.send(docSection)
      } else {
        res.status(403).send('Unauthorized')
      }
    } catch(err) {
      res.status(500).send(err)
    }
  })
  .delete(async function (req, res) {
    const { id, sectionId } = req.params

    try {
      let result = await Curriculum.updateOne(
        { _id: id },
        { $pull: 
          {sections:
            {'_id': sectionId}
          }
        }
      )
      res.send(result)
    } catch (err) {
      throw new Error(err)
    }
  })

router.route('/:id/sections')
  .get(async function(req, res) {
    const { id } = req.params
    const doc = await Curriculum.findById(id)

    res.send(doc.sections)
  })
authRouter.route('/:id/sections')
  .post(async function (req, res) {
    const { id } = req.params
    const { name } = req.body
    const sectionId = mongoose.Types.ObjectId()

    const doc = await Curriculum.findById(id)

    if (checkIfAuthorizedUser(req, doc)) {
      doc.sections.push({
        _id: sectionId,
        name
      })
      await doc.save()

      const section = await doc.sections.id(sectionId)

      res.send(section)
    } else {
      res.status(403).send('Unauthorized')
    }
  })

router.route('/:id')
  .get(async function (req, res) {
    try {
      const curriculum = await Curriculum.findById(req.params.id)
      const user = await User.findById(curriculum.createdBy)
      curriculum.createdByName = user.username

      res.send({ curriculum, createdByName: user.username})
    } catch (err) {
      res.status(404).send(err)
    }
  })
authRouter.route('/:id')
  .patch(async function (req, res) {
    try {
      const doc = await Curriculum.findById(req.params.id)

      if (checkIfAuthorizedUser(req, doc)) {
        await Curriculum.updateOne({ _id: req.params.id }, { ...req.body })
        res.send('Success')
      } else {
        res.status(403).send('Unauthorized')
      }
    } catch(err) {
      res.status(500).send(err)
    }
  })
  .delete(async function (req, res) {
    const doc = await Curriculum.findById(req.params.id)

    if (checkIfAuthorizedUser(req, doc)) {
      await Curriculum.deleteOne({ _id: req.params.id })
      res.send('Success')
    } else {
      res.status(403).send('Unauthorized')
    }
  })

module.exports = {
  curricula: router,
  authCurricula: authRouter
}
