const {
  FakeUsersModel
} = require('../models')

class FakeUsersController {

  static createFakeUserBySession(req, res) {

    FakeUsersModel.createFakeUserByID(req.body)
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

module.exports = FakeUsersController