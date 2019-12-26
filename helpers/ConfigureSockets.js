const RedisClientWrapper = require('./RedisClientWrapper')
const SocketStore = require('./SocketStore')

class ConfigureSockets {

  static attachPresenceListeners(socket) {

    socket.on('fromClientUserLoggedIn', (data) => {
      socket.broadcast.emit('fromServerUserLoggedIn', data)
    })

    socket.on('fromClientUserLoggedOff', (data) => {
      socket.broadcast.emit('fromServerUserLoggedOff', data)
    })
  }

  static attachMessageListeners(socket) {

    socket.on('fromClientChatMessage', (data) => {

      const targetSocket = SocketStore.getSocket(data.targetUsername)
      const redisClient = RedisClientWrapper.getRedisClient()
      const redisKey = RedisClientWrapper.getRedisKey(socket)

      const redisInfoPromise = new Promise((res, rej) => {

        redisClient.get(redisKey, (err, json) => {

          if (err) {
            rej(err)
          }

          res(json)
        })
      })

      redisInfoPromise
      .then((json) => {

        const redisData = JSON.parse(json)

        console.log(data)
        console.log(redisData)

        // If the targeted user is already online
        if (targetSocket) {

          // TODO: fashioned a new message to mimic true database message.
          const trueForwardMessage = {
            user_id: redisData.userId,
            other_user_id: data.targetUserID - 0,
            time_issued: data.timeIssued,
            message: data.message,
            read: data.read,
            username: redisData.username
          }
  
          targetSocket.emit('fromServerChatMessage', trueForwardMessage)
        }
      })
      .catch((json) => {
        console.log('fromClientChatMessage redisInfoPromiseError')
        console.log(json)
      })
    })
  }
}

module.exports = ConfigureSockets