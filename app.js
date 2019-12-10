const express = require('express')
const helmet = require('helmet')
const router = require('./routes')
const SQLCon = require('./config/SQLCon')
const path = require('path')

// TODO: Remove this if hosting a build.
const cors = require('cors')

// This will need to be changed as the domain will change when hosting a react app from the public files, the
// domain will be the same, so no cors would be required, I think.
const corsOptions = {
  origin: 'http://localhost:3001',
  credentials: true  // This will allow cookies to be set.
}

// Express-session setup. Don't forget to start the redis server.
const redis = require('redis')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const client = redis.createClient()

const port = 3000
const app = express()

client.on('ready', () => console.log('Connected to Redis.'))
client.on('error', (err) => console.log(err))

SQLCon.initCon()
.then((message) => {
  console.log(message)

  app.use(express.json())
  app.use(helmet())

  // TODO: Remove this if hosting a build. The reason being that the domains won't be different, if you do a build
  // and serve the react app from the same server, as is the case with a build, the domain would be the same, which
  // is just the IP: 127.0.0.1 or localhost. But because we have a react running on a dev server, CORS should be
  // set to allow requests from all origins.
  app.use(cors(corsOptions))
  app.use(session({
    store: new RedisStore({ client }),
    name: 'sid',
    saveUninitialized: false,
    resave: false,
    secret: 'mySuperDuperSecret',
    cookie: { httpOnly: false }
  }))

  // TODO: Enable this if you're going to host a build
  app.use(express.static('pictures'))
  app.use(router)
  app.listen(3000, () => {
    console.log(`Express server listening on port ${port}.`)
  })
})
.catch((err) => {
  console.log(err)
  process.exit(1)
})