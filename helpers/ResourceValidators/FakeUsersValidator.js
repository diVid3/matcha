const InputValidation = require('../InputValidation')

class FakeUsersValidator {
  
  static targetUserIDPresent(data, errors) {
    if (!data.targetUserID) {
      errors.push({ code: '400-FRIEND-4', message: 'Missing targetUserID.' })
    }
  }

  static targetUserIDType(data, errors) {
    if (typeof data.targetUserID !== 'string') {
      errors.push({ code: '400-FRIEND-5', message: 'targetUserID should be a string.' })
    }
  }

  static targetUserIDRegex(data, errors) {
    if (typeof data.targetUserID === 'string' && !InputValidation.isValidID(data.targetUserID)) {
      errors.push({ code: '400-FRIEND-6', message: 'Malformed targetUserID.' })
    }
  }
  static getOnlyTargetIDErrors(data, errors) {

    FakeUsersValidator.targetUserIDPresent(data, errors)
    FakeUsersValidator.targetUserIDType(data, errors)
    FakeUsersValidator.targetUserIDRegex(data, errors)
  }
}

module.exports = FakeUsersValidator