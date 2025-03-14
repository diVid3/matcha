const InputValidation = require('../InputValidation')

class TagsValidator {
  
  static IDPresent(data, errors) {
    if (!data.id) {
      errors.push({ code: '400-TAG-1', message: 'Missing id.' })
    }
  }

  static IDType(data, errors) {
    if (typeof data.id !== 'string') {
      errors.push({ code: '400-TAG-2', message: 'id should be a string.' })
    }
  }

  static IDRegex(data, errors) {
    if (typeof data.id === 'string' && !InputValidation.isValidID(data.id)) {
      errors.push({ code: '400-TAG-3', message: 'Malformed id.' })
    }
  }

  static tagPresent(data, errors) {
    if (!data.tag) {
      errors.push({ code: '400-TAG-4', message: 'Missing tag.' })
    }
  }

  static tagType(data, errors) {
    if (typeof data.tag !== 'string') {
      errors.push({ code: '400-TAG-5', message: 'tag should be a string.' })
    }
  }

  static tagAccepted(data, errors) {
    if (typeof data.tag === 'string' && !InputValidation.isValidTag(data.tag)) {
      errors.push({ code: '400-TAG-6', message: 'Only accepted tags are: cats, coffee, gaming, fishing, hiking, ' +
      'reading, partying, running, stars, science, cooking.' })
    }
  }

  static usernamePresent(data, errors) {
    if (!data.username) {
      errors.push({ code: '400-TAG-7', message: 'Missing username.' })
    }
  }

  static usernameType(data, errors) {
    if (typeof data.username !== 'string') {
      errors.push({ code: '400-TAG-8', message: 'username should be a string.' })
    }
  }

  static usernameRegex(data, errors) {
    if (typeof data.username === 'string' && !InputValidation.isValidName(data.username)) {
      errors.push({ code: '400-TAG-9', message: 'Malformed username.' })
    }
  }

  static getOnlyTagIDErrors(data, errors) {

    TagsValidator.IDPresent(data, errors)
    TagsValidator.IDType(data, errors)
    TagsValidator.IDRegex(data, errors)
  }

  static getOnlyTagStringErrors(data, errors) {

    TagsValidator.tagPresent(data, errors)
    TagsValidator.tagType(data, errors)
    TagsValidator.tagAccepted(data, errors)
  }

  static getOnlyTagUsernameErrors(data, errors) {

    TagsValidator.usernamePresent(data, errors)
    TagsValidator.usernameType(data, errors)
    TagsValidator.usernameRegex(data, errors)
  }
}

module.exports = TagsValidator