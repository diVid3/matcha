const SQLCon = require('../config/SQLCon')

const {
  TagsValidator
} = require('../helpers/ResourceValidators')

class TagsModel {

  static getTagsByUsername(data) {

    return new Promise((res, rej) => {

      const body = {}
      const errors = []

      TagsValidator.getOnlyTagUsernameErrors(data, errors)

      if (errors.length) {
        body.errors = errors
        return rej({ statusCode: 400, body })
      }

      const con = SQLCon.getCon()
      const sql = 'SELECT * FROM `matcha`.`tags` WHERE `username` = ?;'

      con.query(sql, [data.username], (err, rows, fields) => {

        if (err) {
          errors.push({ code: '500-TAG-4', message: 'DB getting tags by username failed.' })
          body.errors = errors
          return rej({ statusCode: 500, body })
        }

        body.rows = rows
        res({ statusCode: 200, body })
      })
    })
  }

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
  
  static createTagByID(data) {

    return new Promise((res, rej) => {

      const body = {}
      const errors = []

      TagsValidator.getOnlyTagIDErrors(data, errors)
      TagsValidator.getOnlyTagStringErrors(data, errors)

      if (errors.length) {
        body.errors = errors
        return rej({ statusCode: 400, body })
      }

      const con = SQLCon.getCon()
      const sql = 'INSERT INTO `matcha`.`tags` SET ?'
      const set = {
        user_id: data.id - 0,
        tag: data.tag,
        username: data.username
      }

      con.query(sql, set, (err, rows, fields) => {
        
        if (err) {
          errors.push({ code: '500-TAG-2', message: 'DB creating tag by session failed.' })
          body.errors = errors
          return rej({ statusCode: 500, body })
        }

        res({ statusCode: 200, body })
      })
    })
  }

  static deleteTagByIDAndString(data) {

    return new Promise((res, rej) => {

      const body = {}
      const errors = []

      TagsValidator.getOnlyTagIDErrors(data, errors)
      TagsValidator.getOnlyTagStringErrors(data, errors)

      if (errors.length) {
        body.errors = errors
        return rej({ statusCode: 400, body })
      }

      const con = SQLCon.getCon()
      const sql = 'DELETE FROM `matcha`.`tags` WHERE `user_id` = ? AND `tag` = ?;'

      con.query(sql, [data.id - 0, data.tag], (err, rows, fields) => {
        
        if (err) {
          errors.push({ code: '500-TAG-3', message: 'DB deleting tag by userID and string failed.' })
          body.errors = errors
          return rej({ statusCode: 500, body })
        }

        res({ statusCode: 200, body })
      })
    })
  }
}

module.exports = TagsModel