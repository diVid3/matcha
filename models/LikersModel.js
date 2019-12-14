const SQLCon = require('../config/SQLCon')

const {
  LikersValidator
} = require('../helpers/ResourceValidators')

class LikersModel {

  static getLikersByID(data) {

    return new Promise((res, rej) => {

      const body = {}
      const errors = []
      
      LikersValidator.getOnlyLikerIDErrors(data, errors)

      if (errors.length) {
        body.errors = errors
        return rej({ statusCode: 400, body })
      }

      const con = SQLCon.getCon()
      const sql = 'SELECT * FROM `matcha`.`likers` WHERE `user_id` = ?;'
      
      con.query(sql, [data.id], (err, rows, fields) => {

        if (err) {
          errors.push({ code: '500-LIKER-1', message: 'DB getting likers by user_id failed.' })
          body.errors = errors
          return rej({ statusCode: 500, body })
        }

        body.rows = rows
        res({ statusCode: 200, body })
      })
    })
  }

  static getLikersByUsername(data) {

    return new Promise((res, rej) => {

      const body = {}
      const errors = []

      LikersValidator.getOnlyUsernameErrors(data, errors)

      if (errors.length) {
        body.errors = errors
        return rej({ statusCode: 400, body })
      }

      const con = SQLCon.getCon()
      const sql = 'SELECT * FROM `matcha`.`likers` WHERE `username` = ?;'

      con.query(sql, [data.id], (err, rows, fields) => {

        if (err) {
          errors.push({ code: '500-LIKER-3', message: 'DB getting likers by username failed.' })
          body.errors = errors
          return rej({ statusCode: 500, body })
        }

        body.rows = rows
        res({ statusCode: 200, body })
      })
    })
  }

  static createLikerByID(data) {

    return new Promise((res, rej) => {

      const body = {}
      const errors = []

      LikersValidator.getOnlyLikerIDErrors(data, errors)
      LikersValidator.getOnlyTargetIDErrors(data, errors)
      LikersValidator.getOnlyUsernameErrors(data, errors)
      LikersValidator.getOnlyTargetUsernameErrors(data, errors)

      if (errors.length) {
        body.errors = errors
        return rej({ statusCode: 400, body })
      }

      const con = SQLCon.getCon()
      const sql = 'INSERT INTO `matcha`.`likers` SET ?'
      const set = {
        user_id: data.targetUserID,
        username: data.targetUsername,
        liker_id: data.id,
        liker_username: data.username
      }
      
      con.query(sql, set, (err, rows, fields) => {

        if (err) {
          errors.push({ code: '500-LIKER-2', message: 'DB creating liker by targetUserID failed.' })
          body.errors = errors
          return rej({ statusCode: 500, body })
        }

        body.rows = rows
        res({ statusCode: 200, body })
      })
    })
  }
}

module.exports = LikersModel