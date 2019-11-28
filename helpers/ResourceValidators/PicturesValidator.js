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

  static getOnlyPicIDErrors(data, errors) {

    PicturesValidator.IDPresent(data, errors)
    PicturesValidator.IDType(data, errors)
    PicturesValidator.IDRegex(data, errors)
  }
}

module.exports = PicturesValidator