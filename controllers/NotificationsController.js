const {
  NotificationsModel
} = require('../models')

class NotificationsController {

  static getNotificationsBySession(req, res) {

    req.body = {
      username: req.session.username
    }

    NotificationsModel.getNotificationsByUsername(req.body)
    .then((statusObj) => {
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
    .catch((statusObj) => {
      console.log(statusObj)
      statusObj.body && statusObj.body.errors && console.log(statusObj.body.errors)
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
  }

  // Expects { notification, read }
  static createNotificationBySession(req, res) {

    // req.body.id = req.session.userId + ''
    req.body.username = req.session.username

    NotificationsModel.createNotificationByUsername(req.body)
    .then((statusObj) => {
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
    .catch((statusObj) => {
      console.log(statusObj)
      statusObj.body && statusObj.body.errors && console.log(statusObj.body.errors)
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
  }
}

module.exports = NotificationsController