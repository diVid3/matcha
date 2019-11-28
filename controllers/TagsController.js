const {
  TagsModel
} = require('../models')

class TagsController {

  static getTagsBySession(req, res) {

    req.body = {
      id: req.session.userId + ''
    }

    TagsModel.getTagsByID(req.body)
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

module.exports = TagsController