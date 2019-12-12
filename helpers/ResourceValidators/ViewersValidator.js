const InputValidation = require('../InputValidation')

class ViewersValidator {
  
  static IDPresent(data, errors) {
    if (!data.id) {
      errors.push({ code: '400-VIEWER-1', message: 'Missing ID.' })
    }
  }

  static IDType(data, errors) {
    if (typeof data.id !== 'string') {
      errors.push({ code: '400-VIEWER-2', message: 'ID should be a string.' })
    }
  }

  static IDRegex(data, errors) {
    if (typeof data.id === 'string' && !InputValidation.isValidID(data.id)) {
      errors.push({ code: '400-VIEWER-3', message: 'Malformed ID.' })
    }
  }

  static targetUserIDPresent(data, errors) {
    if (!data.targetUserID) {
      errors.push({ code: '400-VIEWER-4', message: 'Missing targetUserID.' })
    }
  }

  static targetUserIDType(data, errors) {
    if (typeof data.id !== 'string') {
      errors.push({ code: '400-VIEWER-5', message: 'targetUserID should be a string.' })
    }
  }

  static targetUserIDRegex(data, errors) {
    if (typeof data.id === 'string' && !InputValidation.isValidID(data.id)) {
      errors.push({ code: '400-VIEWER-6', message: 'Malformed targetUserID.' })
    }
  }

  static usernamePresent(data, errors) {
    if (!data.username) {
      errors.push({ code: '400-VIEWER-7', message: 'Missing username.' })
    }
  }

  static usernameType(data, errors) {
    if (typeof data.username !== 'string') {
      errors.push({ code: '400-VIEWER-8', message: 'username should be a string.' })
    }
  }

  static usernameRegex(data, errors) {
    if (typeof data.username === 'string' && !InputValidation.isValidName(data.username)) {
      errors.push({ code: '400-VIEWER-9', message: 'Malformed username.' })
    }
  }

  static getOnlyViewerIDErrors(data, errors) {

    ViewersValidator.IDPresent(data, errors)
    ViewersValidator.IDType(data, errors)
    ViewersValidator.IDRegex(data, errors)
  }

  static getOnlyTargetIDErrors(data, errors) {

    ViewersValidator.targetUserIDPresent(data, errors)
    ViewersValidator.targetUserIDType(data, errors)
    ViewersValidator.targetUserIDRegex(data, errors)
  }

  static getOnlyUsernameErrors(data, errors) {

    ViewersValidator.usernamePresent(data, errors)
    ViewersValidator.usernameType(data, errors)
    ViewersValidator.usernameRegex(data, errors)
  }
}

module.exports = ViewersValidator