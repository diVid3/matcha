class Config {
  constructor() {
    this.backend = 'http://localhost:3000'
    this.frontend = 'http://localhost:3001'
    this.sessionSecret = 'mySuperDuperSecret'
  }
}

module.exports = Config
