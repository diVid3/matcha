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

      console.log(statusObj)

      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
    .catch((statusObj) => {

      console.log(statusObj)

      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
  }
}

module.exports = PicturesController