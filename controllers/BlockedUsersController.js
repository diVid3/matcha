const {
  BlockedUsersModel
} = require('../models')

class BlockedUsersController {

  static getBlockedUsersBySession(req, res) {

    req.body = {
      id: req.session.userId + ''
    }

    BlockedUsersModel.getBlockedUsersByID(req.body)
    .then((statusObj) => {
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
    .catch((statusObj) => {
      console.log(statusObj)
      statusObj.body && statusObj.body.errors && console.log(statusObj.body.errors)
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
  }

  // requires { targetUserID }
  static createBlockedUserBySession(req, res) {

    req.body.id = req.session.userId + ''

    BlockedUsersModel.createBlockedUserByID(req.body)
    .then((statusObj) => {
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
    .catch((statusObj) => {
      console.log(statusObj)
      statusObj.body && statusObj.body.errors && console.log(statusObj.body.errors)
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
  }

  static deleteBlockedUserBySession(req, res) {

    req.body.id = req.session.userId + ''

    BlockedUsersModel.deleteBlockedUserByID(req.body)
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

module.exports = BlockedUsersController