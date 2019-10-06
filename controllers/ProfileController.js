const path = require('path');

// TODO: Require ProfileModel
// const {
//   ProfileModel
// } = require('../models');

class ProfileController {
  static get(req, res) {
    res.sendFile(path.join(__dirname, '../views', 'profile.html'));
  }
  static post(req, res) {

  }
}

module.exports = ProfileController;