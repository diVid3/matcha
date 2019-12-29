const RedisClientWrapper = require('./RedisClientWrapper')
const SocketStore = require('./SocketStore')
const {
  MessagesModel
} = require('../models')
const NotificationCommitter = require('./NotificationCommitter')

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

        const trueForwardMessage = {
          user_id: redisData.userId,
          other_user_id: data.targetUserID - 0,
          time_issued: data.timeIssued,
          message: data.message,
          read: data.read,
          username: redisData.username
        }

        // If the targeted user is already online, forward message so long.
        if (targetSocket) {
          targetSocket.emit('fromServerChatMessage', trueForwardMessage)
        }

        // message format for MessageModel validation.
        const dbMessage = {
          id: redisData.userId + '',            // this becomes user_id in db.
          targetUserID: data.targetUserID + '', // this becomes other_user_id in db.
          timeIssued: data.timeIssued + '',     // this becomes time_issued in db.
          message: data.message,
          read: data.read + '',
          username: redisData.username
        }

        return MessagesModel.createMessageByIDAndTargetID(dbMessage)
      })
      .then((json) => {

        // Nothing to do if the message is stored successfully.
      })
      .catch((json) => {
        console.log(json)
      })
    })
  }

  // Data:
  //
  // {
  //   targetUsername: 'diVid3'
  //   notification: 'You received a message',
  //   read: '0',
  //   origUsername: 'tomGun1911'
  // }

  static attachNotificationListeners(socket) {

    socket.on('fromClientNotification', (data) => {

      NotificationCommitter.commitNotification(data)
    })
  }
}

module.exports = ConfigureSockets