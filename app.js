const express = require('express')
const helmet = require('helmet')
const router = require('./routes')
const SQLCon = require('./config/SQLCon')
const socket = require('socket.io')
const Config = new (require('./config/Config'))()
const SocketStore = require('./helpers/SocketStore')
const ConfigureSockets = require('./helpers/ConfigureSockets')
const RedisClientWrapper = require('./helpers/RedisClientWrapper')

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

RedisClientWrapper.saveRedisClient(client)

const port = 3000
const app = express()

const server = require('http').createServer(app);
const io = socket(server, {
  pingTimeout: 60000
})

// TODO: build io socket store to migrate reconnecting sockets and their id's to their respective associated
// usernames. You will need to client here as well. A user's associated socket will be null initially, this
// entry is only made when a user successfully logged in, not before, finding the associated socket will be
// done either through linear lookup of a username, or simply a constant lookup of a hash of the username,
// for the latter, a Map can be used. If a user logs out, that key is destroyed, or should return some falsy
// value except ''. On the front-end, the connection should only be established when a user is logged in, the
// reason being that if the connection is made when a user isn't logged in, the headers will be sent without
// a cookie, and when the user did log in, no other headers will be sent since the connection was already made.

io.on('connection', (socket) => {

  if (socket.request.headers.cookie) {

    const cookieArr = socket.request.headers.cookie.split('; ')

    cookieArr.forEach((cookie) => {
  
      if (cookie.includes('sid')) {
  
        const cookieStr = cookie.split('=')[1]
        const redisKey = cookieStr.split('.')[0].slice(4, 999)
  
        client.get('sess:' + redisKey, (err, json) => {
  
          if (err) {
  
            return
          }

          const data = JSON.parse(json)

          ConfigureSockets.attachPresenceListeners(socket)
          ConfigureSockets.attachMessageListeners(socket)
          ConfigureSockets.attachNotificationListeners(socket)
  
          if (!SocketStore.getSocket(data.username)) {

            SocketStore.addEntry(data.username, cookieStr, socket)
          }
          else {

            SocketStore.updateSocket(cookieStr, socket)
          }
        })
      }
    })
  }

  // socket.on('test', (data) => {
  //   console.log(data)
  // })
  socket.on('disconnect', (reason) => {
    // console.log('reason for disconnect: ', reason)
  })
})

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
    secret: Config.sessionSecret,
    cookie: { httpOnly: false }
  }))

  // TODO: Enable this if you're going to host a build
  app.use(express.static('pictures'))
  app.use(router)
  server.listen(3000, () => {
    console.log(`Express server listening on port ${port}.`)
  })
})
.catch((err) => {
  console.log(err)
  process.exit(1)
})