const InputValidation = require('../InputValidation')

class BlockedUsersValidator {
  
  static IDPresent(data, errors) {
    if (!data.id) {
      errors.push({ code: '400-BU-1', message: 'Missing id.' })
    }
  }

  static IDType(data, errors) {
    if (typeof data.id !== 'string') {
      errors.push({ code: '400-BU-2', message: 'id should be a string.' })
    }
  }

  static IDRegex(data, errors) {
    if (typeof data.id === 'string' && !InputValidation.isValidID(data.id)) {
      errors.push({ code: '400-BU-3', message: 'Malformed id.' })
    }
  }
  
  static targetUserIDPresent(data, errors) {
    if (!data.targetUserID) {
      errors.push({ code: '400-FRIEND-4', message: 'Missing targetUserID.' })
    }
  }

  static targetUserIDType(data, errors) {
    if (typeof data.targetUserID !== 'string') {
      errors.push({ code: '400-FRIEND-5', message: 'targetUserID should be a string.' })
    }
  }

  static targetUserIDRegex(data, errors) {
    if (typeof data.targetUserID === 'string' && !InputValidation.isValidID(data.targetUserID)) {
      errors.push({ code: '400-FRIEND-6', message: 'Malformed targetUserID.' })
    }
  }

  static getOnlyTargetIDErrors(data, errors) {

    BlockedUsersValidator.targetUserIDPresent(data, errors)
    BlockedUsersValidator.targetUserIDType(data, errors)
    BlockedUsersValidator.targetUserIDRegex(data, errors)
  }

  static getOnlyBlockedUsersIDErrors(data, errors) {

    BlockedUsersValidator.IDPresent(data, errors)
    BlockedUsersValidator.IDType(data, errors)
    BlockedUsersValidator.IDRegex(data, errors)
  }
}

module.exports = BlockedUsersValidator