const {
  ViewersModel
} = require('../models')

class ViewersController {

  static getViewersBySession(req, res) {

    req.body = {
      id: req.session.userId + ''
    }

    ViewersModel.getViewersByID(req.body)
    .then((statusObj) => {
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
    .catch((statusObj) => {
      console.log(statusObj)
      statusObj.body && statusObj.body.errors && console.log(statusObj.body.errors)
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
  }

  static createViewerBySession(req, res) {

    req.body.id = req.session.userId + ''
    req.body.username = req.session.username

    // This needs req.body.targetUserID
    ViewersModel.createViewerByID(req.body)
    .then((statusObj) => {
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
    .catch((statusObj) => {
      console.log(statusObj)
      statusObj.body && statusObj.body.errors && console.log(statusObj.body.errors)
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
  }
}

module.exports = ViewersController