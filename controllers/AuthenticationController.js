const transporter = require('../config/NodemailerCon').getTransporter()
const Config = new (require('../config/Config'))()
const CookieConfig = new (require('../config/CookieConfig'))()
const uuidv4 = require('uuid/v4')
const bcrypt = require('bcrypt')

const {
  UsersValidator
} = require('../helpers/ResourceValidators')

const {
  UsersModel,
  PicturesModel,
  TagsModel,
  ViewersModel
} = require('../models')

class AuthenticationController {

  static login(req, res) {

    UsersModel.getUserByEmail(req.body)
    .then((statusObj) => {

      if (statusObj.statusCode !== 200) {

        return res.status(statusObj.statusCode || 500).json(statusObj.body || {})
      }

      if (!statusObj.body.rows[0]) {

        return res.status(200).json({ status: false, message: 'Invalid credentials.' })
      }

      const userPassword = statusObj.body.rows[0].password

      if (!bcrypt.compareSync(req.body.password, userPassword)) {

        res.status(200).json({ status: false, message: 'Invalid credentials.' })
      }
      else {

        req.session.userId = statusObj.body.rows[0].user_id
        req.session.email = statusObj.body.rows[0].email

        UsersModel.patchUserByEmail({
          email: req.session.email,
          lastSeen: +new Date() + ''
        })
        .then((statusObj) => {

          res
          .status(200)
          .cookie('sid', `${req.session.id}`, CookieConfig.cookieOptions)
          .json({ status: true, message: '' })
        })
        .catch((statusObj) => {
          throw statusObj
        })
      }
    })
    .catch((statusObj) => {
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
  }

  static logout(req, res) {

    req.session.destroy((err) => {

      if (err) {

        res.status(500).json({ code: '500-DEL-SESS-1', message: 'The session could not be destroyed.' })
      }

      res.status(200).clearCookie('sid').json({ status: true, message: 'Logged out.' })
    })
  }

  static isLoggedIn(req, res) {

    if (req.session.userId) {

      res.status(200).json({ isLoggedIn: true })
    }
    else {

      res.status(200).clearCookie('sid').json({ isLoggedIn: false })
    }
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