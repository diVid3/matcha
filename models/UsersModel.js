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
        verified: data.verified - 0,
        sex_pref: 2
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
      'UPDATE `matcha`.`users` SET `verify_token` = NULL WHERE `verify_token` = ?;'

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

  static getAllUsers() {

    return new Promise((res, rej) => {

      const body = {}
      const errors = []

      const con = SQLCon.getCon()
      const sql = 'SELECT * FROM `matcha`.`users`;'

      con.query(sql, (err, rows, fields) => {

        if (err) {
          errors.push({ code: '500-USER-16', message: 'DB getting all users failed.' })
          body.errors = errors
          return rej({ statusCode: 500, body })
        }

        body.rows = rows
        res({ statusCode: 200, body })
      })
    })
  }

  static getAllUsersAndTags() {

    return new Promise((res, rej) => {

      const body = {}
      const errors = []

      const con = SQLCon.getCon()
      const sql = 'SELECT * FROM `matcha`.`users` LEFT JOIN `matcha`.`tags` ON `users`.`user_id` = `tags`.`user_id`;'

      con.query(sql, (err, rows, fields) => {

        if (err) {
          errors.push({ code: '500-USER-17', message: 'DB getting all users and tags failed.' })
          body.errors = errors
          return rej({ statusCode: 500, body })
        }

        body.rows = rows
        res({ statusCode: 200, body })
      })
    })
  }

  static getUserByID() {


  }

  static getUserByResetToken(data) {

    return new Promise((res, rej) => {

      const body = {}
      const errors = []

      UsersValidator.getOnlyResetTokenErrors(data, errors)

      if (errors.length) {
        body.errors = errors
        return rej({ statusCode: 400, body })
      }

      const con = SQLCon.getCon()
      const sql = 'SELECT * FROM `matcha`.`users` WHERE `reset_token` = ?;'

      con.query(sql, [data.resetToken], (err, rows, fields) => {

        if (err) {
          errors.push({ code: '500-USER-7', message: 'DB getting user by reset-token failed.' })
          body.errors = errors
          return rej({ statusCode: 500, body })
        }

        body.rows = rows
        res({ statusCode: 200, body })
      })
    })
  }

  static getUserByUsername(data) {

    return new Promise((res, rej) => {

      const body = {}
      const errors = []

      UsersValidator.getOnlyUsernameErrors(data, errors)

      if (errors.length) {
        body.errors = errors
        return rej({ statusCode: 400, body })
      }

      const con = SQLCon.getCon()
      const sql = 'SELECT * FROM `matcha`.`users` WHERE `username` = ?;'

      con.query(sql, [data.username], (err, rows, fields) => {

        if (err) {
          errors.push({ code: '500-USER-8', message: 'DB getting user by username failed.' })
          body.errors = errors
          return rej({ statusCode: 500, body })
        }

        body.rows = rows
        res({ statusCode: 200, body })
      })
    })
  }

  static getUserByEmail(data) {

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

  static patchUserByID(req) {

    return new Promise((res, rej) => {

      const data = req.body
      const body = {}
      const errors = []

      UsersValidator.getPatchUserByEmailErrors(data, errors)

      if (errors.length) {
        body.errors = errors
        return rej({ statusCode: 400, body })
      }

      const con = SQLCon.getCon()
      const sql = 'UPDATE `matcha`.`users` SET ? WHERE `user_id` = ?'

      const set = {}

      data.firstName ? (set.first_name = data.firstName) : undefined
      data.lastName ? (set.last_name = data.lastName) : undefined
      data.gender ? (set.gender = data.gender - 0) : undefined
      data.sexPref ? (set.sex_pref = data.sexPref - 0) : undefined
      data.biography ? (set.biography = data.biography) : undefined
      data.username ? (set.username = data.username) : undefined
      data.email ? (set.email = data.email) : undefined
      data.password ? (set.password = bcrypt.hashSync(data.password, 10)) : undefined
      data.fameRating ? (set.fame_rating = data.fameRating - 0) : undefined
      data.latitude ? (set.latitude = data.latitude) : undefined
      data.longitude ? (set.longitude = data.longitude) : undefined
      data.lastSeen ? (set.last_seen = data.lastSeen - 0) : undefined
      data.age ? (set.age = data.age - 0) : undefined
      data.resetToken !== undefined ? (set.reset_token = data.resetToken) : undefined
      data.verifyToken !== undefined ? (set.verify_token = data.verifyToken) : undefined
      data.verified ? (set.verified = data.verified - 0) : undefined
      data.profilePicPath !== undefined ? (set.profile_pic_path = data.profilePicPath) : undefined

      con.query(sql, [set, data.id - 0], (err, rows, fields) => {
        
        if (err) {
          errors.push({ code: '500-USER-9', message: 'DB updating user by ID failed.' })
          body.errors = errors
          return rej({ statusCode: 500, body })
        }

        // Updating session info if the user changed their email.
        if (req.session && req.session.email && data.email) {
          req.session.email = data.email
        }

        res({ statusCode: 200, body })
      })
    })
  }

  static patchUserByEmail(req, targetEmail) {

    return new Promise((res, rej) => {

      const data = req.body
      const body = {}
      const errors = []

      UsersValidator.getOnlyTargetEmailErrors({ email: targetEmail }, errors)
      UsersValidator.getPatchUserByEmailErrors(data, errors)

      if (errors.length) {
        body.errors = errors
        return rej({ statusCode: 400, body })
      }

      const con = SQLCon.getCon()
      const sql = 'UPDATE `matcha`.`users` SET ? WHERE `email` = ?'

      const set = {}

      data.firstName ? (set.first_name = data.firstName) : undefined
      data.lastName ? (set.last_name = data.lastName) : undefined
      data.gender ? (set.gender = data.gender - 0) : undefined
      data.sexPref ? (set.sex_pref = data.sexPref - 0) : undefined
      data.biography ? (set.biography = data.biography) : undefined
      data.username ? (set.username = data.username) : undefined
      data.email ? (set.email = data.email) : undefined
      data.password ? (set.password = bcrypt.hashSync(data.password, 10)) : undefined
      data.fameRating ? (set.fame_rating = data.fameRating - 0) : undefined
      data.latitude ? (set.latitude = data.latitude) : undefined
      data.longitude ? (set.longitude = data.longitude) : undefined
      data.lastSeen ? (set.last_seen = data.lastSeen - 0) : undefined
      data.age ? (set.age = data.age - 0) : undefined
      data.resetToken !== undefined ? (set.reset_token = data.resetToken) : undefined
      data.verifyToken !== undefined ? (set.verify_token = data.verifyToken) : undefined
      data.verified ? (set.verified = data.verified - 0) : undefined
      data.profilePicPath !== undefined ? (set.profile_pic_path = data.profilePicPath) : undefined

      con.query(sql, [set, targetEmail], (err, rows, fields) => {
        
        if (err) {
          errors.push({ code: '500-USER-6', message: 'DB updating user by email failed.' })
          body.errors = errors
          return rej({ statusCode: 500, body })
        }

        // Updating session info if the user changed their email.
        if (req.session && req.session.email && data.email) {
          req.session.email = data.email
        }

        res({ statusCode: 200, body })
      })
    })
  }

  static patchUserByUsername(data) {


  }

  static increaseUserRating(data) {

    return new Promise((res, rej) => {

      const body = {}
      const errors = []

      UsersValidator.getOnlyTargetUsernameErrors(data, errors)

      if (errors.length) {
        body.errors = errors
        return rej({ statusCode: 400, body })
      }

      const con = SQLCon.getCon()

      // This is for ACID, otherwise might have read + write concurrency problems calculating the rating.
      con.beginTransaction((err) => {
        if (err) {
          errors.push({ code: '500-USER-10', message: 'DB creating transaction to increment fame_rating failed.' })
          body.errors = errors
          return rej({ statusCode: 500, body })
        }

        const sql = 'UPDATE `matcha`.`users` SET `fame_rating` = `fame_rating` + 1 WHERE `username` = ?; '

        con.query(sql, data.targetUsername, (err, rows, fields) => {
          if (err) {
            con.rollback(() => {
              errors.push({ code: '500-USER-11', message: 'DB transaction incrementing fame_rating query failed.' })
              body.errors = errors
              return rej({ statusCode: 500, body })
            })
          }

          con.commit((err) => {
            if (err) {
              con.rollback(() => {
                errors.push({ code: '500-USER-12', message: 'DB commiting transaction to increment fame_rating failed.' })
                body.errors = errors
                return rej({ statusCode: 500, body })
              })
            }
            res({ statusCode: 200, body })
          })
        })
      })
    })
  }

  static decreaseUserRating(data) {

    return new Promise((res, rej) => {

      const body = {}
      const errors = []

      UsersValidator.getOnlyTargetUsernameErrors(data, errors)

      if (errors.length) {
        body.errors = errors
        return rej({ statusCode: 400, body })
      }

      const con = SQLCon.getCon()

      // This is for ACID, otherwise might have read + write concurrency problems calculating the rating.
      con.beginTransaction((err) => {
        if (err) {
          errors.push({ code: '500-USER-13', message: 'DB creating transaction to decrement fame_rating failed.' })
          body.errors = errors
          return rej({ statusCode: 500, body })
        }

        const sql = 'UPDATE `matcha`.`users` SET `fame_rating` = `fame_rating` - 1 WHERE `username` = ?; '

        con.query(sql, data.targetUsername, (err, rows, fields) => {
          if (err) {
            con.rollback(() => {
              errors.push({ code: '500-USER-14', message: 'DB transaction decrementing fame_rating query failed.' })
              body.errors = errors
              return rej({ statusCode: 500, body })
            })
          }

          con.commit((err) => {
            if (err) {
              con.rollback(() => {
                errors.push({ code: '500-USER-15', message: 'DB commiting transaction to decrement fame_rating failed.' })
                body.errors = errors
                return rej({ statusCode: 500, body })
              })
            }
            res({ statusCode: 200, body })
          })
        })
      })
    })
  }
}

module.exports = UsersModel