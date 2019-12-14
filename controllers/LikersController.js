const {
  LikersModel,
  FriendsModel
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
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
  }

  // TODO: This might need to change as the creation of a friend is dependent on if the
  // the target user also likes you, not only just you liking the target user. If they
  // both like each other, then they are said to be friends. If they are confirmed to
  // be friends, two new entries into the friends table should be inserted, swapping
  // userID's and usernames.
  // This requires: { targetUserID, targetUsername }
  static createLikerBySession(req, res) {

    req.body.id = req.session.userId + ''
    req.body.username = req.session.username

    LikersModel.createLikerByID(req.body)
    .then((statusObj) => {

      return Promise.all([
        LikersModel.getLikersByUsername({ username: req.body.username }),
        LikersModel.getLikersByUsername({ username: req.body.targetUsername })
      ])
    })
    .then((obj) => {

      const myLikers = obj[0].rows
      const theirLikers = obj[1].rows

      const myUsername = req.body.username
      const theirUsername = req.body.targetUsername

      const iLikeThem = theirLikers.some((liker) => liker.username === myUsername)
      const theyLikeMe = myLikers.some((liker) => liker.username === theirUsername)

      if (iLikeThem && theyLikeMe) {

        return FriendsModel.createFriendsByUsernames({
          id: req.body.id,
          username: req.body.username,
          targetUserID: req.body.targetUserID,
          targetUsername: req.body.targetUsername
        })
      }
    })
    .then((statusObj) => {
      res.status(200).json({})
    })
    .catch((statusObj) => {
      console.log(statusObj)
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
  }

  // This requires: { targetUserID, targetUsername }
  static deleteLikerBySession(req, res) {

    req.body.id = req.session.userId + ''
    req.body.username = req.session.username

    LikersModel.deleteLikerByID(req.body)
    .then((statusObj) => {

      return FriendsModel.deleteFriendsByUsernames({
        id: req.body.id,
        username: req.body.username,
        targetUserID: req.body.targetUserID,
        targetUsername: req.body.targetUsername
      })
    })
    .then((statusObj) => {
      res.status(200).json({})
    })
    .catch((statusObj) => {
      console.log(statusObj)
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
  }
}

module.exports = LikersController