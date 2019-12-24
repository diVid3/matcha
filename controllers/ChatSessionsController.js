const {
  ChatSessionsModel
} = require('../models')

class ChatSessionsController {

  static getChatSessionsBySession(req, res) {

    req.body = {
      id: req.session.userId + ''
    }

    ChatSessionsModel.getChatSessionsByID(req.body)
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

module.exports = ChatSessionsController