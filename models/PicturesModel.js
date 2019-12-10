const SQLCon = require('../config/SQLCon')
const path = require('path')
const fs = require('fs')

const {
  PicturesValidator
} = require('../helpers/ResourceValidators')

class PicturesModel {

  static getPicPath(files) {

    let picPath = ''

    if (files.fileSelected1 && files.fileSelected1[0] && files.fileSelected1[0].path) {
      picPath = files.fileSelected1[0].path
    }
    else if (files.fileSelected2 && files.fileSelected2[0] && files.fileSelected2[0].path) {
      picPath = files.fileSelected2[0].path
    }
    else if (files.fileSelected3 && files.fileSelected3[0] && files.fileSelected3[0].path) {
      picPath = files.fileSelected3[0].path
    }
    else if (files.fileSelected4 && files.fileSelected4[0] && files.fileSelected4[0].path) {
      picPath = files.fileSelected4[0].path
    }

    return picPath
  }

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

  // TODO: Might need to change sql if data.oldPicPath is specified, in that case, delete first, then store, then
  // send back new picPath
  static createPictureByID(data, files) {

    return new Promise((res, rej) => {

      const body = {}
      const errors = []
      
      data.picPath = PicturesModel.getPicPath(files)

      PicturesValidator.getOnlyPicIDErrors(data, errors)

      if (errors.length) {
        body.errors = errors
        return rej({ statusCode: 400, body })
      }

      if (!data.picPath) {
        errors.push({ code: '500-PIC-3', message: 'Missing picPath, incorrectly derived.' })
        body.errors = errors
        return rej({ statusCode: 500, body })
      }

      // Stripping 'pictures/' as to store public path.
      data.picPath = data.picPath.split('/')[1]

      const con = SQLCon.getCon()
      let sql1 = ''
      const sql2 = 'INSERT INTO `matcha`.`pictures` SET ?;'
      const set = {
        user_id: data.id - 0,
        pic_path: data.picPath
      }
      let sqlData = set

      if (data.oldPicPath) {
        const oldPicPath = data.oldPicPath.split('/')[3]
        sql1 = "DELETE FROM `matcha`.`pictures` WHERE `user_id` = ? AND `pic_path` = ?; "
        sqlData = [data.id - 0, oldPicPath, set]
      }

      con.query(sql1 + sql2, sqlData, (err, rows, fields) => {

        if (err) {
          errors.push({ code: '500-PIC-2', message: 'DB creating picture by user_id failed.' })
          body.errors = errors
          return rej({ statusCode: 500, body })
        }

        if (data.oldPicPath) {
          const oldPicPath = data.oldPicPath.split('/')[3]
          const pathToUnlink = path.join(__dirname, `../pictures/${oldPicPath}`)
          fs.unlinkSync(pathToUnlink)
        }

        body.picPath = data.picPath
        res({ statusCode: 200, body })
      })
    })
  }
}

module.exports = PicturesModel