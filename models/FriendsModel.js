const SQLCon = require('../config/SQLCon')

const {
  FriendsValidator
} = require('../helpers/ResourceValidators')

class FriendsModel {

  static getFriendsByID(data) {

    return new Promise((res, rej) => {

      const body = {}
      const errors = []

      FriendsValidator.getOnlyLikerIDErrors(data, errors)

      if (errors.length) {
        body.errors = errors
        return rej({ statusCode: 400, body })
      }

      const con = SQLCon.getCon()
      const sql = 'SELECT * FROM `matcha`.`friends` WHERE `user_id` = ?;'
      
      con.query(sql, [data.id - 0], (err, rows, fields) => {

        if (err) {
          errors.push({ code: '500-FRIEND-1', message: 'DB getting friends by user_id failed.' })
          body.errors = errors
          return rej({ statusCode: 500, body })
        }

        body.rows = rows
        res({ statusCode: 200, body })
      })
    })
  }

  static getFriendsByUsername(data) {

    return new Promise((res, rej) => {

      const body = {}
      const errors = []

      FriendsValidator.getOnlyUsernameErrors(data, errors)

      if (errors.length) {
        body.errors = errors
        return rej({ statusCode: 400, body })
      }

      const con = SQLCon.getCon()
      const sql = 'SELECT * FROM `matcha`.`friends` WHERE `username` = ?;'

      con.query(sql, [data.id - 0], (err, rows, fields) => {

        if (err) {
          errors.push({ code: '500-FRIEND-2', message: 'DB getting friends by username failed.' })
          body.errors = errors
          return rej({ statusCode: 500, body })
        }

        body.rows = rows
        res({ statusCode: 200, body })
      })
    })
  }

  // expects: { id, username, targetUserID, targetUsername }
  static createFriendsByUsernames(data) {

    return new Promise((res, rej) => {

      const body = {}
      const errors = []

      FriendsValidator.getOnlyLikerIDErrors(data, errors)
      FriendsValidator.getOnlyUsernameErrors(data, errors)
      FriendsValidator.getOnlyTargetIDErrors(data, errors)
      FriendsValidator.getOnlyTargetUsernameErrors(data, errors)

      if (errors.length) {
        body.errors = errors
        return rej({ statusCode: 400, body })
      }

      const con = SQLCon.getCon()
      const sql = 'INSERT INTO `matcha`.`friends` SET ?; INSERT INTO `matcha`.`friends` SET ?;'

      const set1 = {
        user_id: data.targetUserID - 0,
        username: data.targetUsername,
        friend_id: data.id - 0,
        friend_username: data.username
      }

      const set2 = {
        user_id: data.id - 0,
        username: data.username,
        friend_id: data.targetUserID - 0,
        friend_username: data.targetUsername
      }

      con.query(sql, [set1, set2], (err, rows, fields) => {

        if (err) {
          errors.push({ code: '500-FRIEND-3', message: 'DB creating friends by usernames failed.' })
          body.errors = errors
          return rej({ statusCode: 500, body })
        }
      })

      // This is for ACID, otherwise might have read + write concurrency problems calculating the rating.
      con.beginTransaction((err) => {
        if (err) {
          errors.push({ code: '500-FRIEND-4', message: 'DB creating transaction to increment ratings failed.' })
          body.errors = errors
          return rej({ statusCode: 500, body })
        }

        const sql1 = 'UPDATE `matcha`.`users` SET `fame_rating` = `fame_rating` + 1 WHERE `username` = ?; '
        const sql2 = 'UPDATE `matcha`.`users` SET `fame_rating` = `fame_rating` + 1 WHERE `username` = ?;'

        con.query(sql1 + sql2, [data.username, data.targetUsername], (err, rows, fields) => {
          if (err) {
            con.rollback(() => {
              errors.push({ code: '500-FRIEND-5', message: 'DB transaction incrementing ratings query failed.' })
              body.errors = errors
              return rej({ statusCode: 500, body })
            })
          }

          con.commit((err) => {
            if (err) {
              con.rollback(() => {
                errors.push({ code: '500-FRIEND-6', message: 'DB commiting transaction to increment ratings failed.' })
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

  // expects: { username, targetUsername }
  static deleteFriendsByUsernames(data) {

    return new Promise((res, rej) => {

      const body = {}
      const errors = []

      FriendsValidator.getOnlyUsernameErrors(data, errors)
      FriendsValidator.getOnlyTargetUsernameErrors(data, errors)

      if (errors.length) {
        body.errors = errors
        return rej({ statusCode: 400, body })
      }

      const con = SQLCon.getCon()
      const sql1 = 'DELETE FROM `matcha`.`friends` WHERE `username` = ? AND `friend_username` = ?; '
      const sql2 = 'DELETE FROM `matcha`.`friends` WHERE `username` = ? AND `friend_username` = ?;'
      const sqlData = [data.username, data.targetUsername, data.targetUsername, data.username]

      con.query(sql1 + sql2, sqlData, (err, rows, fields) => {

        if (err) {
          errors.push({ code: '500-FRIEND-7', message: 'DB deleting friends by usernames failed.' })
          body.errors = errors
          return rej({ statusCode: 500, body })
        }

        res({ statusCode: 200, body })
      })
    })
  }
}

module.exports = FriendsModel