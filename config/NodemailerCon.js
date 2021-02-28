const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: '',
    pass: ''
  },
  tls: {
    rejectUnauthorized: false
  }
})

class NodemailerCon {

  static getTransporter() {

    return transporter
  }
}

module.exports = NodemailerCon
