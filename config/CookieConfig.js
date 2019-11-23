class CookieConfig {
  constructor() {
    this.cookieOptions = {
      domain: 'http://localhost:3000',  // Cookies will be sent to this domain.
      httpOnly: false,
      maxAge: 1000 * 60 * 60 * 2,
      secure: false
    }
  }
}

module.exports = CookieConfig
