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

  // Expects { targetUserID, timeIssued, message, read }.
  static createMessageByIDAndTargetID(data) {

    return new Promise((res, rej) => {

      const body = {}
      const errors = []

      MessagesValidator.getOnlyMessageIDErrors(data, errors)
      MessagesValidator.getOnlyTargetIDErrors(data, errors)
      MessagesValidator.getOnlyTimeIssuedErrors(data, errors)
      MessagesValidator.getOnlyMessageErrors(data, errors)
      MessagesValidator.getOnlyReadErrors(data, errors)
      MessagesValidator.getOnlyUsernameErrors(data, errors)

      if (errors.length) {
        body.errors = errors
        return rej({ statusCode: 400, body })
      }

      // id: redisData.userId + '',            // this becomes user_id in db.
      // targetUserID: data.targetUserID + '', // this becomes other_user_id in db.
      // timeIssued: data.timeIssued + '',     // this becomes time_issued in db.
      // message: data.message,
      // read: data.read + '',
      // username: redisData.username

      const con = SQLCon.getCon()
      const sql = 'INSERT INTO `matcha`.`messages` SET ?;'
      const set = {
        user_id: data.id - 0,
        other_user_id: data.targetUserID - 0,
        time_issued: data.timeIssued - 0,
        message: data.message,
        read: data.read - 0,
        username: data.username
      }
      
      con.query(sql, set, (err, rows, fields) => {

        if (err) {
          errors.push({ code: '500-MES-2', message: 'DB inserting message by user_id and targetID failed.' })
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