const SQLCon = require('../config/SQLCon')

const {
  NotificationsValidator
} = require('../helpers/ResourceValidators')

class NotificationsModel {

  static getNotificationsByUsername(data) {

    return new Promise((res, rej) => {

      const body = {}
      const errors = []
      
      // NotificationsValidator.getOnlyNotificationIDErrors(data, errors)
      NotificationsValidator.getOnlyUsernameErrors(data, errors)

      if (errors.length) {
        body.errors = errors
        return rej({ statusCode: 400, body })
      }

      const con = SQLCon.getCon()
      const sql = 'SELECT * FROM `matcha`.`notifications` WHERE `username` = ?;'
      
      con.query(sql, data.username, (err, rows, fields) => {

        if (err) {
          errors.push({ code: '500-NOTIF-1', message: 'DB getting notifications by username failed.' })
          body.errors = errors
          return rej({ statusCode: 500, body })
        }

        body.rows = rows
        res({ statusCode: 200, body })
      })
    })
  }

  // Expects { username, notification, read }
  static createNotificationByUsername(data) {

    return new Promise((res, rej) => {

      const body = {}
      const errors = []

      // NotificationsValidator.getOnlyNotificationIDErrors(data, errors)
      NotificationsValidator.getOnlyUsernameErrors(data, errors)
      NotificationsValidator.getOnlyNotificationErrors(data, errors)
      NotificationsValidator.getOnlyReadErrors(data, errors)

      if (errors.length) {
        body.errors = errors
        return rej({ statusCode: 400, body })
      }

      const con = SQLCon.getCon()
      const sql = 'INSERT INTO `matcha`.`notifications` SET ?;'
      const set = {
        username: data.username,
        notification: data.notification,
        read: data.read - 0
      }

      con.query(sql, set, (err, rows, fields) => {

        if (err) {
          errors.push({ code: '500-NOTIF-2', message: 'DB creating notification by username failed.' })
          body.errors = errors
          return rej({ statusCode: 500, body })
        }

        res({ statusCode: 200, body })
      })
    })
  }

  static patchNotificationByUsername(data, username) {

    return new Promise((res, rej) => {

      const body = {}
      const errors = []

      NotificationsValidator.getOnlyUsernameErrors({ username }, errors)
      NotificationsValidator.getPatchNotificationByUsernameErrors(data, errors)

      if (errors.length) {
        body.errors = errors
        return rej({ statusCode: 400, body })
      }

      const con = SQLCon.getCon()
      const sql = 'UPDATE `matcha`.`notifications` SET ? WHERE `username` = ?'

      const set = {}

      data.username ? (set.username = data.username) : undefined
      data.notification ? (set.notification = data.notification) : undefined
      data.read ? (set.read = data.read - 0) : undefined

      con.query(sql, [set, username], (err, rows, fields) => {
        
        if (err) {
          errors.push({ code: '500-NOTIF-3', message: 'DB patching notification by username failed.' })
          body.errors = errors
          return rej({ statusCode: 500, body })
        }

        res({ statusCode: 200, body })
      })
    })
  }
}

module.exports = NotificationsModel