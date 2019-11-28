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

  static getOnlyViewerIDErrors(data, errors) {

    ViewersValidator.IDPresent(data, errors)
    ViewersValidator.IDType(data, errors)
    ViewersValidator.IDRegex(data, errors)
  }
}

module.exports = ViewersValidator