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

  static timeIssuedPresent(data, errors) {
    if (!data.timeIssued) {
      errors.push({ code: '400-MES-7', message: 'Missing timeIssued.' })
    }
  }

  static timeIssuedType(data, errors) {
    if (typeof data.timeIssued !== 'string') {
      errors.push({ code: '400-MES-8', message: 'timeIssued should be a string.' })
    }
  }

  static timeIssuedRegex(data, errors) {
    if (typeof data.timeIssued === 'string' && !InputValidation.isValidTimeIssued(data.timeIssued)) {
      errors.push({ code: '400-MES-9', message: 'Malformed timeIssued.' })
    }
  }

  static messagePresent(data, errors) {
    if (!data.message) {
      errors.push({ code: '400-MES-10', message: 'Missing message.' })
    }
  }

  static messageType(data, errors) {
    if (typeof data.message !== 'string') {
      errors.push({ code: '400-MES-11', message: 'message should be a string.' })
    }
  }

  static messageRegex(data, errors) {
    if (typeof data.message === 'string' && !InputValidation.isValidMessage(data.message)) {
      errors.push({ code: '400-MES-12', message: 'Malformed message.' })
    }
  }

  static readPresent(data, errors) {
    if (!data.read) {
      errors.push({ code: '400-MES-13', message: 'Missing read.' })
    }
  }

  static readType(data, errors) {
    if (typeof data.read !== 'string') {
      errors.push({ code: '400-MES-14', message: 'read should be a string.' })
    }
  }

  static readRegex(data, errors) {
    if (typeof data.read === 'string' && !InputValidation.isValidRead(data.read)) {
      errors.push({ code: '400-MES-15', message: 'Malformed read.' })
    }
  }

  static usernamePresent(data, errors) {
    if (!data.username) {
      errors.push({ code: '400-MES-16', message: 'Missing username.' })
    }
  }

  static usernameType(data, errors) {
    if (typeof data.username !== 'string') {
      errors.push({ code: '400-MES-17', message: 'username should be a string.' })
    }
  }

  static usernameRegex(data, errors) {
    if (typeof data.username === 'string' && !InputValidation.isValidName(data.username)) {
      errors.push({ code: '400-MES-18', message: 'Malformed username.' })
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

  static getOnlyTimeIssuedErrors(data, errors) {

    MessagesValidator.timeIssuedPresent(data, errors)
    MessagesValidator.timeIssuedType(data, errors)
    MessagesValidator.timeIssuedRegex(data, errors)
  }

  static getOnlyMessageErrors(data, errors) {

    MessagesValidator.messagePresent(data, errors)
    MessagesValidator.messageType(data, errors)
    MessagesValidator.messageRegex(data, errors)
  }

  static getOnlyReadErrors(data, errors) {

    MessagesValidator.readPresent(data, errors)
    MessagesValidator.readType(data, errors)
    MessagesValidator.readRegex(data, errors)
  }

  static getOnlyUsernameErrors(data, errors) {

    MessagesValidator.usernamePresent(data, errors)
    MessagesValidator.usernameType(data, errors)
    MessagesValidator.usernameRegex(data, errors)
  }
}

module.exports = MessagesValidator