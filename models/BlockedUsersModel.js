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
}

module.exports = BlockedUsersModel