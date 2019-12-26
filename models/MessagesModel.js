const SQLCon = require('../config/SQLCon')
const SocketStore = require('../helpers/SocketStore')

const {
  MessagesValidator
} = require('../helpers/ResourceValidators')

class MessagesModel {

  // Expects { targetUserID }
  static getMessagesByIDAndTargetID(data) {

    return new Promise((res, rej) => {

      const body = {}
      const errors = []
      
      MessagesValidator.getOnlyMessageIDErrors(data, errors)
      MessagesValidator.getOnlyTargetIDErrors(data, errors)

      if (errors.length) {
        body.errors = errors
        return rej({ statusCode: 400, body })
      }

      const con = SQLCon.getCon()
      const sql = 'SELECT * FROM `matcha`.`messages` WHERE `user_id` = ? AND `other_user_id` = ? UNION SELECT * FROM `matcha`.`messages` WHERE `user_id` = ? AND `other_user_id` = ? ORDER BY `time_issued` ASC;'
      const sqlData = [data.id - 0, data.targetUserID - 0, data.targetUserID - 0, data.id - 0]
      
      con.query(sql, sqlData, (err, rows, fields) => {

        if (err) {
          errors.push({ code: '500-MES-1', message: 'DB getting message feed by user_id and targetID failed.' })
          body.errors = errors
          return rej({ statusCode: 500, body })
        }

        body.rows = rows
        res({ statusCode: 200, body })
      })
    })
  }

  // Expects { targetUserID, timeIssued, message, read }
  // TODO: Finish this, the front-end will need to send the cookie in the socket message itself,
  // save the reference to the createdClient, and use the cookie to fetch the session info, and
  // what's missing and submit to DB.
  static createMessageByIDAndTargetID(data) {

    if (!data.id) {

      data.id = SocketStore.getSocketSessionInfo().userId + ''
    }

    if (!data.username) {

      data.username = SocketStore.getSocketSessionInfo().username
    }

    return new Promise((res, rej) => {

      const body = {}
      const errors = []
      
      MessagesValidator.getOnlyMessageIDErrors(data, errors)
      MessagesValidator.getOnlyTargetIDErrors(data, errors)

      if (errors.length) {
        body.errors = errors
        return rej({ statusCode: 400, body })
      }

      const con = SQLCon.getCon()
      const sql = 'SELECT * FROM `matcha`.`messages` WHERE `user_id` = ? AND `other_user_id` = ? UNION SELECT * FROM `matcha`.`messages` WHERE `user_id` = ? AND `other_user_id` = ? ORDER BY `time_issued` ASC;'
      const sqlData = [data.id - 0, data.targetUserID - 0, data.targetUserID - 0, data.id - 0]
      
      con.query(sql, sqlData, (err, rows, fields) => {

        if (err) {
          errors.push({ code: '500-MES-1', message: 'DB getting message feed by user_id and targetID failed.' })
          body.errors = errors
          return rej({ statusCode: 500, body })
        }

        body.rows = rows
        res({ statusCode: 200, body })
      })
    })
  }
}

module.exports = MessagesModel