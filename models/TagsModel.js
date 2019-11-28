const SQLCon = require('../config/SQLCon')

const {
  TagsValidator
} = require('../helpers/ResourceValidators')

class TagsModel {

  static getTagsByID(data) {

    return new Promise((res, rej) => {

      const body = {}
      const errors = []
      
      TagsValidator.getOnlyTagIDErrors(data, errors)

      if (errors.length) {
        body.errors = errors
        return rej({ statusCode: 400, body })
      }

      const con = SQLCon.getCon()
      const sql = 'SELECT * FROM `matcha`.`tags` WHERE `user_id` = ?;'
      
      con.query(sql, [data.id], (err, rows, fields) => {

        if (err) {
          errors.push({ code: '500-TAG-1', message: 'DB getting tags by user_id failed.' })
          body.errors = errors
          return rej({ statusCode: 500, body })
        }

        body.rows = rows
        res({ statusCode: 200, body })
      })
    })
  }
}

module.exports = TagsModel