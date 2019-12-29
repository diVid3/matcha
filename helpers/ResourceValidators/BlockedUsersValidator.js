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
      errors.push({ code: '400-BU-4', message: 'Missing targetUserID.' })
    }
  }

  static targetUserIDType(data, errors) {
    if (typeof data.targetUserID !== 'string') {
      errors.push({ code: '400-BU-5', message: 'targetUserID should be a string.' })
    }
  }

  static targetUserIDRegex(data, errors) {
    if (typeof data.targetUserID === 'string' && !InputValidation.isValidID(data.targetUserID)) {
      errors.push({ code: '400-BU-6', message: 'Malformed targetUserID.' })
    }
  }

  static targetUsernamePresent(data, errors) {
    if (!data.targetUsername) {
      errors.push({ code: '400-BU-7', message: 'Missing targetUsername.' })
    }
  }

  static targetUsernameType(data, errors) {
    if (typeof data.targetUsername !== 'string') {
      errors.push({ code: '400-BU-8', message: 'targetUsername should be a string.' })
    }
  }

  static targetUsernameRegex(data, errors) {
    if (typeof data.targetUsername === 'string' && !InputValidation.isValidName(data.targetUsername)) {
      errors.push({ code: '400-BU-9', message: 'Malformed targetUsername.' })
    }
  }

  static usernamePresent(data, errors) {
    if (!data.username) {
      errors.push({ code: '400-BU-10', message: 'Missing username.' })
    }
  }

  static usernameType(data, errors) {
    if (typeof data.username !== 'string') {
      errors.push({ code: '400-BU-11', message: 'username should be a string.' })
    }
  }

  static usernameRegex(data, errors) {
    if (typeof data.username === 'string' && !InputValidation.isValidName(data.username)) {
      errors.push({ code: '400-BU-12', message: 'Malformed username.' })
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

  static getOnlyTargetUsernameErrors(data, errors) {

    BlockedUsersValidator.targetUsernamePresent(data, errors)
    BlockedUsersValidator.targetUsernameType(data, errors)
    BlockedUsersValidator.targetUsernameRegex(data, errors)
  }

  static getOnlyBlockedUsernameErrors(data, errors) {

    BlockedUsersValidator.usernamePresent(data, errors)
    BlockedUsersValidator.usernameType(data, errors)
    BlockedUsersValidator.usernameRegex(data, errors)
  }
}

module.exports = BlockedUsersValidator