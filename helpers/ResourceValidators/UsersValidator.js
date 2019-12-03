const InputValidation = require('../InputValidation')

class UsersValidator {

  static firstNamePresent(data, errors) {
    if (!data.firstName) {
      errors.push({ code: '400-USER-1', message: 'Missing firstName.' })
    }
  }

  static firstNameType(data, errors) {
    if (typeof data.firstName !== 'string') {
      errors.push({ code: '400-USER-30', message: 'firstName should be a string.' })
    }
  }

  static firstNameRegex(data, errors) {
    if (typeof data.firstName === 'string' && !InputValidation.isValidName(data.firstName)) {
      errors.push({ code: '400-USER-15', message: 'Malformed firstName.' })
    }
  }

  static lastNamePresent(data, errors) {
    if (!data.lastName) {
      errors.push({ code: '400-USER-2', message: 'Missing lastName.' })
    }
  }

  static lastNameType(data, errors) {
    if (typeof data.lastName !== 'string') {
      errors.push({ code: '400-USER-31', message: 'lastName should be a string.' })
    }
  }

  static lastNameRegex(data, errors) {
    if (typeof data.lastName === 'string' && !InputValidation.isValidName(data.lastName)) {
      errors.push({ code: '400-USER-16', message: 'Malformed lastName.' })
    }
  }

  static genderPresent(data, errors) {
    if (!data.gender) {
      errors.push({ code: '400-USER-3', message: 'Missing gender.' })
    }
  }

  static genderType(data, errors) {
    if (typeof data.gender !== 'string') {
      errors.push({ code: '400-USER-32', message: 'gender should be a string.' })
    }
  }

  static genderRegex(data, errors) {
    if (typeof data.gender === 'string' && !InputValidation.isValidGender(data.gender)) {
      errors.push({ code: '400-USER-17', message: 'Malformed gender.' })
    }
  }

  static sexPrefPreset(data, errors) {
    if (!data.sexPref) {
      errors.push({ code: '400-USER-52', message: 'Missing sexPref.' })
    }
  }

  static sexPrefType(data, errors) {
    if (typeof data.sexPref !== 'string') {
      errors.push({ code: '400-USER-54', message: 'sexPref should be a string.' })
    }
  }

  static sexPrefRegex(data, errors) {
    if (typeof data.gender === 'string' && !InputValidation.isValidSexPref(data.sexPref)) {
      errors.push({ code: '400-USER-53', message: 'Malformed sexPref.' })
    }
  }

  static biographyPresent(data, errors) {
    if (!data.biography) {
      errors.push({ code: '400-USER-4', message: 'Missing biography.' })
    }
  }

  static biographyType(data, errors) {
    if (typeof data.biography !== 'string') {
      errors.push({ code: '400-USER-33', message: 'biography should be a string.' })
    }
  }

  static biographyRegex(data, errors) {
    if (typeof data.biography === 'string' && !InputValidation.isValidBiography(data.biography)) {
      errors.push({ code: '400-USER-18', message: 'Malformed biography.' })
    }
  }

  static usernamePresent(data, errors) {
    if (!data.username) {
      errors.push({ code: '400-USER-5', message: 'Missing username.' })
    }
  }

  static usernameType(data, errors) {
    if (typeof data.username !== 'string') {
      errors.push({ code: '400-USER-34', message: 'username should be a string.' })
    }
  }

  static usernameRegex(data, errors) {
    if (typeof data.username === 'string' && !InputValidation.isValidName(data.username)) {
      errors.push({ code: '400-USER-19', message: 'Malformed username.' })
    }
  }

  static emailPresent(data, errors) {
    if (!data.email) {
      errors.push({ code: '400-USER-6', message: 'Missing email.' })
    }
  }

  static emailType(data, errors) {
    if (typeof data.email !== 'string') {
      errors.push({ code: '400-USER-35', message: 'email should be a string.' })
    }
  }

  static emailRegex(data, errors) {
    if (typeof data.email === 'string' && !InputValidation.isValidEmail(data.email)) {
      errors.push({ code: '400-USER-20', message: 'Malformed email.' })
    }
  }

  static passwordPresent(data, errors) {
    if (!data.password) {
      errors.push({ code: '400-USER-7', message: 'Missing password.' })
    }
  }

  static passwordType(data, errors) {
    if (typeof data.password !== 'string') {
      errors.push({ code: '400-USER-36', message: 'password should be a string.' })
    }
  }

  static passwordRegex(data, errors) {
    if (typeof data.password === 'string' && !InputValidation.isValidPassword(data.password)) {
      errors.push({ code: '400-USER-21', message: 'Malformed password.' })
    }
  }

  static fameRatingPresent(data, errors) {
    if (!data.fameRating) {
      errors.push({ code: '400-USER-8', message: 'Missing fameRating.' })
    }
  }

  static fameRatingType(data, errors) {
    if (typeof data.fameRating !== 'string') {
      errors.push({ code: '400-USER-37', message: 'fameRating should be a string.' })
    }
  }

  static fameRatingRegex(data, errors) {
    if (typeof data.fameRating === 'string' && !InputValidation.isValidFameRating(data.fameRating)) {
      errors.push({ code: '400-USER-22', message: 'Malformed fameRating.' })
    }
  }

  static latitudePresent(data, errors) {
    if (!data.latitude) {
      errors.push({ code: '400-USER-9', message: 'Missing latitude.' })
    }
  }

  static latitudeType(data, errors) {
    if (typeof data.latitude !== 'string') {
      errors.push({ code: '400-USER-38', message: 'latitude should be a string.' })
    }
  }

  static latitudeRegex(data, errors) {
    if (typeof data.latitude === 'string' && !InputValidation.isValidLatLong(data.latitude)) {
      errors.push({ code: '400-USER-23', message: 'Malformed latitude.' })
    }
  }

  static longitudePresent(data, errors) {
    if (!data.longitude) {
      errors.push({ code: '400-USER-10', message: 'Missing longitude.' })
    }
  }

  static longitudeType(data, errors) {
    if (typeof data.longitude !== 'string') {
      errors.push({ code: '400-USER-39', message: 'longitude should be a string.' })
    }
  }

  static longitudeRegex(data, errors) {
    if (typeof data.longitude === 'string' && !InputValidation.isValidLatLong(data.longitude)) {
      errors.push({ code: '400-USER-24', message: 'Malformed longitude.' })
    }
  }

  static lastSeenPresent(data, errors) {
    if (!data.lastSeen) {
      errors.push({ code: '400-USER-11', message: 'Missing lastSeen.' })
    }
  }

  static lastSeenType(data, errors) {
    if (typeof data.lastSeen !== 'string') {
      errors.push({ code: '400-USER-40', message: 'lastSeen should be a string.' })
    }
  }

  static lastSeenRegex(data, errors) {
    if (typeof data.lastSeen === 'string' && !InputValidation.isValidLastSeen(data.lastSeen)) {
      errors.push({ code: '400-USER-25', message: 'Malformed lastSeen.' })
    }
  }

  static agePresent(data, errors) {
    if (!data.age) {
      errors.push({ code: '400-USER-12', message: 'Missing age.' })
    }
  }

  static ageType(data, errors) {
    if (typeof data.age !== 'string') {
      errors.push({ code: '400-USER-41', message: 'age should be a string.' })
    }
  }

  static ageRegex(data, errors) {
    if (typeof data.age === 'string' && !InputValidation.isValidAgeChars(data.age)) {
      errors.push({ code: '400-USER-26', message: 'Malformed age.' })
    }
  }

  static ageRange(data, errors) {
    if (typeof data.age === 'string' && !InputValidation.isValidAge(data.age)) {
      errors.push({ code: '400-USER-27', message: 'Age out of range.' })
    }
  }

  static resetTokenPresent(data, errors) {
    if (!data.resetToken) {
      errors.push({ code: '400-USER-46', message: 'Missing resetToken.' })
    }
  }

  static resetTokenType(data, errors) {
    if (typeof data.resetToken !== 'string') {
      errors.push({ code: '400-USER-48', message: 'resetToken should be a string.' })
    }
  }

  static resetTokenRegex(data, errors) {
    if (typeof data.resetToken === 'string' && !InputValidation.isValidUuid(data.resetToken)) {
      errors.push({ code: '400-USER-47', message: 'Malformed resetToken.' })
    }
  }

  static verifyTokenPresent(data, errors) {
    if (!data.verifyToken) {
      errors.push({ code: '400-USER-13', message: 'Missing verifyToken.' })
    }
  }

  static verifyTokenType(data, errors) {
    if (typeof data.verifyToken !== 'string') {
      errors.push({ code: '400-USER-42', message: 'verifyToken should be a string.' })
    }
  }

  static verifyTokenRegex(data, errors) {
    if (typeof data.verifyToken === 'string' && !InputValidation.isValidUuid(data.verifyToken)) {
      errors.push({ code: '400-USER-28', message: 'Malformed verifyToken.' })
    }
  }

  static verifiedPresent(data, errors) {
    if (!data.verified) {
      errors.push({ code: '400-USER-14', message: 'Missing verified.' })
    }
  }

  static verifiedType(data, errors) {
    if (typeof data.verified !== 'string') {
      errors.push({ code: '400-USER-43', message: 'verified should be a string.' })
    }
  }

  static verifiedRegex(data, errors) {
    if (typeof data.verified === 'string' && !InputValidation.isValidVerified(data.verified)) {
      errors.push({ code: '400-USER-29', message: 'Malformed verified.' })
    }
  }

  static profilePicPathPresent(data, errors) {
    if (!data.profilePicPath) {
      errors.push({ code: '400-USER-49', message: 'Missing profilePicPath.' })
    }
  }

  static profilePicPathType(data, errors) {
    if (typeof data.profilePicPath !== 'string') {
      errors.push({ code: '400-USER-51', message: 'profilePicPath should be a string.' })
    }
  }

  static profilePicPathRegex(data, errors) {
    if (typeof data.profilePicPath === 'string' && !InputValidation.isValidFilePath(data.profilePicPath)) {
      errors.push({ code: '400-USER-50', message: 'Malformed profilePicPath.' })
    }
  }

  static getUserErrors(data, errors) {

    UsersValidator.firstNamePresent(data, errors)
    UsersValidator.firstNameType(data, errors)
    UsersValidator.firstNameRegex(data, errors)
    UsersValidator.lastNamePresent(data, errors)
    UsersValidator.lastNameType(data, errors)
    UsersValidator.lastNameRegex(data, errors)
    UsersValidator.genderPresent(data, errors)
    UsersValidator.genderType(data, errors)
    UsersValidator.genderRegex(data, errors)
    UsersValidator.biographyPresent(data, errors)
    UsersValidator.biographyType(data, errors)
    UsersValidator.biographyRegex(data, errors)
    UsersValidator.usernamePresent(data, errors)
    UsersValidator.usernameType(data, errors)
    UsersValidator.usernameRegex(data, errors)
    UsersValidator.emailPresent(data, errors)
    UsersValidator.emailType(data, errors)
    UsersValidator.emailRegex(data, errors)
    UsersValidator.passwordPresent(data, errors)
    UsersValidator.passwordType(data, errors)
    UsersValidator.passwordRegex(data, errors)
    UsersValidator.fameRatingPresent(data, errors)
    UsersValidator.fameRatingType(data, errors)
    UsersValidator.fameRatingRegex(data, errors)
    UsersValidator.latitudePresent(data, errors)
    UsersValidator.latitudeType(data, errors)
    UsersValidator.latitudeRegex(data, errors)
    UsersValidator.longitudePresent(data, errors)
    UsersValidator.longitudeType(data, errors)
    UsersValidator.longitudeRegex(data, errors)
    UsersValidator.lastSeenPresent(data, errors)
    UsersValidator.lastSeenType(data, errors)
    UsersValidator.lastSeenRegex(data, errors)
    UsersValidator.agePresent(data, errors)
    UsersValidator.ageType(data, errors)
    UsersValidator.ageRegex(data, errors)
    UsersValidator.ageRange(data, errors)
    UsersValidator.verifyTokenPresent(data, errors)
    UsersValidator.verifyTokenType(data, errors)
    UsersValidator.verifyTokenRegex(data, errors)
    UsersValidator.verifiedPresent(data, errors)
    UsersValidator.verifiedType(data, errors)
    UsersValidator.verifiedRegex(data, errors)
  }

  static getOnlyUsernameErrors(data, errors) {

    UsersValidator.usernamePresent(data, errors)
    UsersValidator.usernameType(data, errors)
    UsersValidator.usernameRegex(data, errors)
  }

  static getOnlyEmailErrors(data, errors) {

    UsersValidator.emailPresent(data, errors)
    UsersValidator.emailType(data, errors)
    UsersValidator.emailRegex(data, errors)
  }

  static getOnlyVerifyTokenErrors(data, errors) {

    UsersValidator.verifyTokenPresent(data, errors)
    UsersValidator.verifyTokenType(data, errors)
    UsersValidator.verifyTokenRegex(data, errors)
  }

  static getOnlyResetTokenErrors(data, errors) {

    UsersValidator.resetTokenPresent(data, errors)
    UsersValidator.resetTokenType(data, errors)
    UsersValidator.resetTokenRegex(data, errors)
  }

  static getPatchUserByEmailErrors(data, errors) {

    if (!data.email) {
      return UsersValidator.emailPresent(data, errors)
    }

    if (data.firstName) {
      UsersValidator.firstNameType(data, errors)
      UsersValidator.firstNameRegex(data, errors)
    }

    if (data.lastName) {
      UsersValidator.lastNameType(data, errors)
      UsersValidator.lastNameRegex(data, errors)
    }

    if (data.gender) {
      UsersValidator.genderType(data, errors)
      UsersValidator.genderRegex(data, errors)
    }

    if (data.sexPref) {
      UsersValidator.sexPrefType(data, errors)
      UsersValidator.sexPrefRegex(data, errors)
    }

    if (data.biography) {
      UsersValidator.biographyType(data, errors)
      UsersValidator.biographyRegex(data, errors)
    }

    if (data.username) {
      UsersValidator.usernameType(data, errors)
      UsersValidator.usernameRegex(data, errors)
    }

    if (data.email) {
      UsersValidator.emailType(data, errors)
      UsersValidator.emailRegex(data, errors)
    }

    if (data.password) {
      UsersValidator.passwordType(data, errors)
      UsersValidator.passwordRegex(data, errors)
    }

    if (data.fameRating) {
      UsersValidator.fameRatingType(data, errors)
      UsersValidator.fameRatingRegex(data, errors)
    }

    if (data.latitude) {
      UsersValidator.latitudeType(data, errors)
      UsersValidator.latitudeRegex(data, errors)
    }

    if (data.longitude) {
      UsersValidator.longitudeType(data, errors)
      UsersValidator.longitudeRegex(data, errors)
    }

    if (data.lastSeen) {
      UsersValidator.lastSeenType(data, errors)
      UsersValidator.lastSeenRegex(data, errors)
    }

    if (data.age) {
      UsersValidator.ageType(data, errors)
      UsersValidator.ageRegex(data, errors)
      UsersValidator.ageRange(data, errors)
    }

    if (data.resetToken) {
      UsersValidator.resetTokenType(data, errors)
      UsersValidator.resetTokenRegex(data, errors)
    }

    if (data.verifyToken) {
      UsersValidator.verifyTokenType(data, errors)
      UsersValidator.verifyTokenRegex(data, errors)
    }

    if (data.verified) {
      UsersValidator.verifiedType(data, errors)
      UsersValidator.verifiedRegex(data, errors)
    }

    if (data.profilePicPath) {
      UsersValidator.profilePicPathType(data, errors)
      UsersValidator.profilePicPathRegex(data, errors)
    }
  }
}

module.exports = UsersValidator