const {
  PicturesModel
} = require('../models')

class PicturesController {

  static getPicturesByUsername(req, res) {

    req.body = {
      username: req.params.username
    }

    PicturesModel.getPicturesByUsername(req.body)
    .then((statusObj) => {
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
    .catch((statusObj) => {
      console.log(statusObj)
      console.log(statusObj.body.errors)
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
  }

  static getPicturesBySession(req, res) {

    req.body = {
      id: req.session.userId + ''
    }

    PicturesModel.getPicturesByID(req.body)
    .then((statusObj) => {
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
    .catch((statusObj) => {
      console.log(statusObj)
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
  }

  static storeProfilePictureBySession(req, res) {

    if (req.MulterFileValidationError) {
      res.status(400).json({
        errors: [{ code: '400-PIC-4', message: 'Incorrect image type, accepted formats: jpeg, png.' }]
      })
    }

    req.body.id = req.session.userId + ''

    PicturesModel.createProfilePictureByID(req.body, req.file)
    .then((statusObj) => {
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
    .catch((statusObj) => {
      console.log(statusObj)
      console.log(statusObj.body.errors)
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
  }

  static storePictureBySession(req, res) {

    if (req.MulterFileValidationError) {
      res.status(400).json({
        errors: [{ code: '400-PIC-4', message: 'Incorrect image type, accepted formats: jpeg, png.' }]
      })
    }

    req.body.id = req.session.userId + ''
    req.body.username = req.session.username

    PicturesModel.createPictureByID(req.body, req.files)
    .then((statusObj) => {
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
    .catch((statusObj) => {
      console.log(statusObj)
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
  }
}

module.exports = PicturesController