const InputValidation = require('../InputValidation')

class TagsValidator {
  
  static IDPresent(data, errors) {
    if (!data.id) {
      errors.push({ code: '400-TAG-1', message: 'Missing ID.' })
    }
  }

  static IDType(data, errors) {
    if (typeof data.id !== 'string') {
      errors.push({ code: '400-TAG-2', message: 'ID should be a string.' })
    }
  }

  static IDRegex(data, errors) {
    if (typeof data.id === 'string' && !InputValidation.isValidID(data.id)) {
      errors.push({ code: '400-TAG-3', message: 'Malformed ID.' })
    }
  }

  static getOnlyTagIDErrors(data, errors) {

    TagsValidator.IDPresent(data, errors)
    TagsValidator.IDType(data, errors)
    TagsValidator.IDRegex(data, errors)
  }
}

module.exports = TagsValidator