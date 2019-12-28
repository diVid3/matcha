const InputValidation = require('../InputValidation')

class NotificationsValidator {

  static IDPresent(data, errors) {
    if (!data.id) {
      errors.push({ code: '400-NOTIF-1', message: 'Missing id.' })
    }
  }

  static IDType(data, errors) {
    if (typeof data.id !== 'string') {
      errors.push({ code: '400-NOTIF-2', message: 'id should be a string.' })
    }
  }

  static IDRegex(data, errors) {
    if (typeof data.id === 'string' && !InputValidation.isValidID(data.id)) {
      errors.push({ code: '400-NOTIF-3', message: 'Malformed id.' })
    }
  }

  static notificationPresent(data, errors) {
    if (!data.notification) {
      errors.push({ code: '400-NOTIF-4', message: 'Missing notification.' })
    }
  }

  static notificationType(data, errors) {
    if (typeof data.notification !== 'string') {
      errors.push({ code: '400-NOTIF-5', message: 'notification should be a string.' })
    }
  }

  static notificationRegex(data, errors) {
    if (typeof data.notification === 'string' && !InputValidation.isValidNotification(data.notification)) {
      errors.push({ code: '400-NOTIF-6', message: 'Malformed notification.' })
    }
  }

  static readPresent(data, errors) {
    if (!data.read) {
      errors.push({ code: '400-NOTIF-7', message: 'Missing read.' })
    }
  }

  static readType(data, errors) {
    if (typeof data.read !== 'string') {
      errors.push({ code: '400-NOTIF-8', message: 'read should be a string.' })
    }
  }

  static readRegex(data, errors) {
    if (typeof data.read === 'string' && !InputValidation.isValidRead(data.read)) {
      errors.push({ code: '400-NOTIF-9', message: 'Malformed read.' })
    }
  }

  static usernamePresent(data, errors) {
    if (!data.username) {
      errors.push({ code: '400-NOTIF-10', message: 'Missing username.' })
    }
  }

  static usernameType(data, errors) {
    if (typeof data.username !== 'string') {
      errors.push({ code: '400-NOTIF-11', message: 'username should be a string.' })
    }
  }

  static usernameRegex(data, errors) {
    if (typeof data.username === 'string' && !InputValidation.isValidName(data.username)) {
      errors.push({ code: '400-NOTIF-12', message: 'Malformed username.' })
    }
  }

  // static getOnlyNotificationIDErrors(data, errors) {

  //   NotificationsValidator.IDPresent(data, errors)
  //   NotificationsValidator.IDType(data, errors)
  //   NotificationsValidator.IDRegex(data, errors)
  // }

  static getOnlyNotificationErrors(data, errors) {

    NotificationsValidator.notificationPresent(data, errors)
    NotificationsValidator.notificationType(data, errors)
    NotificationsValidator.notificationRegex(data, errors)
  }

  static getOnlyReadErrors(data, errors) {

    NotificationsValidator.readPresent(data, errors)
    NotificationsValidator.readType(data, errors)
    NotificationsValidator.readRegex(data, errors)
  }

  static getOnlyUsernameErrors(data, errors) {

    NotificationsValidator.usernamePresent(data, errors)
    NotificationsValidator.usernameType(data, errors)
    NotificationsValidator.usernameRegex(data, errors)
  }
}

module.exports = NotificationsValidator