const {
  UsersModel
} = require('../models');

class UsersController {

  static getAllUsers(req, res) {

  }

  static createUser(req, res) {

    res.json({success: true})
  }

  static getUser(req, res) {

  }

  static patchUser(req, res) {

  }

  static deleteUser(req, res) {

  }

  static get(req, res) {

    // TODO: Send user state.
  }
  static post(req, res) {

    // TODO: create new user.
    
    // If valid, respond with 200 OK
  }
}

module.exports = UsersController;