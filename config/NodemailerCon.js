const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: '11smtptest11@gmail.com',
    pass: 'hM5ZQ3Zq'
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