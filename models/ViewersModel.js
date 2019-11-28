const SQLCon = require('../config/SQLCon')

const {
  ViewersValidator
} = require('../helpers/ResourceValidators')

class ViewersModel {

  static getViewersByID(data) {

    return new Promise((res, rej) => {

      const body = {}
      const errors = []
      
      ViewersValidator.getOnlyViewerIDErrors(data, errors)

      if (errors.length) {
        body.errors = errors
        return rej({ statusCode: 400, body })
      }

      const con = SQLCon.getCon()
      const sql = 'SELECT * FROM `matcha`.`viewers` WHERE `user_id` = ?;'
      
      con.query(sql, [data.id], (err, rows, fields) => {

        if (err) {
          errors.push({ code: '500-VIEWER-1', message: 'DB getting viewers by user_id failed.' })
          body.errors = errors
          return rej({ statusCode: 500, body })
        }

        body.rows = rows
        res({ statusCode: 200, body })
      })
    })
  }
}

module.exports = ViewersModel