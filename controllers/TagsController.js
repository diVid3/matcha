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
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
    .catch((statusObj) => {
      console.log(statusObj)
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
  }

  static createTagBySession(req, res) {

    req.body.id = req.session.userId + ''

    TagsModel.createTagByID(req.body)
    .then((statusObj) => {
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
    .catch((statusObj) => {
      console.log(statusObj)
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
  }

  static deleteTagBySessionAndString(req, res) {

    req.body.id = req.session.userId + ''

    TagsModel.deleteTagByIDAndString(req.body)
    .then((statusObj) => {
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
    .catch((statusObj) => {
      console.log(statusObj.body.errors)
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
  }
}

module.exports = TagsController