const SQLCon = require('../config/SQLCon')

const {
  PicturesValidator
} = require('../helpers/ResourceValidators')

class PicturesModel {

  static getPicturesByID(data) {

    return new Promise((res, rej) => {

      const body = {}
      const errors = []
      
      PicturesValidator.getOnlyPicIDErrors(data, errors)

      if (errors.length) {
        body.errors = errors
        return rej({ statusCode: 400, body })
      }

      const con = SQLCon.getCon()
      const sql = 'SELECT * FROM `matcha`.`pictures` WHERE `user_id` = ?;'
      
      con.query(sql, [data.id], (err, rows, fields) => {

        if (err) {
          errors.push({ code: '500-PIC-1', message: 'DB getting pictures by user_id failed.' })
          body.errors = errors
          return rej({ statusCode: 500, body })
        }

        body.rows = rows
        res({ statusCode: 200, body })
      })
    })
  }
}

module.exports = PicturesModel