const {
  UsersModel
} = require('../models')

class UsersController {

  static getAllUsers(req, res) {


  }

  static createUser(req, res) {

    UsersModel.createUser(req.body)
    .then((statusObj) => {
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
    .catch((statusObj) => {
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
  }

  static verifyUserRegistration(req, res) {

    UsersModel.verifyUserRegistration(req.body)
    .then((statusObj) => {
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
    .catch((statusObj) => {
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
  }

  static verifyUserPassReset(req, res) {


  }

  static getUserByID(req, res) {


  }

  static getUserByResetToken(req, res) {

    // This will be used to validate the uuid coming from the front-end
    // to enable the user to reset their password, the uuid should have a match
    // in the DB and return that match.
    //
    // This is called after the email is sent, but before the PATCH request.

    req.body = {
      resetToken: req.params.uuid
    }

    UsersModel.getUserByResetToken(req.body)
    .then((statusObj) => {
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
    .catch((statusObj) => {
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
  }

  static getUserByEmail(req, res) {

    req.body = {
      email: req.params.email
    }

    UsersModel.getUserByEmail(req.body)
    .then((statusObj) => {
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
    .catch((statusObj) => {
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
  }
  
  static getUserByUsername(req, res) {


  }

  static patchUserByID(req, res) {


  }

  static patchUserByEmail(req, res) {

    // TODO: Need to call UsersModel here to patch the data by email, method already made.
  }

  static patchUserByUsername(req, res) {


  }
}

module.exports = UsersController