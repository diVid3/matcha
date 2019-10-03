const express = require('express')
const mysql = require('mysql')
const router = require('./routes')
const app = express()

app.use(express.static('public'))
app.use(router)

app.listen(3000, () => {
  console.log('Express server listening on port 3000...')
})