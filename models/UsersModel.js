const SQLCon = require('../config/SQLCon')
const bcrypt = require('bcrypt')

const {
  UsersValidator
} = require('../helpers/ResourceValidators')

class UsersModel {

  static createUser(data) {

    return new Promise((res, rej) => {

      const body = {}
      const errors = []

      UsersValidator.getUserErrors(data, errors)

      if (errors.length) {
        body.errors = errors
        return rej({ statusCode: 400, body })
      }

      const con = SQLCon.getCon()
      // To validate use: bcrypt.compareSync(myPlaintextPassword, hash);
      const hashedPassword = bcrypt.hashSync(data.password, 10)
      const sql = 'INSERT INTO `matcha`.`users` SET ?'
      const set = {
        first_name: data.firstName,
        last_name: data.lastName,
        gender: data.gender - 0,
        biography: data.biography,
        username: data.username,
        email: data.email,
        password: hashedPassword,
        fame_rating: data.fameRating - 0,
        latitude: data.latitude,
        longitude: data.longitude,
        last_seen: data.lastSeen - 0,
        age: data.age - 0,
        verify_token: data.verifyToken,
        verified: data.verified - 0
      }

      con.query(sql, set, (err, rows, fields) => {
        
        if (err) {
          errors.push({ code: '500-USER-1', message: 'DB inserting new user failed.' })
          body.errors = errors
          return rej({ statusCode: 500, body })
        }

        res({ statusCode: 200, body })
      })
    })
  }

  static verifyUserRegistration(data) {

    return new Promise((res, rej) => {

      const body = {}
      const errors = []

      UsersValidator.getOnlyVerifyTokenErrors(data, errors)

      if (errors.length) {
        body.errors = errors
        return rej({ statusCode: 400, body })
      }

      const con = SQLCon.getCon()
      const sql = 'UPDATE `matcha`.`users` SET `verified` = 1 WHERE `verify_token` = ?; ' +
      'matcha`.`users` SET `verify_token` = NULL WHERE `verify_token` = ?;'

      con.query(sql, [data.verifyToken, data.verifyToken], (err, rows, fields) => {

        if (err) {
          errors.push({ code: '500-USER-4', message: 'DB couldn\'t verify the user.' })
          body.errors = errors
          return rej({ statusCode: 500, body })
        }

        res({ statusCode: 200, body })
      })
    })
  }

  static verifyUserPassReset(data) {

    // TODO: This will receive a claimed uuid from the front-end, verify it or not.
  }

  static getAllUsers() {


  }

  static getUserByID() {


  }

  static getUserByUsername() {


  }

  static getUserByEmail(data) {

    // TODO: Finish this, will be required by sendResetEmail to check if user exists, it should in order to send.

    return new Promise((res, rej) => {

      const body = {}
      const errors = []

      UsersValidator.getOnlyEmailErrors(data, errors)
      
      if (errors.length) {
        body.errors = errors
        return rej({ statusCode: 400, body })
      }

      const con = SQLCon.getCon()
      const sql = 'SELECT * FROM `matcha`.`users` WHERE `email` = ?;'

      con.query(sql, [data.email], (err, rows, fields) => {

        if (err) {
          errors.push({ code: '500-USER-5', message: 'DB getting user by email failed.' })
          body.errors = errors
          return rej({ statusCode: 500, body })
        }

        body.rows = rows
        res({ statusCode: 200, body })
      })
    })
  }

  static patchUserByID(data) {


  }

  static patchUserByEmail(data) {

    // TODO: Patch the user here by the fields provided in the data obj. This will be called by the authentication controller.
    return new Promise((res, rej) => {

      const body = {}
      const errors = []

      UsersValidator.getPatchUserByEmailErrors(data, errors)

      if (errors.length) {
        body.errors = errors
        return rej({ statusCode: 400, body })
      }

      const con = SQLCon.getCon()
      const sql = 'UPDATE`matcha`.`users` SET ? WHERE `email` = ?'

      const set = {}

      data.firstName ? (set.first_name = data.firstName) : undefined
      data.lastName ? (set.last_name = data.lastName) : undefined
      data.gender ? (set.gender = data.gender) : undefined
      data.biography ? (set.biography = data.biography) : undefined
      data.username ? (set.username = data.username) : undefined
      data.email ? (set.email = data.email) : undefined
      data.password ? (set.password = data.password) : undefined
      data.fameRating ? (set.fame_rating = data.fameRating - 0) : undefined
      data.latitude ? (set.latitude = data.latitude) : undefined
      data.longitude ? (set.longitude = data.longitude) : undefined
      data.lastSeen ? (set.last_seen = data.lastSeen - 0) : undefined
      data.age ? (set.age = data.age - 0) : undefined
      data.resetToken ? (set.reset_token = data.resetToken) : undefined
      data.verifyToken ? (set.verify_token = data.verifyToken) : undefined
      data.verified ? (set.verified = data.verified - 0) : undefined
      data.profilePicPath ? (set.profile_pic_path = data.profilePicPath) : undefined

      con.query(sql, [set, data.email], (err, rows, fields) => {
        
        if (err) {
          errors.push({ code: '500-USER-6', message: 'DB updating user by email failed.' })
          body.errors = errors
          return rej({ statusCode: 500, body })
        }

        res({ statusCode: 200, body })
      })
    })
  }

  static patchUserByUsername(data) {


  }
}

module.exports = UsersModel