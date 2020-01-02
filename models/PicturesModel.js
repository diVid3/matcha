const SQLCon = require('../config/SQLCon')
const path = require('path')
const fs = require('fs')

const readChunk = require('read-chunk');
const imageType = require('image-type');

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

  static getPicturesByUsername(data) {

    return new Promise((res, rej) => {

      const body = {}
      const errors = []

      PicturesValidator.getOnlyPicUsernameErrors(data, errors)

      if (errors.length) {
        body.errors = errors
        return rej({ statusCode: 400, body })
      }

      const con = SQLCon.getCon()
      const sql = 'SELECT * FROM `matcha`.`pictures` WHERE `username` = ?;'

      con.query(sql, [data.username], (err, rows, fields) => {

        if (err) {
          errors.push({ code: '500-PIC-5', message: 'DB getting pictures by username failed.' })
          body.errors = errors
          return rej({ statusCode: 500, body })
        }

        body.rows = rows
        res({ statusCode: 200, body })
      })
    })
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

  static createPictureByID(data, files) {

    return new Promise((res, rej) => {

      const body = {}
      const errors = []
      
      data.picPath = PicturesModel.getPicPath(files)

      // Directly testing file to check for valid filetype
      const buffer = readChunk.sync(data.picPath, 0, 12);
      const imageTypeObj = imageType(buffer)

      if (
        !imageTypeObj ||
        !(
          imageTypeObj.ext === 'jpg' ||
          imageTypeObj.ext === 'jpeg' ||
          imageTypeObj.ext === 'png'
        )
      ) {

        const pathToUnlink = path.join(__dirname, `../${data.picPath}`)

        if (fs.existsSync(pathToUnlink)) {
          fs.unlinkSync(pathToUnlink)
        }

        body.errors = [{ code: '400-PIC-4', message: 'Incorrect image type, accepted formats: jpeg, png.' }]
        return rej({ statusCode: 400, body })
      }

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
        pic_path: data.picPath,
        username: data.username
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
          if (fs.existsSync(pathToUnlink)) {
            fs.unlinkSync(pathToUnlink)
          }
        }

        body.picPath = data.picPath
        res({ statusCode: 200, body })
      })
    })
  }

  static createProfilePictureByID(data, file) {

    return new Promise((res, rej) => {

      const body = {}
      const errors = []
      
      data.picPath = file.path

      // Directly testing file to check for valid filetype
      const buffer = readChunk.sync(data.picPath, 0, 12);
      const imageTypeObj = imageType(buffer)

      if (
        !imageTypeObj ||
        !(
          imageTypeObj.ext === 'jpg' ||
          imageTypeObj.ext === 'jpeg' ||
          imageTypeObj.ext === 'png'
        )
      ) {

        const pathToUnlink = path.join(__dirname, `../${data.picPath}`)

        if (fs.existsSync(pathToUnlink)) {
          fs.unlinkSync(pathToUnlink)
        }

        body.errors = [{ code: '400-PIC-4', message: 'Incorrect image type, accepted formats: jpeg, png.' }]
        return rej({ statusCode: 400, body })
      }

      PicturesValidator.getOnlyPicIDErrors(data, errors)

      if (errors.length) {
        body.errors = errors
        return rej({ statusCode: 400, body })
      }

      // Stripping 'pictures/' as to store public path.
      data.picPath = data.picPath.split('/')[1]

      const con = SQLCon.getCon()
      const sql = 'UPDATE `matcha`.`users` SET ? WHERE `user_id` = ?;'
      const set = {
        profile_pic_path: data.picPath
      }

      con.query(sql, [set, data.id - 0], (err, rows, fields) => {

        if (err) {
          errors.push({ code: '500-PIC-4', message: 'DB patching in profile picture by user_id failed.' })
          body.errors = errors
          return rej({ statusCode: 500, body })
        }

        if (data.oldPicPath) {
          const oldPicPath = data.oldPicPath.split('/')[3]
          const pathToUnlink = path.join(__dirname, `../pictures/${oldPicPath}`)
          if (fs.existsSync(pathToUnlink)) {
            fs.unlinkSync(pathToUnlink)
          }
        }

        body.picPath = data.picPath
        res({ statusCode: 200, body })
      })
    })
  }
}

module.exports = PicturesModel