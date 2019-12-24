const {
  FriendsModel
} = require('../models')

class FriendsController {

  static getFriendsBySession(req, res) {

    req.body = {
      id: req.session.userId + ''
    }

    LikersModel.getFriendsByID(req.body)
    .then((statusObj) => {
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
    .catch((statusObj) => {
      console.log(statusObj)
      statusObj.body && statusObj.body.errors && console.log(statusObj.body.errors)
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
  }

  static getFriendsByUsername(req, res) {

    req.body = {
      username: req.params.username
    }

    FriendsModel.getFriendsByUsername(req.body)
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

module.exports = FriendsController