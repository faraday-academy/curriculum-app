const express = require('express')
const router = express.Router()

router.route('/')
  .get(function (req, res) {
    res.send('Hello Curricula!')
  })
  .post(function (req, res) {
    res.send('Got a POST request')
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
