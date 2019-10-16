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
  AuthenticationModel
} = require('../models');

class AuthenticationController {

  static login(req, res) {


  }

  static logout(req, res) {


  }

  static verifyReg(req, res) {

    AuthenticationModel.verifyRegistration(req.body)
    .then(() => {

      res.sendStatus(204);
    })
    .catch((statusCode) => {

      let codeToReplyWith = 500;

      switch (statusCode) {
        case 400:
          codeToReplyWith = 400
          break;
        case 500:
          codeToReplyWith = 500
          break;
        default:
          break;
      }
      
      res.sendStatus(codeToReplyWith);
    });
  }
  
  static verifyReset(req, res) {
    

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
      `${Config.frontend}/?verify=${uuid}\n\n` +
      
      'The link will remain active for 24 hours.'
    }, (err, info) => {

      if (err) {
        
        res.sendStatus(500);
      }
      else {

        // TODO: Set time-out clean up for DB. Use model.

        res.sendStatus(200);
      }
    });
  }

  static sendResetEmail(req, res) {


  }
}

module.exports = AuthenticationController;