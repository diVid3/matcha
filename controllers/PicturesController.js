const {
  PicturesModel
} = require('../models')

class PicturesController {

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

    console.log(req.file)
    res.status(200).json({})
  }

  static storePictureBySession(req, res) {

    if (req.MulterFileValidationError) {
      res.status(400).json({
        errors: [{ code: '400-PIC-4', message: 'Incorrect image type, accepted formats: jpeg, png.' }]
      })
    }

    req.body.id = req.session.userId + ''

    PicturesModel.createPictureByID(req.body, req.files)
    .then((statusObj) => {
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
    .catch((statusObj) => {
      console.log(statusObj)
      console.log(statusObj.body.errors)
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
  }

  // TODO: This will need the pic path to be deleted, so user_id + pic_path, after DB has deleted, delete on disk.
  // This is called before a new file is uploaded in the old one's place.
  static deletePictureBySession(req, res) {

  }
}

module.exports = PicturesController