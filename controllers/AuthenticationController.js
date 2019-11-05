const transporter = require('../config/NodemailerCon').getTransporter()
const Config = new (require('../config/Config'))()
const uuidv4 = require('uuid/v4')

const {
  UsersValidator
} = require('../helpers/ResourceValidators')

const {
  UsersModel
} = require('../models')

class AuthenticationController {

  static login(req, res) {


  }

  static logout(req, res) {


  }

  static sendRegEmail(req, res) {

    const data = req.body

    const body = {}
    const errors = []

    UsersValidator.getOnlyUsernameErrors(data, errors)
    UsersValidator.getOnlyEmailErrors(data, errors)
    UsersValidator.getOnlyVerifyTokenErrors(data, errors)

    if (errors.length) {
      body.errors = errors
      return res.status(400).json(body)
    }

    transporter.sendMail({
      from: 'no-reply@matcha.localhost',
      to: `${data.email}`,
      subject: 'Verify Registration | Matcha',
      text: `Hi ${data.username}, welcome to matcha!\n\n` +
      
      'To complete your registration please click on the following link:\n\n' +
      `${Config.frontend}/?verify=${data.verifyToken}\n\n` +
      
      'The link will remain active for 24 hours.'
    }, (err, info) => {

      if (err) {
        errors.push({ code: '500-SEND-REG-EMAIL-1', message: 'Nodemailer couldn\'t send registration email.' })
        body.errors = errors
        return res.status(500).json(body)
      }

      else {

        // TODO: Set time-out clean up for DB. Use UsersModel to delete account if not verified.

        res.status(200).json(body)
      }
    })
  }
  
  static sendResetEmail(req, res) {

    const data = req.body

    const resetToken = uuidv4()
    req.body.resetToken = resetToken

    UsersModel.patchUserByEmail(req.body)
    .then((statusObj) => {

      transporter.sendMail({
        from: 'no-reply@matcha.localhost',
        to: `${data.email}`,
        subject: 'Reset Password | Matcha',
        text: `Hi there,\n\n` +
        
        'You recently requested to reset your password, you can do so by clicking on the following link:\n\n' +
        `${Config.frontend}/?reset=${data.resetToken}\n\n` +
        
        'The link will remain active for 24 hours.'
      }, (err, info) => {
  
        if (err) {
          errors.push({ code: '500-SEND-RESET-EMAIL-1', message: 'Nodemailer couldn\'t send reset email.' })
          body.errors = errors
          return res.status(500).json(body)
        }
        else {
  
          // TODO: Set time-out clean up for DB. Use UsersModel nullify reset_token.
  
          res.status(200).json(statusObj.body)
        }
      })
    })
    .catch((statusObj) => {
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
  }
}

module.exports = AuthenticationController