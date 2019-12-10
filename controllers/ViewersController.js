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
      res.status(statusObj.statusCode || 500).json(statusObj.body || {})
    })
  }
}

module.exports = ViewersController