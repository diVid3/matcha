const InputValidation = require('../InputValidation')

class MessagesValidator {

  static IDPresent(data, errors) {
    if (!data.id) {
      errors.push({ code: '400-MES-1', message: 'Missing id.' })
    }
  }

  static IDType(data, errors) {
    if (typeof data.id !== 'string') {
      errors.push({ code: '400-MES-2', message: 'id should be a string.' })
    }
  }

  static IDRegex(data, errors) {
    if (typeof data.id === 'string' && !InputValidation.isValidID(data.id)) {
      errors.push({ code: '400-MES-3', message: 'Malformed id.' })
    }
  }

  static targetUserIDPresent(data, errors) {
    if (!data.targetUserID) {
      errors.push({ code: '400-MES-4', message: 'Missing targetUserID.' })
    }
  }

  static targetUserIDType(data, errors) {
    if (typeof data.targetUserID !== 'string') {
      errors.push({ code: '400-MES-5', message: 'targetUserID should be a string.' })
    }
  }

  static targetUserIDRegex(data, errors) {
    if (typeof data.targetUserID === 'string' && !InputValidation.isValidID(data.targetUserID)) {
      errors.push({ code: '400-MES-6', message: 'Malformed targetUserID.' })
    }
  }

  static getOnlyMessageIDErrors(data, errors) {

    MessagesValidator.IDPresent(data, errors)
    MessagesValidator.IDType(data, errors)
    MessagesValidator.IDRegex(data, errors)
  }

  static getOnlyTargetIDErrors(data, errors) {

    MessagesValidator.targetUserIDPresent(data, errors)
    MessagesValidator.targetUserIDType(data, errors)
    MessagesValidator.targetUserIDRegex(data, errors)
  }
}

module.exports = MessagesValidator