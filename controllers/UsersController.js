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

    console.log(req.body)

    req.body = {
      username: req.params.username
    }

    UsersModel.getUserByEmail(req.body)
    .then((statusObj) => {
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
    .catch((statusObj) => {
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
  }

  static patchUserByID(req, res) {


  }

  static patchUserByEmail(req, res) {

    UsersModel.patchUserByEmail(req.body)
    .then((statusObj) => {
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
    .catch((statusObj) => {
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
  }

  static patchUserByUsername(req, res) {


  }
}

module.exports = UsersController