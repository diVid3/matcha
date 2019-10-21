const InputValidation = require('../InputValidation')

class UsersValidator {

  static getErrors(data, errors, checkToExec) {

    if (
      typeof data !== 'object' ||
      !(errors instanceof Array) ||
      typeof checkToExec !== 'string' ||
      !checkToExec.length
    ) {
      throw new Error('Invalid getErrors input.')
    }
    
    if (
      checkToExec !== 'firstNamePresent' &&
      checkToExec !== 'firstNameType' &&
      checkToExec !== 'firstNameRegex' &&
      checkToExec !== 'lastNamePresent' &&
      checkToExec !== 'lastNameType' &&
      checkToExec !== 'lastNameRegex' &&
      checkToExec !== 'genderPresent' &&
      checkToExec !== 'genderType' &&
      checkToExec !== 'genderRegex' &&
      checkToExec !== 'biographyPresent' &&
      checkToExec !== 'biographyType' &&
      checkToExec !== 'biographyRegex' &&
      checkToExec !== 'usernamePresent' &&
      checkToExec !== 'usernameType' &&
      checkToExec !== 'usernameRegex' &&
      checkToExec !== 'emailPresent' &&
      checkToExec !== 'emailType' &&
      checkToExec !== 'emailRegex' &&
      checkToExec !== 'passwordPresent' &&
      checkToExec !== 'passwordType' &&
      checkToExec !== 'passwordRegex' &&
      checkToExec !== 'fameRatingPresent' &&
      checkToExec !== 'fameRatingType' &&
      checkToExec !== 'fameRatingRegex' &&
      checkToExec !== 'latitudePresent' &&
      checkToExec !== 'latitudeType' &&
      checkToExec !== 'latitudeRegex' &&
      checkToExec !== 'longitudePresent' &&
      checkToExec !== 'longitudeType' &&
      checkToExec !== 'longitudeRegex' &&
      checkToExec !== 'lastSeenPresent' &&
      checkToExec !== 'lastSeenType' &&
      checkToExec !== 'lastSeenRegex' &&
      checkToExec !== 'agePresent' &&
      checkToExec !== 'ageType' &&
      checkToExec !== 'ageRegex' &&
      checkToExec !== 'ageRange' &&
      checkToExec !== 'resetTokenPresent' &&
      checkToExec !== 'resetTokenType' &&
      checkToExec !== 'resetTokenRegex' &&
      checkToExec !== 'verifyTokenPresent' &&
      checkToExec !== 'verifyTokenType' &&
      checkToExec !== 'verifyTokenRegex' &&
      checkToExec !== 'verifiedPresent' &&
      checkToExec !== 'verifiedType' &&
      checkToExec !== 'verifiedRegex' &&
      checkToExec !== 'profilePicPathPresent' &&
      checkToExec !== 'profilePicPathType' &&
      checkToExec !== 'profilePicPathRegex'
    ) {
      throw new Error(`${checkToExec} ins't a valid check to perform.`)
    }

    const checkObj = {
      'firstNamePresent': () => {
        if (!data.firstName) {
          errors.push({ code: '400-USER-1', message: 'Missing firstName.' })
        }
      },
      'firstNameType': () => {
        if (typeof data.firstName !== 'string') {
          errors.push({ code: '400-USER-30', message: 'firstName should be a string.' })
        }
      },
      'firstNameRegex': () => {
        if (typeof data.firstName === 'string' && !InputValidation.isValidName(data.firstName)) {
          errors.push({ code: '400-USER-15', message: 'Malformed firstName.' })
        }
      },
      'lastNamePresent': () => {
        if (!data.lastName) {
          errors.push({ code: '400-USER-2', message: 'Missing lastName.' })
        }
      },
      'lastNameType': () => {
        if (typeof data.lastName !== 'string') {
          errors.push({ code: '400-USER-31', message: 'lastName should be a string.' })
        }
      },
      'lastNameRegex': () => {
        if (typeof data.lastName === 'string' && !InputValidation.isValidName(data.lastName)) {
          errors.push({ code: '400-USER-16', message: 'Malformed lastName.' })
        }
      },
      'genderPresent': () => {
        if (!data.gender) {
          errors.push({ code: '400-USER-3', message: 'Missing gender.' })
        }
      },
      'genderType': () => {
        if (typeof data.gender !== 'string') {
          errors.push({ code: '400-USER-32', message: 'gender should be a string.' })
        }
      },
      'genderRegex': () => {
        if (typeof data.gender === 'string' && !InputValidation.isValidGender(data.gender)) {
          errors.push({ code: '400-USER-17', message: 'Malformed gender.' })
        }
      },
      'biographyPresent': () => {
        if (!data.biography) {
          errors.push({ code: '400-USER-4', message: 'Missing biography.' })
        }
      },
      'biographyType': () => {
        if (typeof data.biography !== 'string') {
          errors.push({ code: '400-USER-33', message: 'biography should be a string.' })
        }
      },
      'biographyRegex': () => {
        if (typeof data.biography === 'string' && !InputValidation.isValidBiography(data.biography)) {
          errors.push({ code: '400-USER-18', message: 'Malformed biography.' })
        }
      },
      'usernamePresent': () => {
        if (!data.username) {
          errors.push({ code: '400-USER-5', message: 'Missing username.' })
        }
      },
      'usernameType': () => {
        if (typeof data.username !== 'string') {
          errors.push({ code: '400-USER-34', message: 'username should be a string.' })
        }
      },
      'usernameRegex': () => {
        if (typeof data.username === 'string' && !InputValidation.isValidName(data.username)) {
          errors.push({ code: '400-USER-19', message: 'Malformed username.' })
        }
      },
      'emailPresent': () => {
        if (!data.email) {
          errors.push({ code: '400-USER-6', message: 'Missing email.' })
        }
      },
      'emailType': () => {
        if (typeof data.email !== 'string') {
          errors.push({ code: '400-USER-35', message: 'email should be a string.' })
        }
      },
      'emailRegex': () => {
        if (typeof data.email === 'string' && !InputValidation.isValidEmail(data.email)) {
          errors.push({ code: '400-USER-20', message: 'Malformed email.' })
        }
      },
      'passwordPresent': () => {
        if (!data.password) {
          errors.push({ code: '400-USER-7', message: 'Missing password.' })
        }
      },
      'passwordType': () => {
        if (typeof data.password !== 'string') {
          errors.push({ code: '400-USER-36', message: 'password should be a string.' })
        }
      },
      'passwordRegex': () => {
        if (typeof data.password === 'string' && !InputValidation.isValidPassword(data.password)) {
          errors.push({ code: '400-USER-21', message: 'Malformed password.' })
        }
      },
      'fameRatingPresent': () => {
        if (!data.fameRating) {
          errors.push({ code: '400-USER-8', message: 'Missing fameRating.' })
        }
      },
      'fameRatingType': () => {
        if (typeof data.fameRating !== 'string') {
          errors.push({ code: '400-USER-37', message: 'fameRating should be a string.' })
        }
      },
      'fameRatingRegex': () => {
        if (typeof data.fameRating === 'string' && !InputValidation.isValidFameRating(data.fameRating)) {
          errors.push({ code: '400-USER-22', message: 'Malformed fameRating.' })
        }
      },
      'latitudePresent': () => {
        if (!data.latitude) {
          errors.push({ code: '400-USER-9', message: 'Missing latitude.' })
        }
      },
      'latitudeType': () => {
        if (typeof data.latitude !== 'string') {
          errors.push({ code: '400-USER-38', message: 'latitude should be a string.' })
        }
      },
      'latitudeRegex': () => {
        if (typeof data.latitude === 'string' && !InputValidation.isValidLatLong(data.latitude)) {
          errors.push({ code: '400-USER-23', message: 'Malformed latitude.' })
        }
      },
      'longitudePresent': () => {
        if (!data.longitude) {
          errors.push({ code: '400-USER-10', message: 'Missing longitude.' })
        }
      },
      'longitudeType': () => {
        if (typeof data.longitude !== 'string') {
          errors.push({ code: '400-USER-39', message: 'longitude should be a string.' })
        }
      },
      'longitudeRegex': () => {
        if (typeof data.longitude === 'string' && !InputValidation.isValidLatLong(data.longitude)) {
          errors.push({ code: '400-USER-24', message: 'Malformed longitude.' })
        }
      },
      'lastSeenPresent': () => {
        if (!data.lastSeen) {
          errors.push({ code: '400-USER-11', message: 'Missing lastSeen.' })
        }
      },
      'lastSeenType': () => {
        if (typeof data.lastSeen !== 'string') {
          errors.push({ code: '400-USER-40', message: 'lastSeen should be a string.' })
        }
      },
      'lastSeenRegex': () => {
        if (typeof data.lastSeen === 'string' && !InputValidation.isValidLastSeen(data.lastSeen)) {
          errors.push({ code: '400-USER-25', message: 'Malformed lastSeen.' })
        }
      },
      'agePresent': () => {
        if (!data.age) {
          errors.push({ code: '400-USER-12', message: 'Missing age.' })
        }
      },
      'ageType': () => {
        if (typeof data.age !== 'string') {
          errors.push({ code: '400-USER-41', message: 'age should be a string.' })
        }
      },
      'ageRegex': () => {
        if (typeof data.age === 'string' && !InputValidation.isValidAgeChars(data.age)) {
          errors.push({ code: '400-USER-26', message: 'Malformed age.' })
        }
      },
      'ageRange': () => {
        if (typeof data.age === 'string' && !InputValidation.isValidAge(data.age)) {
          errors.push({ code: '400-USER-27', message: 'Age out of range.' })
        }
      },
      'resetTokenPresent': () => {
        if (!data.resetToken) {
          errors.push({ code: '400-USER-46', message: 'Missing resetToken.' })
        }
      },
      'resetTokenType': () => {
        if (typeof data.resetToken !== 'string') {
          errors.push({ code: '400-USER-48', message: 'resetToken should be a string.' })
        }
      },
      'resetTokenRegex': () => {
        if (typeof data.resetToken === 'string' && !InputValidation.isValidUuid(data.resetToken)) {
          errors.push({ code: '400-USER-47', message: 'Malformed resetToken.' })
        }
      },
      'verifyTokenPresent': () => {
        if (!data.verifyToken) {
          errors.push({ code: '400-USER-13', message: 'Missing verifyToken.' })
        }
      },
      'verifyTokenType': () => {
        if (typeof data.verifyToken !== 'string') {
          errors.push({ code: '400-USER-42', message: 'verify token should be a string.' })
        }
      },
      'verifyTokenRegex': () => {
        if (typeof data.verifyToken === 'string' && !InputValidation.isValidUuid(data.verifyToken)) {
          errors.push({ code: '400-USER-28', message: 'Malformed verifyToken.' })
        }
      },
      'verifiedPresent': () => {
        if (!data.verified) {
          errors.push({ code: '400-USER-14', message: 'Missing verified.' })
        }
      },
      'verifiedType': () => {
        if (typeof data.verified !== 'string') {
          errors.push({ code: '400-USER-43', message: 'verified should be a string.' })
        }
      },
      'verifiedRegex': () => {
        if (typeof data.verified === 'string' && !InputValidation.isValidVerified(data.verified)) {
          errors.push({ code: '400-USER-29', message: 'Malformed verified.' })
        }
      },
      'profilePicPathPresent': () => {
        if (!data.profilePicPath) {
          errors.push({ code: '400-USER-49', message: 'Missing profilePicPath.' })
        }
      },
      'profilePicPathType': () => {
        if (typeof data.profilePicPath !== 'string') {
          errors.push({ code: '400-USER-51', message: 'profilePicPath should be a string.' })
        }
      },
      'profilePicPathRegex': () => {
        if (typeof data.profilePicPath === 'string' && !InputValidation.isValidFilePath(data.profilePicPath)) {
          errors.push({ code: '400-USER-50', message: 'Malformed profilePicPath.' })
        }
      }
    }
  }

  static getUserErrors(data, errors) {
    
    // TODO: Call checks here.
  }

  static getOnlyUsernameErrors(data, errors) {

    // if (!data.username) {
    //   errors.push({ code: '400-USER-5', message: 'Missing username.' })
    // }

    // if (typeof data.username !== 'string') {
    //   errors.push({ code: '400-USER-34', message: 'Username should be a string.' })
    // }

    // if (typeof data.username === 'string' && !InputValidation.isValidName(data.username)) {
    //   errors.push({ code: '400-USER-19', message: 'Malformed username.' })
    // }
  }

  static getOnlyEmailErrors(data, errors) {

    // if (!data.email) {
    //   errors.push({ code: '400-USER-6', message: 'Missing email.' })
    // }

    // if (typeof data.email !== 'string') {
    //   errors.push({ code: '400-USER-35', message: 'Email should be a string.' })
    // }

    // if (typeof data.email === 'string' && !InputValidation.isValidEmail(data.email)) {
    //   errors.push({ code: '400-USER-20', message: 'Malformed email.' })
    // }
  }

  static getOnlyVerifyTokenErrors(data, errors) {

    // if (!data.verifyToken) {
    //   errors.push({ code: '400-USER-13', message: 'Missing verifyToken.' })
    // }

    // if (typeof data.verifyToken !== 'string') {
    //   errors.push({ code: '400-USER-42', message: 'Verify token should be a string.' })
    // }

    // if (typeof data.verifyToken === 'string' && !InputValidation.isValidUuid(data.verifyToken)) {
    //   errors.push({ code: '400-USER-28', message: 'Malformed verifyToken.' })
    // }
  }

  static getPatchUserErrors(data, errors) {

    if (data.firstName) {
      if (typeof data.firstName !== 'string') {
        errors.push({ code: '400-USER-30', message: 'FirstName should be a string.' })
      }
      if (typeof data.firstName === 'string' && !InputValidation.isValidName(data.firstName)) {
        errors.push({ code: '400-USER-15', message: 'Malformed firstName.' })
      }
    }

    if (data.lastName) {
      if (typeof data.lastName !== 'string') {
        errors.push({ code: '400-USER-31', message: 'LastName should be a string.' })
      }
      if (typeof data.lastName === 'string' && !InputValidation.isValidName(data.lastName)) {
        errors.push({ code: '400-USER-16', message: 'Malformed lastName.' })
      }
    }

    if (data.gender) {
      if (typeof data.gender !== 'string') {
        errors.push({ code: '400-USER-32', message: 'Gender should be a string.' })
      }
      if (typeof data.gender === 'string' && !InputValidation.isValidGender(data.gender)) {
        errors.push({ code: '400-USER-17', message: 'Malformed gender.' })
      }
    }

    if (data.biography) {
      if (typeof data.biography !== 'string') {
        errors.push({ code: '400-USER-33', message: 'Biography should be a string.' })
      }
      if (typeof data.biography === 'string' && !InputValidation.isValidBiography(data.biography)) {
        errors.push({ code: '400-USER-18', message: 'Malformed biography.' })
      }
    }

    if (data.username) {
      if (typeof data.username !== 'string') {
        errors.push({ code: '400-USER-34', message: 'Username should be a string.' })
      }
      if (typeof data.username === 'string' && !InputValidation.isValidName(data.username)) {
        errors.push({ code: '400-USER-19', message: 'Malformed username.' })
      }
    }

    if (data.email) {
      if (typeof data.email !== 'string') {
        errors.push({ code: '400-USER-35', message: 'Email should be a string.' })
      }
      if (typeof data.email === 'string' && !InputValidation.isValidEmail(data.email)) {
        errors.push({ code: '400-USER-20', message: 'Malformed email.' })
      }
    }

    if (data.password) {
      if (typeof data.password !== 'string') {
        errors.push({ code: '400-USER-36', message: 'Password should be a string.' })
      }
      if (typeof data.password === 'string' && !InputValidation.isValidPassword(data.password)) {
        errors.push({ code: '400-USER-21', message: 'Malformed password.' })
      }
    }

    if (data.fameRating) {
      if (typeof data.fameRating !== 'string') {
        errors.push({ code: '400-USER-37', message: 'FameRating should be a string.' })
      }
      if (typeof data.fameRating === 'string' && !InputValidation.isValidFameRating(data.fameRating)) {
        errors.push({ code: '400-USER-22', message: 'Malformed fameRating.' })
      }
    }

    if (data.latitude) {
      if (typeof data.latitude !== 'string') {
        errors.push({ code: '400-USER-38', message: 'Latitude should be a string.' })
      }
      if (typeof data.latitude === 'string' && !InputValidation.isValidLatLong(data.latitude)) {
        errors.push({ code: '400-USER-23', message: 'Malformed latitude.' })
      }
    }

    if (data.longitude) {
      if (typeof data.longitude !== 'string') {
        errors.push({ code: '400-USER-39', message: 'Longitude should be a string.' })
      }
      if (typeof data.longitude === 'string' && !InputValidation.isValidLatLong(data.longitude)) {
        errors.push({ code: '400-USER-24', message: 'Malformed longitude.' })
      }
    }

    if (data.lastSeen) {
      if (typeof data.lastSeen !== 'string') {
        errors.push({ code: '400-USER-40', message: 'LastSeen should be a string.' })
      }
      if (typeof data.lastSeen === 'string' && !InputValidation.isValidLastSeen(data.lastSeen)) {
        errors.push({ code: '400-USER-25', message: 'Malformed lastSeen.' })
      }
    }

    if (data.age) {
      if (typeof data.age !== 'string') {
        errors.push({ code: '400-USER-41', message: 'Age should be a string.' })
      }
      if (typeof data.age === 'string' && !InputValidation.isValidAgeChars(data.age)) {
        errors.push({ code: '400-USER-26', message: 'Malformed age.' })
      }
      if (typeof data.age === 'string' && !InputValidation.isValidAge(data.age)) {
        errors.push({ code: '400-USER-27', message: 'Out of age range.' })
      }
    }

    if (data.verifyToken) {
      if (typeof data.verifyToken !== 'string') {
        errors.push({ code: '400-USER-42', message: 'verifyToken should be a string.' })
      }
      if (typeof data.verifyToken === 'string' && !InputValidation.isValidUuid(data.verifyToken)) {
        errors.push({ code: '400-USER-28', message: 'Malformed verifyToken.' })
      }
    }

    if (data.resetToken) {


    }

    if (data.verified) {
      if (typeof data.verified !== 'string') {
        errors.push({ code: '400-USER-43', message: 'Verified should be a string.' })
      }
      if (typeof data.verified === 'string' && !InputValidation.isValidVerified(data.verified)) {
        errors.push({ code: '400-USER-29', message: 'Malformed verified.' })
      }
    }

    if (data.profilePicPath) {



      // 400-USER-50: Malformed profilePicPath.
      // 400-USER-51: Profile pic path should be a string.
    }
  }
}

module.exports = UsersValidator