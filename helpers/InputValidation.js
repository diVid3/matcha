const uuidv4Checker = require('uuidv4').default

const acceptedTags = [
  'cats',
  'coffee',
  'gaming',
  'fishing',
  'hiking',
  'reading',
  'partying',
  'running',
  'stars',
  'science',
  'cooking',
]

class InputValidation {

  static isValidID(id) {
    return /^[0-9]+$/.test(id)
  }

  static isValidName(name) {
    return /^\w{1,45}$/.test(name)
  }

  static isValidGender(gender) {
    return /^[012]$/.test(gender)
  }

  static isValidSexPref(sexPref) {
    return /^[012]$/.test(sexPref)
  }

  static isValidBiography(bio) {
    return /^[^\t]{1,250}$/.test(bio)
  }

  static isValidAge(age) {
    return /^\d{1,2}$/.test(age) <= 99
  }

  static isValidAgeChars(age) {
    return /^\d{1,2}$/.test(age)
  }

  static isValidAgeRange(age) {
    return (age - 0) >= 18 <= 99
  }

  static isValidEmail(email) {
    return /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(email)
  }

  static isValidPassword(password) {
    return /^(?:\w|[a-z0-9!#$@%&'*+/=?^_`{|}~-]){6,200}$/.test(password)
  }

  static isValidFameRating(fameRating) {
    return /^\d{1,10}$/.test(fameRating)
  }

  static isValidLatLong(latLong) {
    return /^[-+]?\d*.\d+$/.test(latLong)
  }

  static isValidLastSeen(lastSeen) {
    return /^\d+$/.test(lastSeen)
  }

  static isValidUuid(uuid) {
    return uuidv4Checker.is(uuid)
  }

  static isValidVerified(verified) {
    return /^[01]$/.test(verified)
  }

  static isValidFilePath(filePath) {
    return /^[\w\\\:\-\_\.\/]+$/.test(filePath)
  }

  static isValidTag(tag) {
    return acceptedTags.some(acceptedTag => acceptedTag === tag)
  }
}

module.exports = InputValidation