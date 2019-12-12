const {
  UsersModel
} = require('../models')

class UsersController {

  static getSessionUsername(req, res) {

    if (req.session && req.session.username) {
      return res.status(200).json({ status: true, username: req.session.username })
    }
    return res.status(200).json({ status: false, message: 'no session username' })
  }

  static getAllUsers(req, res) {


  }

  static createUser(req, res) {

    UsersModel.createUser(req.body)
    .then((statusObj) => {
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
    .catch((statusObj) => {
      console.log(statusObj.body)
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
  }

  static verifyUserRegistration(req, res) {

    UsersModel.verifyUserRegistration(req.body)
    .then((statusObj) => {
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
    .catch((statusObj) => {
      console.log(statusObj.body)
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
  }

  static verifyUserPassReset(req, res) {


  }

  static getUserBySession(req, res) {

    req.body = {
      email: req.session.email
    }

    UsersModel.getUserByEmail(req.body)
    .then((statusObj) => {
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
    .catch((statusObj) => {
      console.log(statusObj.body)
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
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
      console.log(statusObj.body)
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
      console.log(statusObj.body)
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
  }
  
  static getUserByUsername(req, res) {

    req.body = {
      username: req.params.username
    }

    UsersModel.getUserByUsername(req.body)
    .then((statusObj) => {
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
    .catch((statusObj) => {
      console.log(statusObj.body)
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
  }

  static patchUserBySession(req, res) {

    req.body.id = req.session.userId + ''

    UsersModel.patchUserByID(req)
    .then((statusObj) => {
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
    .catch((statusObj) => {
      console.log(statusObj.body)
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
  }

  static patchUserByEmail(req, res) {

    const targetEmail = req.params.email

    UsersModel.patchUserByEmail(req, targetEmail)
    .then((statusObj) => {
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
    .catch((statusObj) => {
      console.log(statusObj.body)
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
  }

  static patchUserByUsername(req, res) {


  }
}

module.exports = UsersController