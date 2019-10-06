const path = require('path');

class LandingController {
  static get(req, res) {
    console.log('Landing req.session:');
    console.log(req.session);
    res.sendFile(path.join(__dirname, '../views', 'landing.html'));
  }
}

module.exports = LandingController;