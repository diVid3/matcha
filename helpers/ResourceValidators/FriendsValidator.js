const InputValidation = require('../InputValidation')

class FriendsValidator {
  
  static IDPresent(data, errors) {
    if (!data.id) {
      errors.push({ code: '400-FRIEND-1', message: 'Missing id.' })
    }
  }

  static IDType(data, errors) {
    if (typeof data.id !== 'string') {
      errors.push({ code: '400-FRIEND-2', message: 'id should be a string.' })
    }
  }

  static IDRegex(data, errors) {
    if (typeof data.id === 'string' && !InputValidation.isValidID(data.id)) {
      errors.push({ code: '400-FRIEND-3', message: 'Malformed id.' })
    }
  }

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

  static usernamePresent(data, errors) {
    if (!data.username) {
      errors.push({ code: '400-FRIEND-7', message: 'Missing username.' })
    }
  }

  static usernameType(data, errors) {
    if (typeof data.username !== 'string') {
      errors.push({ code: '400-FRIEND-8', message: 'username should be a string.' })
    }
  }

  static usernameRegex(data, errors) {
    if (typeof data.username === 'string' && !InputValidation.isValidName(data.username)) {
      errors.push({ code: '400-FRIEND-9', message: 'Malformed username.' })
    }
  }

  static targetUsernamePresent(data, errors) {
    if (!data.targetUsername) {
      errors.push({ code: '400-FRIEND-10', message: 'Missing targetUsername.' })
    }
  }

  static targetUsernameType(data, errors) {
    if (typeof data.targetUsername !== 'string') {
      errors.push({ code: '400-FRIEND-11', message: 'targetUsername should be a string.' })
    }
  }

  static targetUsernameRegex(data, errors) {
    if (typeof data.targetUsername === 'string' && !InputValidation.isValidName(data.targetUsername)) {
      errors.push({ code: '400-FRIEND-12', message: 'Malformed targetUsername.' })
    }
  }

  static getOnlyFriendIDErrors(data, errors) {

    FriendsValidator.IDPresent(data, errors)
    FriendsValidator.IDType(data, errors)
    FriendsValidator.IDRegex(data, errors)
  }

  static getOnlyTargetIDErrors(data, errors) {

    FriendsValidator.targetUserIDPresent(data, errors)
    FriendsValidator.targetUserIDType(data, errors)
    FriendsValidator.targetUserIDRegex(data, errors)
  }

  static getOnlyUsernameErrors(data, errors) {

    FriendsValidator.usernamePresent(data, errors)
    FriendsValidator.usernameType(data, errors)
    FriendsValidator.usernameRegex(data, errors)
  }

  static getOnlyTargetUsernameErrors(data, errors) {

    FriendsValidator.targetUsernamePresent(data, errors)
    FriendsValidator.targetUsernameType(data, errors)
    FriendsValidator.targetUsernameRegex(data, errors)
  }
}

module.exports = FriendsValidator