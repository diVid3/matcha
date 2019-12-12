const InputValidation = require('../InputValidation')

class BlockedUsersValidator {
  
  static IDPresent(data, errors) {
    if (!data.id) {
      errors.push({ code: '400-BU-1', message: 'Missing ID.' })
    }
  }

  static IDType(data, errors) {
    if (typeof data.id !== 'string') {
      errors.push({ code: '400-BU-2', message: 'ID should be a string.' })
    }
  }

  static IDRegex(data, errors) {
    if (typeof data.id === 'string' && !InputValidation.isValidID(data.id)) {
      errors.push({ code: '400-BU-3', message: 'Malformed ID.' })
    }
  }

  // static usernamePresent(data, errors) {
  //   if (!data.username) {
  //     errors.push({ code: '400-TAG-7', message: 'Missing username.' })
  //   }
  // }

  // static usernameType(data, errors) {
  //   if (typeof data.username !== 'string') {
  //     errors.push({ code: '400-TAG-8', message: 'username should be a string.' })
  //   }
  // }

  // static usernameRegex(data, errors) {
  //   if (typeof data.username === 'string' && !InputValidation.isValidName(data.username)) {
  //     errors.push({ code: '400-TAG-9', message: 'Malformed username.' })
  //   }
  // }

  static getOnlyBlockedUsersIDErrors(data, errors) {

    BlockedUsersValidator.IDPresent(data, errors)
    BlockedUsersValidator.IDType(data, errors)
    BlockedUsersValidator.IDRegex(data, errors)
  }

  // static getOnlyTagUsernameErrors(data, errors) {

  //   BlockedUsersValidator.usernamePresent(data, errors)
  //   BlockedUsersValidator.usernameType(data, errors)
  //   BlockedUsersValidator.usernameRegex(data, errors)
  // }
}

module.exports = BlockedUsersValidator