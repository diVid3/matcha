const InputValidation = require('../InputValidation')

class PicturesValidator {

  static IDPresent(data, errors) {
    if (!data.id) {
      errors.push({ code: '400-PIC-1', message: 'Missing ID.' })
    }
  }

  static IDType(data, errors) {
    if (typeof data.id !== 'string') {
      errors.push({ code: '400-PIC-2', message: 'ID should be a string.' })
    }
  }

  static IDRegex(data, errors) {
    if (typeof data.id === 'string' && !InputValidation.isValidID(data.id)) {
      errors.push({ code: '400-PIC-3', message: 'Malformed ID.' })
    }
  }

  static usernamePresent(data, errors) {
    if (!data.username) {
      errors.push({ code: '400-PIC-5', message: 'Missing username.' })
    }
  }

  static usernameType(data, errors) {
    if (typeof data.username !== 'string') {
      errors.push({ code: '400-PIC-6', message: 'username should be a string.' })
    }
  }

  static usernameRegex(data, errors) {
    if (typeof data.username === 'string' && !InputValidation.isValidName(data.username)) {
      errors.push({ code: '400-PIC-7', message: 'Malformed username.' })
    }
  }

  static getOnlyPicIDErrors(data, errors) {

    PicturesValidator.IDPresent(data, errors)
    PicturesValidator.IDType(data, errors)
    PicturesValidator.IDRegex(data, errors)
  }

  static getOnlyPicUsernameErrors(data, errors) {

    PicturesValidator.usernamePresent(data, errors)
    PicturesValidator.usernameType(data, errors)
    PicturesValidator.usernameRegex(data, errors)
  }
}

module.exports = PicturesValidator