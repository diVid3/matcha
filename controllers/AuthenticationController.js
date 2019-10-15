const nodemailer = require('nodemailer');
const Config = new (require('../config/Config'))();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: '11smtptest11@gmail.com',
    pass: '#Fadora123'
  },
  tls: {
    rejectUnauthorized: false
  }
});

const {
  UsersModel
} = require('../models');

class AuthenticationController {

  static login(req, res) {
  
    // TODO: Fill this in.
    // use req.params to access path param.
  }

  static logout(req, res) {
  
    // TODO: Fill this in.
    // use req.params to access path param.
  }

  static verifyReg(req, res) {

    res.send("<h2>You're registered!</h2>");
    // TODO: Fill this in.
    // use req.params to access path param.
  }
  
  static verifyReset(req, res) {
    
    res.send("<h2>Your password has been reset!</h2>");
    // TODO: Fill this in.
    // use req.params to access path param.
  }

  static sendRegEmail(req, res) {

    if (
      !req.body ||
      !req.body.email ||
      !req.body.verifyToken
    ) {

      res.sendStatus(400);
      return
    }

    const email = req.body.email;
    const uuid = req.body.verifyToken;
    const username = req.body.username;

    transporter.sendMail({
      from: 'no-reply@matcha.localhost',
      to: `${email}`,
      subject: 'Verify Registration | Matcha',
      text: `Hi ${username}, welcome to matcha!\n\n` +
      
      'To complete your registration please click on the following link:\n\n' +
      `${Config.backend}/api/v1.0/verify-registration/${uuid}\n\n` +
      
      'The link will remain active for 24 hours.'
    }, (err, info) => {

      if (err) {
        
        res.sendStatus(500);
      }
      else {

        // TODO: Set time-out clean up for DB. Use model.
        res.sendStatus(204);
      }
    });
  }

  static sendResetEmail(req, res) {

    // TODO: Fill this in.
    // use req.params to access path param.
  }
}

module.exports = AuthenticationController;