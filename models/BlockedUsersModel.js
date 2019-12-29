const SQLCon = require('../config/SQLCon')

const {
  BlockedUsersValidator
} = require('../helpers/ResourceValidators')

class BlockedUsersModel {

  static getBlockedUsersByID(data) {

    return new Promise((res, rej) => {

      const body = {}
      const errors = []
      
      BlockedUsersValidator.getOnlyBlockedUsersIDErrors(data, errors)

      if (errors.length) {
        body.errors = errors
        return rej({ statusCode: 400, body })
      }

      const con = SQLCon.getCon()
      const sql = 'SELECT * FROM `matcha`.`blocked_users` WHERE `user_id` = ?;'
      
      con.query(sql, [data.id], (err, rows, fields) => {

        if (err) {
          errors.push({ code: '500-BU-1', message: 'DB getting blocked users by user_id failed.' })
          body.errors = errors
          return rej({ statusCode: 500, body })
        }

        body.rows = rows
        res({ statusCode: 200, body })
      })
    })
  }

  static getBlockedUsersByUsername(data) {

    return new Promise((res, rej) => {

      const body = {}
      const errors = []
      
      BlockedUsersValidator.getOnlyBlockedUsernameErrors(data, errors)

      if (errors.length) {
        body.errors = errors
        return rej({ statusCode: 400, body })
      }

      const con = SQLCon.getCon()
      const sql = 'SELECT * FROM `matcha`.`blocked_users` WHERE `username` = ?;'
      
      con.query(sql, data.username, (err, rows, fields) => {

        if (err) {
          errors.push({ code: '500-BU-4', message: 'DB getting blocked users by username failed.' })
          body.errors = errors
          return rej({ statusCode: 500, body })
        }

        body.rows = rows
        res({ statusCode: 200, body })
      })
    })
  }

  static createBlockedUserByID(data) {

    return new Promise((res, rej) => {

      const body = {}
      const errors = []

      BlockedUsersValidator.getOnlyTargetIDErrors(data, errors)
      BlockedUsersValidator.getOnlyTargetUsernameErrors(data, errors)

      if (errors.length) {
        body.errors = errors
        return rej({ statusCode: 400, body })
      }

      const con = SQLCon.getCon()
      const sql = 'INSERT INTO `matcha`.`blocked_users` SET ?;'
      const set = {
        user_id: data.id - 0,
        username: data.username,
        blocked_id: data.targetUserID - 0,
        blocked_username: data.targetUsername
      }

      con.query(sql, set, (err, rows, fields) => {

        if (err) {
          errors.push({ code: '500-BU-2', message: 'DB creating blocked user by user_id and username failed.' })
          body.errors = errors
          return rej({ statusCode: 500, body })
        }

        res({ statusCode: 200, body })
      })
    })
  }

  static deleteBlockedUserByID(data) {

    return new Promise((res, rej) => {

      const body = {}
      const errors = []

      BlockedUsersValidator.getOnlyTargetIDErrors(data, errors)

      if (errors.length) {
        body.errors = errors
        return rej({ statusCode: 400, body })
      }

      const con = SQLCon.getCon()
      const sql = 'DELETE FROM `matcha`.`blocked_users` WHERE `user_id`= ? AND `blocked_id` = ?;'

      con.query(sql, [data.id - 0, data.targetUserID - 0], (err, rows, fields) => {

        if (err) {
          errors.push({ code: '500-BU-3', message: 'DB deleting blocked user by user_id failed.' })
          body.errors = errors
          return rej({ statusCode: 500, body })
        }

        res({ statusCode: 200, body })
      })
    })
  }
}

module.exports = BlockedUsersModel