const express = require('express')
const mysql = require('mysql')
const app = express();



app.use(express.static('public'))

app.listen(3000, () => {
  console.log('Express server listening...')
})