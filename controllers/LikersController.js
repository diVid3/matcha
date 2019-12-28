const {
  LikersModel,
  FriendsModel,
  UsersModel
} = require('../models')

class LikersController {

  static getLikersBySession(req, res) {

    req.body = {
      id: req.session.userId + ''
    }

    LikersModel.getLikersByID(req.body)
    .then((statusObj) => {
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
    .catch((statusObj) => {
      console.log(statusObj)
      statusObj.body && statusObj.body.errors && console.log(statusObj.body.errors)
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
  }

  static getLikersByUsername(req, res) {

    req.body = {
      username: req.params.username
    }

    LikersModel.getLikersByUsername(req.body)
    .then((statusObj) => {
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
    .catch((statusObj) => {
      console.log(statusObj)
      statusObj.body && statusObj.body.errors && console.log(statusObj.body.errors)
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
  }

  // This requires: { targetUserID, targetUsername }
  static createLikerBySession(req, res) {

    req.body.id = req.session.userId + ''
    req.body.username = req.session.username

    Promise.all([
      UsersModel.increaseUserRating(req.body),
      LikersModel.createLikerByID(req.body),
    ])
    .then((statusObj) => {

      return Promise.all([
        LikersModel.getLikersByUsername({ username: req.body.username }),
        LikersModel.getLikersByUsername({ username: req.body.targetUsername })
      ])
    })
    .then((obj) => {

      const myLikers = obj[0].body.rows
      const theirLikers = obj[1].body.rows

      const myUsername = req.body.username
      const theirUsername = req.body.targetUsername

      const iLikeThem = theirLikers.some((liker) => liker.liker_username === myUsername)
      const theyLikeMe = myLikers.some((liker) => liker.liker_username === theirUsername)

      if (iLikeThem && theyLikeMe) {

        // TODO:
        // If we both like eachother, it means that targetUsername's new liker entry sealed the deal. That in
        // turn means that I liked them 2nd, which means they liked me 1st. Which means that I need to send
        // them the notification of 'A liked user liked you back'

        // { targetUsername: 'tomGun1911', notification: 'A liked user liked you back', read: '0' }

        return FriendsModel.createFriendsByUsernames({
          id: req.body.id,
          username: req.body.username,
          targetUserID: req.body.targetUserID,
          targetUsername: req.body.targetUsername
        })
      }
    })
    .then((statusObj) => { // statusObj can be undefined if the if-statement above is skipped.

      if (statusObj) {
        return res.status(statusObj.statusCode || 500).json(statusObj.body || {})
      }

      res.status(200).json({})
    })
    .catch((statusObj) => {
      console.log(statusObj)
      statusObj.body && statusObj.body.errors && console.log(statusObj.body.errors)
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
  }

  // This requires: { targetUserID, targetUsername }
  static deleteLikerBySession(req, res) {

    req.body.id = req.session.userId + ''
    req.body.username = req.session.username

    Promise.all([
      LikersModel.deleteLikerByID(req.body),
      UsersModel.decreaseUserRating(req.body),
      FriendsModel.deleteFriendsByUsernames(req.body)
    ])
    .then((obj) => {
      res.status(obj[2].statusCode || 500).json(obj[2].body || {})
    })
    .catch((statusObj) => {
      console.log(statusObj)
      statusObj.body && statusObj.body.errors && console.log(statusObj.body.errors)
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
  }
}

module.exports = LikersController