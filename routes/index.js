const express = require('express')
const path = require('path')
const router = express.Router()

const {
  testWare
} = require('../middleware')

router.get('/home', testWare, (req, res) => {
  res.sendFile(path.join(__dirname, '../private', 'home.html'))
})

module.exports = router