const InputValidation = require('../InputValidation')

class LikersValidator {
  
  static IDPresent(data, errors) {
    if (!data.id) {
      errors.push({ code: '400-LIKER-1', message: 'Missing id.' })
    }
  }

  static IDType(data, errors) {
    if (typeof data.id !== 'string') {
      errors.push({ code: '400-LIKER-2', message: 'id should be a string.' })
    }
  }

  static IDRegex(data, errors) {
    if (typeof data.id === 'string' && !InputValidation.isValidID(data.id)) {
      errors.push({ code: '400-LIKER-3', message: 'Malformed id.' })
    }
  }

  static targetUserIDPresent(data, errors) {
    if (!data.targetUserID) {
      errors.push({ code: '400-LIKER-4', message: 'Missing targetUserID.' })
    }
  }

  static targetUserIDType(data, errors) {
    if (typeof data.targetUserID !== 'string') {
      errors.push({ code: '400-LIKER-5', message: 'targetUserID should be a string.' })
    }
  }

  static targetUserIDRegex(data, errors) {
    if (typeof data.targetUserID === 'string' && !InputValidation.isValidID(data.targetUserID)) {
      errors.push({ code: '400-LIKER-6', message: 'Malformed targetUserID.' })
    }
  }

  static usernamePresent(data, errors) {
    if (!data.username) {
      errors.push({ code: '400-LIKER-7', message: 'Missing username.' })
    }
  }

  static usernameType(data, errors) {
    if (typeof data.username !== 'string') {
      errors.push({ code: '400-LIKER-8', message: 'username should be a string.' })
    }
  }

  static usernameRegex(data, errors) {
    if (typeof data.username === 'string' && !InputValidation.isValidName(data.username)) {
      errors.push({ code: '400-LIKER-9', message: 'Malformed username.' })
    }
  }

  static targetUsernamePresent(data, errors) {
    if (!data.targetUsername) {
      errors.push({ code: '400-LIKER-10', message: 'Missing targetUsername.' })
    }
  }

  static targetUsernameType(data, errors) {
    if (typeof data.targetUsername !== 'string') {
      errors.push({ code: '400-LIKER-11', message: 'targetUsername should be a string.' })
    }
  }

  static targetUsernameRegex(data, errors) {
    if (typeof data.targetUsername === 'string' && !InputValidation.isValidName(data.targetUsername)) {
      errors.push({ code: '400-LIKER-12', message: 'Malformed targetUsername.' })
    }
  }

  static getOnlyLikerIDErrors(data, errors) {

    LikersValidator.IDPresent(data, errors)
    LikersValidator.IDType(data, errors)
    LikersValidator.IDRegex(data, errors)
  }

  static getOnlyTargetIDErrors(data, errors) {

    LikersValidator.targetUserIDPresent(data, errors)
    LikersValidator.targetUserIDType(data, errors)
    LikersValidator.targetUserIDRegex(data, errors)
  }

  static getOnlyUsernameErrors(data, errors) {

    LikersValidator.usernamePresent(data, errors)
    LikersValidator.usernameType(data, errors)
    LikersValidator.usernameRegex(data, errors)
  }

  static getOnlyTargetUsernameErrors(data, errors) {

    LikersValidator.targetUsernamePresent(data, errors)
    LikersValidator.targetUsernameType(data, errors)
    LikersValidator.targetUsernameRegex(data, errors)
  }
}

module.exports = LikersValidator