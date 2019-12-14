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
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
  }

  // TODO: This will not be called from the FriendsController but instead from the
  // LikersController as creating a friend is dependent on if the two users like each other.
  // { username, id, targetUsername, targetUserID }
}

module.exports = FriendsController