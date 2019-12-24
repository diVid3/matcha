const SQLCon = require('../config/SQLCon')

const {
  FakeUsersValidator
} = require('../helpers/ResourceValidators')

class FakeUsersModel {

  static createFakeUserByID(data) {

    return new Promise((res, rej) => {

      const body = {}
      const errors = []
      
      FakeUsersValidator.getOnlyTargetIDErrors(data, errors)

      if (errors.length) {
        body.errors = errors
        return rej({ statusCode: 400, body })
      }

      const con = SQLCon.getCon()
      const sql = 'INSERT INTO `matcha`.`fake_users` SET ?;'

      const set = {
        user_id: data.targetUserID - 0
      }
      
      con.query(sql, set, (err, rows, fields) => {

        if (err) {
          errors.push({ code: '500-FAKE-1', message: 'DB creating fake user by user_id failed.' })
          body.errors = errors
          return rej({ statusCode: 500, body })
        }

        body.rows = rows
        res({ statusCode: 200, body })
      })
    })
  }
}

module.exports = FakeUsersModel