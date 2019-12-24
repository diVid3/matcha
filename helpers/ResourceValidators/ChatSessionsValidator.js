const InputValidation = require('../InputValidation')

class ChatSessionsValidator {
  
  static IDPresent(data, errors) {
    if (!data.id) {
      errors.push({ code: '400-CHAT-1', message: 'Missing id.' })
    }
  }

  static IDType(data, errors) {
    if (typeof data.id !== 'string') {
      errors.push({ code: '400-CHAT-2', message: 'id should be a string.' })
    }
  }

  static IDRegex(data, errors) {
    if (typeof data.id === 'string' && !InputValidation.isValidID(data.id)) {
      errors.push({ code: '400-CHAT-3', message: 'Malformed id.' })
    }
  }

  static getOnlyChatSessionsIDErrors(data, errors) {

    ChatSessionsValidator.IDPresent(data, errors)
    ChatSessionsValidator.IDType(data, errors)
    ChatSessionsValidator.IDRegex(data, errors)
  }
}

module.exports = ChatSessionsValidator