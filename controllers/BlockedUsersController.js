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
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
  }

  // TODO: Will need to create a createBlockedUserBy(Something) method as well.
}

module.exports = BlockedUsersController