const {
  UsersModel
} = require('../models');

class UsersController {

  static getAllUsers(req, res) {

  }

  static createUser(req, res) {

    UsersModel.createUser(req.body)
    .then(() => {

      res.sendStatus(204);
    })
    .catch(() => {
      
      res.sendStatus(400);
    });
  }

  static getUserByID(req, res) {

    // TODO: Finish this.
    
    // res.json({ USER INFO })
  }
  
  static getUserByUsername(req, res) {
    
    // TODO: Check if user exists before a client can register.
    console.log(req.params)

    // const obj = UsersModel.

    // res.json({ USER INFO })
  }

  static patchUser(req, res) {

  }

  static deleteUser(req, res) {

  }
}

module.exports = UsersController;