const {
  BlockedUsersModel,
  NotificationsModel
} = require('../models')

const SocketStore = require('./SocketStore')

// This class will first check if the targetUser can receive messages from the origUser, they can
// if the origUser is not blocked by the targetUser.
class NotificationCommitter {

  // Notification Event Data:
  // 
  // {
  //   targetUsername: 'derpo123'
  //   notification: 'Somebody viewed your profile',
  //   read: '0',
  //   origUsername: 'diVid3'
  // }
  static commitNotification(data) {

    BlockedUsersModel.getBlockedUsersByUsername({
      username: data.targetUsername
    })
    .then((json) => {

      if (json && json.body && json.body.rows) {

        // The user should not receive notifications from me if I'm on their blocked list.
        if (json.body.rows.some(blockedUser => blockedUser.blocked_username === data.origUsername)) {

          return
        }

        // Forward notification here.
        const targetSocket = SocketStore.getSocket(data.targetUsername)

        // If the targetUser is currently connected.
        if (targetSocket) {

          targetSocket.emit('fromServerNotification', data)
        }

        // Saving notification to DB.
        NotificationsModel.createNotificationByUsername({
          username: data.targetUsername,
          notification: data.notification,
          read: data.read
        })
        .then((json) => {

          // Nothing to do.
        })
        .catch((json) => {

          console.log('commitNotification, NotificationsModel.createNotificationByUsername failed, JSON: ', json)
        })
      }
    })
    .catch((json) => {

      console.log('commitNotification, BlockedUsersModel.getBlockedUsersByUsername failed, JSON: ', json)
    })
  }
}

module.exports = NotificationCommitter