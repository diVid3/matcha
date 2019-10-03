const testWare = (req, res, next) => {
  console.log('testWare middleware fired!')
  next()
}

module.exports = {
  testWare
}