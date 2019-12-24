const SQLCon = require('../config/SQLCon')

const {
  ChatSessionsValidator
} = require('../helpers/ResourceValidators')

class ChatSessionsModel {

  static getChatSessionsByID(data) {

    return new Promise((res, rej) => {

      const body = {}
      const errors = []
      
      ChatSessionsValidator.getOnlyChatSessionsIDErrors(data, errors)

      if (errors.length) {
        body.errors = errors
        return rej({ statusCode: 400, body })
      }

      const con = SQLCon.getCon()
      const sql = 'SELECT * FROM `matcha`.`users` INNER JOIN (SELECT `matcha`.`friends`.`friend_id` FROM `matcha`.`friends` WHERE `matcha`.`friends`.`user_id` = ?) AS `my_friends` ON `my_friends`.`friend_id` = `users`.`user_id`;'
      
      con.query(sql, data.id - 0, (err, rows, fields) => {

        if (err) {
          errors.push({ code: '500-CHAT-1', message: 'DB getting chat sessions by user_id failed.' })
          body.errors = errors
          return rej({ statusCode: 500, body })
        }

        body.rows = rows
        res({ statusCode: 200, body })
      })
    })
  }
}

module.exports = ChatSessionsModel